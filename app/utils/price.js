export function parsePrice(value) {
  if (value == null) return 0;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    // Remove currency letters and whitespace
    let v = value.replace(/[^0-9.,-]/g, '').trim();
    // If contains both comma and dot, assume comma is thousand separator
    if (v.indexOf(',') !== -1 && v.indexOf('.') !== -1) {
      v = v.replace(/,/g, '');
    } else if (v.indexOf(',') !== -1 && v.indexOf('.') === -1) {
      // If only comma present, assume it's decimal separator
      v = v.replace(/,/g, '.');
    }
    const n = parseFloat(v);
    return Number.isNaN(n) ? 0 : n;
  }
  return 0;
}

export function formatPrice(value, decimals = 2) {
  const n = parsePrice(value);
  return n.toFixed(decimals);
}
