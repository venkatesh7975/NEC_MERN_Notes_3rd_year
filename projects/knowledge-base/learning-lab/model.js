export function calculate(left, operator, right) {
  const parse = value => {
    if (typeof value !== 'string' || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value.trim())) throw new Error('Enter two valid decimal numbers');
    const n = Number(value);
    if (!Number.isFinite(n)) throw new Error('Number is outside the supported range');
    return n;
  };
  const a = parse(left), b = parse(right);
  if (!['+','-','*','/'].includes(operator)) throw new Error('Choose a supported operator');
  if (operator === '/' && b === 0) throw new Error('Cannot divide by zero');
  const result = operator === '+' ? a+b : operator === '-' ? a-b : operator === '*' ? a*b : a/b;
  if (!Number.isFinite(result)) throw new Error('Result is outside the supported range');
  return result;
}

export function parseCents(value) {
  if (typeof value !== 'string' || !/^\d+(?:\.\d{1,2})?$/.test(value.trim())) throw new Error('Use a positive amount with at most two decimals');
  const [whole,fraction=''] = value.trim().split('.');
  const cents = Number(whole)*100 + Number(fraction.padEnd(2,'0'));
  if (!Number.isSafeInteger(cents) || cents <= 0) throw new Error('Amount is outside the supported range');
  return cents;
}
export function expenseTotal(records, category='') {
  const total = records.filter(r => !category || r.category === category).reduce((sum,r) => sum + r.cents,0);
  if (!Number.isSafeInteger(total)) throw new Error('Total exceeds the supported range');
  return total;
}
export function quizScore(questions, answers) {
  return questions.reduce((score,q) => score + (answers[q.id] === q.correct ? 1 : 0),0);
}
export function coordinates(latitude, longitude) {
  const parse = value => {
    if (typeof value !== 'string' || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value.trim())) throw new Error('Enter decimal coordinates');
    return Number(value);
  };
  const lat=parse(latitude), lon=parse(longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat)>90 || Math.abs(lon)>180) throw new Error('Latitude must be -90 to 90; longitude -180 to 180');
  return {lat,lon};
}
export function validateNotes(value) {
  if (!Array.isArray(value) || value.length>100) return [];
  const ids=new Set();
  return value.filter(n => {
    if (!n || typeof n.id!=='string' || ids.has(n.id) || typeof n.title!=='string' || typeof n.body!=='string' || n.title.length>120 || n.body.length>20000) return false;
    ids.add(n.id); return true;
  }).map(({id,title,body})=>({id,title,body}));
}
export async function readWeather(fetcher, position, signal) {
  const query=new URLSearchParams({latitude:String(position.lat),longitude:String(position.lon),current:'temperature_2m',timezone:'auto'});
  const response=await fetcher(`https://api.open-meteo.com/v1/forecast?${query}`,{signal});
  if (!response.ok) throw new Error(`Weather service returned HTTP ${response.status}`);
  const data=await response.json();
  if (!Number.isFinite(data?.current?.temperature_2m) || typeof data?.current?.time!=='string') throw new Error('Weather service returned an unexpected shape');
  return {temperature:data.current.temperature_2m,time:data.current.time};
}
