import { generateReturnsArray } from './src/investmentGoals';
import { Chart } from 'chart.js/auto';
import { createTable } from './src/table';

const form = document.getElementById('investment-form');
const clearFormButton = document.getElementById('clear-form');

const finalMoneyChart = document.getElementById('final-money-distribution');
const progressionChart = document.getElementById('progression');

let doughnutChartReference = {};
let progressionChartReference = {};

const columnsArray = [
  { columnLabel: 'Mês', accessor: 'month' },
  {
    columnLabel: 'Total Investido',
    accessor: 'investedAmount',
    format: numberInfo => convertToCurrency(numberInfo),
  },
  {
    columnLabel: 'Rendimento Mensal',
    accessor: 'interestReturns',
    format: numberInfo => convertToCurrency(numberInfo),
  },
  {
    columnLabel: 'Rendimento Total',
    accessor: 'totalInterestReturns',
    format: numberInfo => convertToCurrency(numberInfo),
  },
  {
    columnLabel: 'Quantia Total',
    accessor: 'totalAmount',
    format: numberInfo => convertToCurrency(numberInfo),
  },
];

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
  resetCharts();
  resetTable();

  const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  doughnutChartReference = new Chart(finalMoneyChart, {
    type: 'doughnut',
    data: {
      labels: ['Total Invested', 'Return', 'Tax'],
      datasets: [
        {
          data: [
            finalInvestmentObject.investedAmount.toFixed(2),
            (
              finalInvestmentObject.totalInterestReturns *
              (1 - taxRate / 100)
            ).toFixed(2),
            (
              finalInvestmentObject.totalInterestReturns *
              (taxRate / 100)
            ).toFixed(2),
          ],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: 'right',
        },
      },
    },
  });

  progressionChartReference = new Chart(progressionChart, {
    type: 'bar',
    data: {
      labels: returnsArray.map(investmentObject => investmentObject.month),
      datasets: [
        {
          label: 'Total Investido',
          data: returnsArray.map(investmentObject =>
            investmentObject.investedAmount.toFixed(2)
          ),
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Retorno do Investimento',
          data: returnsArray.map(investmentObject =>
            investmentObject.interestReturns.toFixed(2)
          ),
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });

  createTable(columnsArray, returnsArray, 'results-table');
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (
    !isObjectEmpty(doughnutChartReference) &&
    !isObjectEmpty(progressionChartReference)
  ) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
  }
}
function resetTable() {
  document.getElementById('results-table').innerHTML = '';
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
  resetCharts();
  resetTable();
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

const mainEl = document.querySelector('main');
const carouselEl = document.getElementById('carousel');
const previousBtn = document.getElementById('slide-arrow-previous');
const nextBtn = document.getElementById('slide-arrow-next');

nextBtn.addEventListener('click', () => {
  carouselEl.scrollLeft += mainEl.clientWidth;
});

previousBtn.addEventListener('click', () => {
  carouselEl.scrollLeft -= mainEl.clientWidth;
  console.log('Olá');
});

form.addEventListener('submit', renderProgression);
clearFormButton.addEventListener('click', clearForm);

function convertToCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

const mobileMenuBtn = document.getElementById('menu-btn');
mobileMenuBtn.addEventListener('click', () => {
  document.getElementsByTagName('aside')[0].classList.toggle('mobile:hidden');
  document.getElementById('menu-icon').classList.toggle('hidden');
  document.getElementById('close-icon').classList.toggle('hidden');
});
