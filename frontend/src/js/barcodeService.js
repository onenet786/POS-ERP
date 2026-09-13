import JsBarcode from 'jsbarcode';

/**
 * Generate standard Code 128 scannable SVG barcode
 * Fully compliant with handheld laser scanners, CCD readers, and phone camera apps.
 */
export function generateBarcodeSvg(barcodeText, options = {}) {
  const cleanCode = String(barcodeText || '896400010101').trim();
  const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  try {
    JsBarcode(svgNode, cleanCode, {
      format: 'CODE128',
      lineColor: '#000000',
      width: options.width || 1.6,
      height: options.height || 38,
      displayValue: options.displayValue !== false,
      fontSize: options.fontSize || 12,
      font: 'monospace',
      fontOptions: 'bold',
      textMargin: 3,
      margin: 4,
      background: '#ffffff',
      ...options
    });

    // Make SVG responsive
    svgNode.setAttribute('style', 'max-width: 100%; height: auto; display: block; margin: 0 auto;');
    return new XMLSerializer().serializeToString(svgNode);
  } catch (err) {
    console.warn(`[Barcode] Could not generate CODE128 for "${cleanCode}", falling back to Code39:`, err.message);
    try {
      JsBarcode(svgNode, cleanCode.toUpperCase(), {
        format: 'CODE39',
        width: 1.4,
        height: 35,
        displayValue: true,
        fontSize: 11,
        font: 'monospace',
        margin: 4
      });
      return new XMLSerializer().serializeToString(svgNode);
    } catch (e2) {
      return `<div style="font-family:monospace; font-size:11px; color:#ef4444; padding:6px; font-weight:bold;">[BARCODE: ${cleanCode}]</div>`;
    }
  }
}
