export function parseMoney(value) {
  if (typeof value!=='string' || !/^\d{1,7}(?:\.\d{1,2})?$/.test(value)) throw new Error('Enter a positive amount with at most two decimal places');
  const [whole,fraction='']=value.split('.');
  const cents=Number(whole)*100+Number(fraction.padEnd(2,'0'));
  if (cents<1 || cents>100000000) throw new Error('Amount is outside the allowed range');
  return cents;
}
export const formatMoney=cents=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(cents/100);
