import { generateReturnsArray } from './src/investmentGoals';

const form = document.getElementById('investment-form');

function renderProgression(evt) {
  evt.preventDefault();

  const startingAmount = Number(
    document.getElementById('initial-investment').value
  );
  const additionalContribution = Number(
    document.getElementById('additional-asset').value
  );
  const timeAmount = Number(document.getElementById('duration').value);
  const timeAmountPeriod = document.getElementById('duration-type').value;
  const returnRate = Number(document.getElementById('yield-rate').value);
  const returnRatePeriod = document.getElementById('yield-rate-type').value;
  const taxRate = Number(document.getElementById('profit-tax').value);

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

form.addEventListener('submit', renderProgression);
