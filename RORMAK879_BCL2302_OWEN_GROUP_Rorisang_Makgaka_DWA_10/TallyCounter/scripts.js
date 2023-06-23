const MAX_NUMBER = 10;
const MIN_NUMBER = -1;
const STEP_AMOUNT = 1;

const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const reset = document.querySelector('[data-key="reset"]');

/**
 * Decrement total number by 5
 * Checks if the number is equal to -5 (min number) and stops decrementing
 * @returns {number} 
 */
const subtractHandler = () => {
  const newValue = parseInt(number.value) - STEP_AMOUNT;
  number.value = newValue;
  if (add.disabled === true) {
    add.disabled = false;
  }
  if (newValue <= MIN_NUMBER) {
    subtract.disabled = true;
  }
};

/**
 * Increment total number by 5
 * Checks if the number is equal to 15 (max number) and stops incrementing
 * @returns {number} 
 */
const addHandler = () => {
  const newValue = parseInt(number.value) + STEP_AMOUNT;
  number.value = newValue;
  if (subtract.disabled === true) {
    subtract.disabled = false;
  }
  if (newValue >= MAX_NUMBER) {
    add.disabled = true;
  }
};

const resetHandler = ('click', () => {
  
//number = 0;

//number.textContent = MAX_NUMBER;

   // Display a confirmation message
   alert('The counter has been reset.');

})

subtract.addEventListener('click', subtractHandler);
add.addEventListener('click', addHandler);
reset.addEventListener('click', resetHandler);
