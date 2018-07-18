const n1 = Math.floor(Math.random() * 100);
const n2 = Math.floor(Math.random() * 10);

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`${n1} % ${n2} ?`, (answer) => {
  // TODO: Log the answer in a database
  if (+answer === n1 % n2) {
    console.log('This is good');
  } else {
    console.log('This is not good');
  }

  rl.close();
});

