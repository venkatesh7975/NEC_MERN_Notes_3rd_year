// Run: node dailycodes/javascript/000-control-flow/app.js
function attendance(present, total) {
  if (!Number.isInteger(present) || !Number.isInteger(total) || total <= 0 || present < 0 || present > total) {
    throw new RangeError('Require integers with 0 <= present <= total and total > 0');
  }
  const percentage = present / total * 100;
  return { percentage, eligible: percentage >= 75 }; // Practice threshold, not university policy.
}
function classifyNumbers(limit) {
  if (!Number.isInteger(limit) || limit < 0 || limit > 1000) throw new RangeError('Limit must be an integer 0-1000');
  const result = [];
  for (let n = 0; n <= limit; n++) result.push({ number: n, parity: n % 2 === 0 ? 'even' : 'odd' });
  return result;
}
if (require.main === module) {
  console.log(attendance(15,20));
  console.log(classifyNumbers(3));
}
module.exports = { attendance, classifyNumbers };
