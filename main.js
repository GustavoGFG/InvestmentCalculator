import { generateReturnsArray } from './src/investmentGoals';

const form = document.getElementById('investment-form');
const clearFormButton = document.getElementById('clear-form');

function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector('.error')) {
    return;
  }

  const startingAmount = Number(
    document.getElementById('initial-investment').value.replace(',', '.')
  );
  const additionalContribution = Number(
    document.getElementById('additional-asset').value.replace(',', '.')
  );
  const timeAmount = Number(document.getElementById('duration').value);
  const timeAmountPeriod = document.getElementById('duration-type').value;
  const returnRate = Number(
    document.getElementById('yield-rate').value.replace(',', '.')
  );
  const returnRatePeriod = document.getElementById('yield-rate-type').value;
  const taxRate = Number(
    document.getElementById('profit-tax').value.replace(',', '.')
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnsArray);
}

function clearForm() {
  form['initial-investment'].value = '';
  form['additional-asset'].value = '';
  form['duration'].value = '';
  form['yield-rate'].value = '';
  form['profit-tax'].value = '';

  const errorInputArray = document.querySelectorAll('.error');
  for (let errorInput of errorInputArray) {
    errorInput.classList.remove('error');
    errorInput.parentElement.querySelector('p').remove();
  }
}

function validadeInput(evt) {
  if (evt.target.value === '') {
    return;
  }

  const { parentElement } = evt.target;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(',', '.');

  if (
    (isNaN(inputValue) || Number(inputValue) <= 0) &&
    !parentElement.classList.contains('error')
  ) {
    const errorTextElement = document.createElement('p');
    errorTextElement.classList.add('text-red-500');
    errorTextElement.innerText = 'Insira um valor numérico e maior que zero';

    parentElement.classList.add('error');
    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains('error') &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove('error');
    grandParentElement.querySelector('p').remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener('blur', validadeInput);
  }
}

form.addEventListener('submit', renderProgression);
clearFormButton.addEventListener('click', clearForm);
