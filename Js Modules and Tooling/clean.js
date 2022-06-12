const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

const getLimit = user => spendingLimits?.[user] ?? 0;

const add = function (value, description, user = 'jonas') {
  user = user.toLowerCase();
  const limit = getLimit(user);

  if (value <= limit) {
    budget.push({ value: -value, description, user });
  }
};
add(10, 'Pizza 🍕');
add(100, 'Going to movies 🍿', 'Matilda');
add(200, 'Stuff', 'Jay');
console.log(budget);

const checkLimit = function () {
  for (const entry of budget) {   
    const limit = getLimit(entry)

    if (entry.value < -limit) {
      entry.flag = 'limit';
    }
  }
};
checkLimit();

console.log(budget);

const bigExpenses = function (limit) {
  let output = '';

  for (const entry of budget)
      output += entry.value <= -limit ? entry.description.slice(-2) + ' / ': ''; // Emojis are 2 chars
  
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

bigExpenses(100)
