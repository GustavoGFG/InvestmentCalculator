function convertToMonthlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = 'monthly',
  monthlyContribution = 0,
  returnRate = 0,
  returnTimeFrame = 'monthly'
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error('Initial investment and duration must be positive values.');
  }

  const finalReturnRate =
    returnTimeFrame === 'monthly'
      ? 1 + returnRate / 100
      : convertToMonthlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === 'monthly' ? timeHorizon : 12 * timeHorizon;

  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnsArray = [referenceInvestmentObject];

  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate +
      monthlyContribution;

    const interestReturns =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate;

    const investedAmount = startingAmount + monthlyContribution * timeReference;

    const totalInterestReturns = totalAmount - investedAmount;

    returnsArray.push({
      investedAmount,
      interestReturns,
      totalInterestReturns,
      month: timeReference,
      totalAmount,
    });
  }

  return returnsArray;
}
