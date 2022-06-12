'use strict'
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100
});

const getLimit = (limits, user) => limits?.[user] ?? 0;

const addExpenses = function (state, limits, value, description, user = 'jonas') {
  const userClean = user.toLowerCase();
  const limit = getLimit(user);

  // if (value <= limit) {
  //   budget.push({ value: -value, description, user });
  // }
  return value <= getLimit(limits, userClean) ? [...state, { value, description, user: userClean }] : state
};
const newBudget = addExpenses(budget, spendingLimits, 100, 'Pizza 🍕');
const newBudget2 = addExpenses(newBudget, spendingLimits, 100, 'Pizza 🍕');
const newBudget3 = addExpenses(newBudget2, spendingLimits, -100, 'Pizza 🍕');
// addExpenses(100, 'Going to movies 🍿', 'Matilda');
// addExpenses(200, 'Stuff', 'Jay');
console.log(budget);



// const checkExpenses = function (state, limits) {
//   return state.map(entry => {
//     return entry.value < -getLimit(limits,entry.user) ? {...entry, flag: 'limit'}
//    : entry;
//   })
// for (const entry of budget) {   
//   const limit = getLimit(entry)
//   if (entry.value < -getLimit(limits,entry.user)) 
//     entry.flag = 'limit';
// }
// };

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user) ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3);
console.log(finalBudget);

// console.log(budget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state.filter(entry =>
    entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2)).join(' / ')
  // .reduce((acc,cur) =>`${acc} / ${cur.description.slice(-2)}` , '')
  console.log(bigExpenses);




  // let output = '';
  // for (const entry of budget)
  //     output += entry.value <= -limit ? entry.description.slice(-2) + ' / ': ''; // Emojis are 2 chars 
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logBigExpenses(finalBudget, 50)
