const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

const state = {
  current: '0',
  previous: null,
  operator: null,
  overwrite: false,
};

function render() {
  display.textContent = state.current;
}

function clearAll() {
  state.current = '0';
  state.previous = null;
  state.operator = null;
  state.overwrite = false;
}

function addNumber(num) {
  if (state.overwrite) {
    state.current = num;
    state.overwrite = false;
    return;
  }
  state.current = state.current === '0' ? num : state.current + num;
}

function addDecimal() {
  if (state.overwrite) {
    state.current = '0.';
    state.overwrite = false;
    return;
  }
  if (!state.current.includes('.')) {
    state.current += '.';
  }
}

function deleteOne() {
  if (state.overwrite) return;
  state.current = state.current.length > 1 ? state.current.slice(0, -1) : '0';
}

function calculate(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) return '오류';
      return a / b;
    default:
      return b;
  }
}

function chooseOperator(nextOperator) {
  const currentValue = Number(state.current);

  if (state.previous === null) {
    state.previous = currentValue;
  } else if (state.operator && !state.overwrite) {
    const result = calculate(state.previous, currentValue, state.operator);
    if (result === '오류') {
      clearAll();
      state.current = '오류';
      state.overwrite = true;
      return;
    }
    state.previous = result;
    state.current = String(Number(result.toFixed(10)));
  }

  state.operator = nextOperator;
  state.overwrite = true;
}

function runEquals() {
  if (state.operator === null || state.previous === null) return;

  const result = calculate(state.previous, Number(state.current), state.operator);
  if (result === '오류') {
    clearAll();
    state.current = '오류';
    state.overwrite = true;
    return;
  }

  state.current = String(Number(result.toFixed(10)));
  state.previous = null;
  state.operator = null;
  state.overwrite = true;
}

buttons.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;

  const { action, value } = target.dataset;

  if (action === 'number') addNumber(value);
  if (action === 'decimal') addDecimal();
  if (action === 'delete') deleteOne();
  if (action === 'clear') clearAll();
  if (action === 'operator') chooseOperator(value);
  if (action === 'equals') runEquals();

  render();
});

document.addEventListener('keydown', (event) => {
  if (/^[0-9]$/.test(event.key)) addNumber(event.key);
  else if (event.key === '.') addDecimal();
  else if (event.key === 'Backspace') deleteOne();
  else if (event.key === 'Escape') clearAll();
  else if (['+', '-', '*', '/'].includes(event.key)) chooseOperator(event.key);
  else if (event.key === 'Enter' || event.key === '=') runEquals();
  else return;

  render();
});

render();
