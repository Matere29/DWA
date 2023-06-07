// scripts.js

// scripts.js
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");
const comment = document.querySelector('[data-result="data-result"]')
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  result.innerHTML = `${Math.floor(dividend / divider)}`;
  if (result.innerHTML === 'NaN' || dividend === '' || divider ===''){
    result.innerHTML = 'Division not performed. Both values are required in inputs. Try again'
  }
  try {
    if (dividend < 0 || divider < 0) {
        // result.innerHTML = 'Division not performed. Invalid number provided. Try again'
        console.error('Division not performed. Invalid number provided. Try again')
        throw 'Division not performed. Invalid number provided. Try again'
        }
        else if (isNaN(dividend) || isNaN(divider)){
        // result.innerHTML = 'Something critical went wrong. Please reload the page'
        console.error('Something critical went wrong. Please reload the page')
        throw 'Something critical went wrong. Please reload the page'
        }
  } catch (error) {
    result.innerHTML = error
  }
});