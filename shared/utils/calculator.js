const OPERATORS = ['+', '-', '*', '/'];
const NUMBER_PATTERN = /^(\d+,?\d*|,\d+)$/;

export const isOperator = (char) => OPERATORS.includes(char);

const toNumber = (str) =>
  NUMBER_PATTERN.test(str) ? Number(str.replace(',', '.')) : null;

// Evalúa una expresión del teclado (p. ej. "12,5+3*2") respetando la
// precedencia de * y /. Devuelve null si es inválida o divide entre cero.
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

  return terms.reduce((sum, term) => sum + term, 0);
};
