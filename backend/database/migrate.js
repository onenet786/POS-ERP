import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { Pool } = pg;

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432'),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'apexerppos',
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false
});

async function runMigration() {
  console.log('====================================================');
  console.log('  ApexERP & POS - PostgreSQL Database Migration');
  console.log('====================================================');
  console.log(`Target: ${process.env.PGUSER}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`);

  const client = await pool.connect();
  try {
    console.log('-> Connected to PostgreSQL. Reading schema.sql...');
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(schemaSql);
    console.log('-> Schema DDL executed successfully.');

    console.log('-> Reading seed.sql...');
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
    console.error('Migration failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
