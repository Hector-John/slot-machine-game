//  deposit cash
// determine the no. of lines to bet on
// collect bet amount
// spin slot
// check winnings
// award winnings
// reset

// collect deposit
const prompt = require("prompt-sync")();

// Global variables
const rows = 3;
const columns = 3;
 
// MAPPING
const symbolsCount = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SymbolValues = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// User deposit
const deposit = () => {
  while (true) {
    const depoAmount = prompt("How much do you wish to deposit: ");
    const numberDepoAmount = parseFloat(depoAmount);

    if (isNaN(numberDepoAmount) || numberDepoAmount <= 0) {
      console.log("Amount cannot be 0, please try again.");
    } else {
      return numberDepoAmount;
    }
  }
};

// Get number of lines to bet on
const numberOfLines = () => {
  while (true) {
    const lines = prompt(
      "Enter the number of lines you want to bet on (1-3): "
    );
    const numberOfLinesInput = parseFloat(lines);

    if (
      isNaN(numberOfLinesInput) ||
      numberOfLinesInput <= 0 ||
      numberOfLinesInput > 3
    ) {
      console.log("Invalid number of lines, please try again.");
    } else {
      return numberOfLinesInput;
    }
  }
};

// Collecting bet amount
const getBet = (balance, linesToBetOn) => {
  while (true) {
    const bet = prompt("Enter the number of bet you placed: ");
    const betOption = parseFloat(bet);

    if (
      isNaN(betOption) ||
      betOption <= 0 ||
      betOption > balance / linesToBetOn
    ) {
      console.log("Invalid bet, please try again.");
    } else {
      return betOption;
    }
  }
};

// Spin function
const spin = () => {
  const symbols = [];
  // Create an array with symbols based on their counts
  for (const [symbol, count] of Object.entries(symbolsCount)) {
    console.log(symbol, count);
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  // Populate each reel with random symbols
  for (let i = 0; i < columns; i++) {
    reels.push([]);
    const reelSymbols = [...symbols]; // Deep copy of symbols for each reel
    for (let h = 0; h < rows; h++) {
      // Select random index
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const symbolSelected = reelSymbols[randomIndex];
      reels[i].push(symbolSelected);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

// Transpose function
const transpose = (matrix) => {
  // Swap rows and columns of the matrix
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};

// PrintRows function
const PrintRows = (rows) => {
  // Display the symbols in a row with separators
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i !== row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// Check winning
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  // Check each row for identical symbols and calculate winnings
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let same = true;

    for (const symbol of symbols) {
      if (symbol !== symbols[0]) {
        same = false;
        break;
      }
    }

    if (same) {
      winnings += bet * SymbolValues[symbols[0]];
    }
  }
  return winnings;
};

// Main game logic
const playGame = () => {
  let balance = deposit();

  while (true) {
    console.log('Your balance is Ksh. ' + balance);
    const linesToBetOn = numberOfLines();
    const bet = getBet(balance, linesToBetOn);
    balance -= bet * linesToBetOn;
    const reels = spin();
    const transposedRows = transpose(reels);
    PrintRows(transposedRows);
    const winnings = getWinnings(transposedRows, bet, linesToBetOn);
    balance += winnings;

    console.log('Congratulations, you won Ksh. ' + winnings.toString());

    if (balance <= 5) {
      console.log('You have insufficient balance to play.');
      break;
    }

    const restart = prompt('Do you wish to play again? (yes/no)');

    if (restart.toLowerCase() !== 'yes') {
      break;
    }
  }
};

// Run the game
playGame();
