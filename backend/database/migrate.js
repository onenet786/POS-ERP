import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { Client, Pool } = pg;

const pgHost = process.env.PGHOST || 'localhost';
const pgPort = parseInt(process.env.PGPORT || '5432');
const pgUser = process.env.PGUSER || 'postgres';
const pgPassword = process.env.PGPASSWORD || 'postgres';
const targetDb = process.env.PGDATABASE || 'bierppos';
const isSsl = process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false;

async function ensureDatabaseExists() {
  console.log(`-> Checking if database "${targetDb}" exists on ${pgUser}@${pgHost}:${pgPort}...`);
  // Connect to default maintenance database 'postgres'
  const rootClient = new Client({
    host: pgHost,
    port: pgPort,
    user: pgUser,
    password: pgPassword,
    database: 'postgres',
    ssl: isSsl
  });

  try {
    await rootClient.connect();
    const checkRes = await rootClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [targetDb]
    );

    if (checkRes.rows.length === 0) {
      console.log(`-> Database "${targetDb}" does not exist. Creating database...`);
      // Escape database name safely
      await rootClient.query(`CREATE DATABASE "${targetDb.replace(/"/g, '""')}"`);
      console.log(`-> Database "${targetDb}" created successfully.`);
    } else {
      console.log(`-> Database "${targetDb}" already exists.`);
    }
  } catch (err) {
    console.warn(`[!] Notice while checking database existence: ${err.message}`);
    console.warn(`    Proceeding to connect directly to "${targetDb}"...`);
  } finally {
    try {
      await rootClient.end();
    } catch (_) {}
  }
}

async function runMigration() {
  console.log('====================================================');
  console.log('  ApexERP & POS - PostgreSQL Database Migration');
  console.log('====================================================');
  console.log(`Target: ${pgUser}@${pgHost}:${pgPort}/${targetDb}`);

  // Step 1: Ensure database exists
  await ensureDatabaseExists();

  // Step 2: Connect to target database and execute DDL & Seed
  const pool = new Pool({
    host: pgHost,
    port: pgPort,
    user: pgUser,
    password: pgPassword,
    database: targetDb,
    ssl: isSsl
  });

  let client;
  try {
    client = await pool.connect();
    console.log(`-> Connected to target database "${targetDb}".`);

    console.log('-> Executing schema.sql (DDL tables, indexes, constraints)...');
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(schemaSql);
    console.log('-> Schema DDL executed successfully.');

    console.log('-> Executing seed.sql (Chart of Accounts, Categories, Roles, Products)...');
    const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
    await client.query(seedSql);
    console.log('-> Seed data inserted successfully.');

    console.log('-> Verification check:');
    const productsCount = await client.query('SELECT COUNT(*) FROM products');
    const accountsCount = await client.query('SELECT COUNT(*) FROM chart_of_accounts');
    console.log(`   Products loaded: ${productsCount.rows[0].count}`);
    console.log(`   Chart of Accounts loaded: ${accountsCount.rows[0].count}`);
    console.log('====================================================');
    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration error:', err.message);
    process.exit(1);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

runMigration();
