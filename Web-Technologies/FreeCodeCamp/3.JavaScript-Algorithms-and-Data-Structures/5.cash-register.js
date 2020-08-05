// improve readablity

function checkCashRegister(price, cash, cid) {
  let cashInDraw = cid;

  // Get the second item in the ARR then reduce them buy adding them
  let totalCashInDrawer = cashInDraw
    .map(function (each) {
      return each[1];
    })
    .reduce(function (a, b) {
      return a + b;
    });

  function getCurrencyTotals(cashInDraw) {
    //infix to convert to number
    return +(cashInDraw[1] / currency[cashInDraw[0]]).toFixed(0);
  }

  let inDrawer = cashInDraw.map(function (each) {
    return [each[0], getCurrencyTotals(each)];
  });

  let totalDue = cash - price;

  // the two use cases
  // Cash in the drawer is less than change due
  if (totalDue > totalCashInDrawer) {
    return "Insufficient Funds";
  }
  // if cash-in-drawer is equal to the change due.
  else if (totalCashInDrawer === totalDue) {
    return "Closed";
  }
  // We can assume we have enough change to procede
  else {
    let exactChange = [];

    for (let _ = cashInDraw.length - 1; _ >= 0; _--) {
      var value = 0;

      while (inDrawer[_][1] > 0 && currency[inDrawer[_][0]] <= totalDue) {
        totalDue -= +currency[inDrawer[_][0]];
        inDrawer[_][1] -= 1;
        value += currency[inDrawer[_][0]];

        totalDue = Math.round(totalDue * 100) / 100;
      }

      if (value > 0) {
        // in fix to turn it into a number
        exactChange.push([cashInDraw[_][0], +value.toFixed(2)]);
      }
    }
    // the edge case
    if (exactChange.length < 1 || totalDue > 0) {
      return "Insufficient Funds";
    }

    return exactChange;
  }
}
var currency = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1.0,
  FIVE: 5.0,
  TEN: 10.0,
  TWENTY: 20.0,
  "ONE HUNDRED": 100.0,
};

checkCashRegister(19.5, 20.0, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90.0],
  ["FIVE", 55.0],
  ["TEN", 20.0],
  ["TWENTY", 60.0],
  ["ONE HUNDRED", 100.0],
]);
