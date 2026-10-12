const OPERATORS = ['+', '-', '*', '/'];
const NUMBER_PATTERN = /^(\d+,?\d*|,\d+)$/;

export const isOperator = (char) => OPERATORS.includes(char);

const toNumber = (str) =>
  NUMBER_PATTERN.test(str) ? Number(str.replace(',', '.')) : null;

const roundToCents = (value) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

// Evalúa una expresión del teclado (p. ej. "12,5+3*2") respetando la
// precedencia de * y /, redondeando a céntimos. Devuelve null si es
// inválida o divide entre cero.
export const evaluateExpression = (exp) => {
  let clean = exp;
  while (isOperator(clean.slice(-1))) {
    clean = clean.slice(0, -1);
  }
  if (!clean) return 0;

  // "12+3*2" -> ['12', '+', '3', '*', '2']
  const parts = clean.split(/([+\-*/])/);
  const first = toNumber(parts[0]);
  if (first === null) return null;

  const terms = [first];
  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i];
    const value = toNumber(parts[i + 1]);
    if (value === null) return null;

    const last = terms.length - 1;
    if (operator === '*') terms[last] *= value;
    else if (operator === '/') {
      if (value === 0) return null;
      terms[last] /= value;
    } else terms.push(operator === '-' ? -value : value);
  }

  return roundToCents(terms.reduce((sum, term) => sum + term, 0));
};

// Convierte el texto de un campo de cantidad ("12,5" o "12.5") en un
// número redondeado a céntimos. Devuelve null si no es un número válido.
export const parseAmount = (text) => {
  const value = toNumber(String(text).trim().replace('.', ','));
  return value === null ? null : roundToCents(value);
};

// 1234.5 -> "1.234,5"
export const formatAmount = (value) => {
  const [integer, decimals] = Math.abs(value).toString().split('.');
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const sign = value < 0 ? '-' : '';
  return decimals ? `${sign}${grouped},${decimals}` : `${sign}${grouped}`;
};
