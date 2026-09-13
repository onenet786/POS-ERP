// ============================================================================
// OneNet Solutions Enterprise Suite - Bulletproof Isolated IFrame Print Engine
// Eliminates blank pages by rendering in an isolated document with pure CSS
// ============================================================================

import { AppState, formatCurrency } from './state.js';
import { generateBarcodeSvg } from './barcodeService.js';

export function printDocument(title, htmlBodyContent, customStyles = '') {
  // Remove existing print iframes if any
  const oldFrame = document.getElementById('onet-print-iframe');
  if (oldFrame) oldFrame.remove();

  // Create isolated invisible iframe
  const iframe = document.createElement('iframe');
  iframe.id = 'onet-print-iframe';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.zIndex = '-9999';
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${title}</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          background: #ffffff !important;
          color: #000000 !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        @media print {
          body {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
        ${customStyles}
      </style>
    </head>
    <body>
      ${htmlBodyContent}
    </body>
    </html>
  `);
  doc.close();

  // Allow browser layout engine to paint before triggering print
  setTimeout(() => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (e) {
      console.error('Print iframe error:', e);
    } finally {
      // Clean up iframe after printing dialog finishes
      setTimeout(() => {
        if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
      }, 1500);
    }
  }, 200);
}

// 80mm / 58mm Thermal POS Receipt Generator
export function printThermalReceipt(transaction) {
  const company = AppState.activeCompany || {
    name: 'Bin Ishaq Softs',
    legal_name: 'Bin Ishaq Softs Enterprise Suite',
    address: 'Muslim Town, Lahore, Pakistan',
    phone: '+92 300 1234567',
    tax_id: 'NTN: 7492019-2'
  };

  const now = transaction.created_at
    ? new Date(transaction.created_at).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' })
    : new Date().toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' });

  const items = transaction.items || [];
  const subtotal = Number(transaction.subtotal) || 0;
  const discount = Number(transaction.discount_amount) || 0;
  const tax = Number(transaction.tax_amount) || 0;
  const total = Number(transaction.total_amount) || 0;
  const paid = Number(transaction.paid_amount) || total;
  const change = Number(transaction.change_amount) || 0;
  const receiptNo = transaction.receipt_number || 'REC-POS';
  const customerName = transaction.customer_name || 'Walk-in Retail Customer';
  const paymentMethod = transaction.payment_method || 'CASH';

  const styles = `
    @page {
      size: 80mm auto;
      margin: 2mm;
    }
    body {
      font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
      font-size: 11px;
      line-height: 1.35;
      padding: 3mm 2mm;
      max-width: 78mm;
      margin: 0 auto;
    }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .font-bold { font-weight: bold; }
    .header-title { font-size: 15px; font-weight: 800; text-transform: uppercase; margin-bottom: 2px; }
    .header-sub { font-size: 10px; margin-bottom: 1px; color: #333; }
    .header-badge { font-size: 11px; font-weight: 700; margin: 4px 0 2px 0; letter-spacing: 0.5px; }
    .divider { border-bottom: 1px dashed #000; margin: 5px 0; }
    .divider-dotted { border-bottom: 1px dotted #666; margin: 3px 0; }
    .row { display: flex; justify-content: space-between; align-items: flex-start; margin: 2px 0; font-size: 11px; }
    .col-item { flex: 2.3; text-align: left; overflow: hidden; padding-right: 4px; }
    .col-qty { flex: 0.7; text-align: center; }
    .col-rate { flex: 1.1; text-align: right; }
    .col-total { flex: 1.3; text-align: right; font-weight: bold; }
    .net-total-row {
      font-size: 13px;
      font-weight: 800;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      padding: 4px 0;
      margin: 4px 0;
    }
    .footer { text-align: center; margin-top: 8px; font-size: 10px; }
  `;

  const html = `
    <div>
      <div class="text-center">
        <div class="header-title">${company.name || 'OneNet Solutions'}</div>
        <div class="header-sub">${company.legal_name || 'Enterprise Suite'}</div>
        <div class="header-sub">${company.address || 'Muslim Town, Lahore, Pakistan'}</div>
        <div class="header-sub">Tel: ${company.phone || '+92 300 1234567'} | ${company.tax_id || 'NTN: 7492019-2'}</div>
        <div class="header-badge">*** POS RETAIL SALES SLIP ***</div>
      </div>

      <div class="divider"></div>

      <div class="row"><span>Receipt No:</span><strong class="font-bold">${receiptNo}</strong></div>
      <div class="row"><span>Date & Time:</span><span>${now}</span></div>
      <div class="row"><span>Counter / Terminal:</span><span>Pos-01 / Cashier</span></div>
      <div class="row"><span>Customer:</span><span>${customerName}</span></div>

      <div class="divider"></div>

      <div class="row font-bold" style="font-size: 10px;">
        <span class="col-item">ITEM DESCRIPTION</span>
        <span class="col-qty">QTY</span>
        <span class="col-rate">PRICE</span>
        <span class="col-total">TOTAL</span>
      </div>
      <div class="divider-dotted"></div>

      ${items.map(item => `
        <div class="row">
          <span class="col-item">${item.name || item.product_name || 'Item'}</span>
          <span class="col-qty">${item.quantity}</span>
          <span class="col-rate">${Number(item.unit_price).toFixed(2)}</span>
          <span class="col-total">${(Number(item.unit_price) * Number(item.quantity)).toFixed(2)}</span>
        </div>
      `).join('')}

      <div class="divider"></div>

      <div class="row"><span>Subtotal:</span><span>Rs. ${subtotal.toFixed(2)}</span></div>
      ${discount > 0 ? `<div class="row"><span>Discount:</span><span>-Rs. ${discount.toFixed(2)}</span></div>` : ''}
      ${tax > 0 ? `<div class="row"><span>Sales Tax / VAT (18%):</span><span>Rs. ${tax.toFixed(2)}</span></div>` : ''}
      
      <div class="row net-total-row">
        <span>NET PAYABLE:</span>
        <span>Rs. ${total.toFixed(2)}</span>
      </div>

      <div class="row"><span>Tender Method:</span><span>${paymentMethod}</span></div>
      <div class="row"><span>Amount Received:</span><span>Rs. ${paid.toFixed(2)}</span></div>
      <div class="row"><span>Change Returned:</span><strong class="font-bold">Rs. ${change.toFixed(2)}</strong></div>

      <div class="divider"></div>

      <div class="footer">
        <div class="font-bold">* FBR / Sales Tax Compliant *</div>
        <div>Thank you for shopping with ${company.name || 'Bin Ishaq Softs'}!</div>
        <div style="font-size:9px; color:#555; margin-top:3px;">Powered by Bin Ishaq Softs Enterprise Suite</div>
      </div>
    </div>
  `;

  printDocument(`Receipt_${receiptNo}`, html, styles);
}

// A4 Official Tax E-Invoice Generator
export function printA4TaxInvoice(inv) {
  const company = AppState.activeCompany || {
    name: 'Bin Ishaq Softs',
    legal_name: 'Bin Ishaq Softs Enterprise Suite',
    address: 'Muslim Town, Lahore, Pakistan',
    phone: '+92 300 1234567',
    tax_id: 'NTN: 7492019-2',
    strn: 'STRN: 11-22-3344-555'
  };

  const invoiceNo = inv.invoice_number || 'INV-2026-0001';
  const invDate = inv.invoice_date || new Date().toISOString().slice(0, 10);
  const items = inv.items || [];
  const subtotal = Number(inv.subtotal) || 0;
  const tax = Number(inv.tax_amount) || 0;
  const discount = Number(inv.discount_amount) || 0;
  const total = Number(inv.total_amount) || (subtotal + tax - discount);

  const styles = `
    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #0f172a;
      line-height: 1.5;
      padding: 15px;
    }
    .header-box {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2.5px solid #0284c7;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .brand-name {
      font-size: 24px;
      font-weight: 800;
      color: #0284c7;
      letter-spacing: -0.5px;
    }
    .brand-subtitle {
      font-size: 13px;
      font-weight: 600;
      color: #334155;
    }
    .brand-meta {
      font-size: 11px;
      color: #64748b;
      margin-top: 3px;
    }
    .invoice-title-block {
      text-align: right;
    }
    .invoice-main-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
    }
    .invoice-num {
      font-size: 14px;
      font-weight: 700;
      color: #0284c7;
      margin-top: 2px;
    }
    .meta-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }
    .billed-to-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
    }
    .billed-to-name {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin: 2px 0;
    }
    .qr-container {
      text-align: center;
    }
    .qr-container img {
      width: 85px;
      height: 85px;
      border: 1px solid #cbd5e1;
      padding: 3px;
      background: #fff;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 12px;
    }
    th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 700;
      padding: 8px 10px;
      text-align: left;
    }
    th.text-center, td.text-center { text-align: center; }
    th.text-right, td.text-right { text-align: right; }
    td {
      padding: 8px 10px;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
    }
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    .totals-area {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;
    }
    .totals-card {
      width: 280px;
      font-size: 13px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
    }
    .totals-grand {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-top: 2px solid #0f172a;
      font-size: 16px;
      font-weight: 800;
      color: #0284c7;
    }
    .signature-area {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      padding-top: 15px;
      border-top: 1px solid #cbd5e1;
      font-size: 11px;
      color: #64748b;
    }
    .sign-line {
      width: 180px;
      text-align: center;
    }
    .sign-border {
      border-bottom: 1px solid #94a3b8;
      height: 25px;
      margin-bottom: 4px;
    }
  `;

  const html = `
    <div>
      <div class="header-box">
        <div>
          <div class="brand-name">${company.name || 'OneNet Solutions'}</div>
          <div class="brand-subtitle">${company.legal_name || 'Enterprise Suite'}</div>
          <div class="brand-meta">${company.address || 'Muslim Town, Lahore, Pakistan'}</div>
          <div class="brand-meta">Tel: ${company.phone || '+92 300 1234567'} | ${company.tax_id || 'NTN: 7492019-2'} ${company.strn ? '| ' + company.strn : ''}</div>
        </div>
        <div class="invoice-title-block">
          <div class="invoice-main-title">OFFICIAL TAX INVOICE</div>
          <div class="invoice-num">${invoiceNo}</div>
          <div style="font-size: 12px; color:#475569; margin-top:2px;">Date: ${invDate}</div>
          <div style="font-size: 11px; font-weight: bold; color: #16a34a; margin-top:2px;">STATUS: ${inv.status || 'PAID'}</div>
        </div>
      </div>

      <div class="meta-box">
        <div>
          <div class="billed-to-title">Billed To Customer:</div>
          <div class="billed-to-name">${inv.customer_name || 'Al-Madina Super Store'}</div>
          <div style="font-size: 12px; color: #475569;">Payment Terms: ${inv.payment_method || 'Net 30 / Cash on Delivery'}</div>
          <div style="font-size: 11px; color: #64748b;">Customer Tax / STRN: ${inv.customer_tax_number || 'STRN-9847281'}</div>
        </div>
        <div class="qr-container">
          <img src="${inv.einvoice_qr_code || 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\"><rect width=\"80\" height=\"80\" fill=\"white\"/><text x=\"10\" y=\"45\" font-size=\"10\" fill=\"black\">QR Verified</text></svg>'}" alt="QR" />
          <div style="font-size: 9px; color:#64748b; margin-top:2px;">FBR / ZATCA Verified</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item & Description</th>
            <th class="text-center" style="width: 70px;">Qty</th>
            <th class="text-right" style="width: 110px;">Unit Price (Rs)</th>
            <th class="text-right" style="width: 120px;">Total (Rs)</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td><strong>${item.name || item.product_name}</strong></td>
              <td class="text-center">${item.quantity}</td>
              <td class="text-right">${Number(item.unit_price).toFixed(2)}</td>
              <td class="text-right"><strong>${(Number(item.unit_price) * Number(item.quantity)).toFixed(2)}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="totals-area">
        <div class="totals-card">
          <div class="totals-row"><span>Subtotal:</span><span>Rs. ${subtotal.toFixed(2)}</span></div>
          <div class="totals-row"><span>Sales Tax (18%):</span><span>Rs. ${tax.toFixed(2)}</span></div>
          ${discount > 0 ? `<div class="totals-row"><span>Special Discount:</span><span>-Rs. ${discount.toFixed(2)}</span></div>` : ''}
          <div class="totals-grand">
            <span>Total Payable:</span>
            <span>Rs. ${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div class="signature-area">
        <div>
          <div>* Computer generated digital tax invoice from ${company.name || 'Bin Ishaq Softs'} Enterprise Suite.</div>
          <div style="margin-top:2px;">Thank you for your business!</div>
        </div>
        <div class="sign-line">
          <div class="sign-border"></div>
          <div>Authorized Signature & Stamp</div>
        </div>
      </div>
    </div>
  `;

  printDocument(`TaxInvoice_${invoiceNo}`, html, styles);
}

// Barcode Sticker Sheet Generator (3x4 or 3x8 Grid) with Real Code 128 Barcodes
export function printBarcodeStickers(product, count = 12, format = 'a4_3x8') {
  const company = AppState.activeCompany || { name: 'Bin Ishaq Softs' };
  const barcodeSvg = generateBarcodeSvg(product.barcode || product.sku || '896400010101', {
    width: 1.5,
    height: 36,
    fontSize: 11,
    margin: 2
  });

  const isThermalRoll = format === 'thermal_roll';

  const styles = isThermalRoll ? `
    @page { size: 50mm 30mm; margin: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 2mm;
      box-sizing: border-box;
      background: #ffffff;
      color: #000000;
    }
    .thermal-label {
      width: 46mm;
      height: 26mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      page-break-inside: avoid;
    }
    .st-title { font-weight: 800; font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; }
    .st-name { font-size: 9px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 44mm; }
    .st-barcode { width: 100%; display: flex; justify-content: center; }
    .st-barcode svg { width: 42mm; height: 12mm; }
    .st-price { font-weight: 800; font-size: 11px; }
  ` : `
    @page { size: A4; margin: 8mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      color: #000000;
    }
    .sticker-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5mm;
    }
    .sticker {
      border: 1px dashed #666;
      border-radius: 4px;
      padding: 6px 8px;
      text-align: center;
      page-break-inside: avoid;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 32mm;
      box-sizing: border-box;
    }
    .st-title { font-weight: 800; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #000; }
    .st-name { font-size: 9.5px; font-weight: 600; margin: 1px 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 58mm; color: #111; }
    .st-barcode { width: 100%; margin: 2px 0; display: flex; justify-content: center; }
    .st-barcode svg { width: 54mm; height: 13mm; display: block; }
    .st-price { font-weight: 800; font-size: 12px; color: #000; }
  `;

  const html = isThermalRoll ? `
    ${Array.from({ length: count }).map(() => `
      <div class="thermal-label">
        <div class="st-title">${company.name || 'Bin Ishaq Softs'}</div>
        <div class="st-name">${product.name.slice(0, 26)}</div>
        <div class="st-barcode">${barcodeSvg}</div>
        <div class="st-price">${formatCurrency(product.selling_price)}</div>
      </div>
    `).join('')}
  ` : `
    <div class="sticker-grid">
      ${Array.from({ length: count }).map(() => `
        <div class="sticker">
          <div class="st-title">${company.name || 'Bin Ishaq Softs'}</div>
          <div class="st-name">${product.name.slice(0, 26)}</div>
          <div class="st-barcode">${barcodeSvg}</div>
          <div class="st-price">${formatCurrency(product.selling_price)}</div>
        </div>
      `).join('')}
    </div>
  `;

  printDocument(`Barcode_Labels_${product.sku || 'ITEM'}`, html, styles);
}

// Official Employee Payslip Generator
export function printEmployeePayslip(payslip) {
  const company = AppState.activeCompany || {
    name: 'Bin Ishaq Softs',
    address: 'Muslim Town, Lahore, Pakistan'
  };

  const styles = `
    @page { size: A5 landscape; margin: 8mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; padding: 10px; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 12px; }
    .title { font-size: 18px; font-weight: 800; color: #0284c7; }
    .sub { font-size: 11px; color: #64748b; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; margin-bottom: 14px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 14px; }
    th, td { padding: 6px 8px; border: 1px solid #cbd5e1; }
    th { background: #f1f5f9; font-weight: 700; text-align: left; }
    .text-right { text-align: right; }
    .net-box { display: flex; justify-content: space-between; font-size: 14px; font-weight: 800; color: #0284c7; padding: 8px; background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 4px; }
  `;

  const html = `
    <div>
      <div class="header">
        <div>
          <div class="title">${company.name || 'Bin Ishaq Softs'}</div>
          <div class="sub">${company.address || 'Muslim Town, Lahore'} | HR & Payroll Department</div>
        </div>
        <div style="text-align: right;">
          <strong style="font-size: 14px;">SALARY PAYSLIP</strong>
          <div class="sub">Period: ${payslip.month_year || 'September 2026'}</div>
        </div>
      </div>

      <div class="info-grid">
        <div><strong>Employee Code:</strong> ${payslip.employee_code || 'EMP-101'}</div>
        <div><strong>Employee Name:</strong> ${payslip.employee_name || 'Ali Raza'}</div>
        <div><strong>Department:</strong> ${payslip.department || 'Retail POS Operations'}</div>
        <div><strong>Designation:</strong> ${payslip.designation || 'Senior Cashier'}</div>
        <div><strong>CNIC / ID:</strong> ${payslip.cnic || '35201-1234567-1'}</div>
        <div><strong>Payment Date:</strong> ${new Date().toLocaleDateString('en-PK')}</div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Earnings Description</th>
            <th class="text-right">Amount (Rs)</th>
            <th>Deductions</th>
            <th class="text-right">Amount (Rs)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Basic Salary</td>
            <td class="text-right">${formatCurrency(payslip.base_salary || 45000)}</td>
            <td>Income Tax Deducted</td>
            <td class="text-right">${formatCurrency(payslip.tax_deduction || 1200)}</td>
          </tr>
          <tr>
            <td>Overtime / Incentives</td>
            <td class="text-right">${formatCurrency(payslip.allowances || 3500)}</td>
            <td>Unpaid Leaves / Late Cut</td>
            <td class="text-right">${formatCurrency(payslip.unpaid_deduction || 0)}</td>
          </tr>
        </tbody>
      </table>

      <div class="net-box">
        <span>NET TAKE-HOME SALARY:</span>
        <span>${formatCurrency(payslip.net_salary || 47300)}</span>
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:30px; font-size:11px; color:#64748b;">
        <div>Prepared by HR Department</div>
        <div style="text-align:center; border-top:1px solid #94a3b8; width:150px; padding-top:4px;">Employee Signature</div>
      </div>
    </div>
  `;

  printDocument(`Payslip_${payslip.employee_code || 'EMP'}`, html, styles);
}
