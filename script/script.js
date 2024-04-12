const grossAnnualInput = document.getElementById("gross-annual");
const extraIncomeInput = document.getElementById("extra-income");
const age = document.getElementById("age-group");
const totalDeductionsInput = document.getElementById(
  "total-applicable-deductions"
);

const overallIncomeElement = document.querySelector(".overall-income");
const submitButton = document.getElementById("submit");

let grossAnnualIncome = 0;
let extraIncome = 0;
let deductions = 0;
let ageGroup = "";

function validateInput(inputElement) {
  const inputValue = inputElement.value.trim(); // Trim the input value to remove leading/trailing spaces
  const isValidNumber = /^\d+(\.\d+)?$/.test(inputValue);
  console.log(isValidNumber);
  if (isValidNumber && inputValue !== "") {
    inputElement.style.borderColor = "green";
    inputElement.nextElementSibling.classList.add("hide"); // Hide exclamation icon
    return parseFloat(inputValue);
  } else {
    inputElement.style.borderColor = "red";
    inputElement.nextElementSibling.classList.remove("hide"); // Show exclamation icon
    return 0;
  }
}

function validateAgeInput(ageElement) {
  if (!ageElement.value) {
    ageElement.style.borderColor = "red";
    ageGroup = "";
  } else {
    ageElement.style.borderColor = "green";
    ageGroup = ageElement.value;
  }
}

function enableDisableSubmitButton() {
  const isValidInputs =
    grossAnnualIncome !== 0 &&
    extraIncome !== 0 &&
    deductions !== null &&
    ageGroup !== "";
  submitButton.disabled = !isValidInputs;
}

grossAnnualInput.addEventListener("input", () => {
  grossAnnualIncome = validateInput(grossAnnualInput);
  enableDisableSubmitButton();
});

extraIncomeInput.addEventListener("input", () => {
  extraIncome = validateInput(extraIncomeInput);
  enableDisableSubmitButton();
});

totalDeductionsInput.addEventListener("input", () => {
  deductions = validateInput(totalDeductionsInput);
  enableDisableSubmitButton();
});

age.addEventListener("change", () => {
  validateAgeInput(age);
  enableDisableSubmitButton();
});

function calculateOverallIncome() {
  let overallIncome = grossAnnualIncome + extraIncome - deductions;
  let tax = 0;

  if (overallIncome > 800000) {
    if (ageGroup === "<40") {
      tax = 0.3 * (overallIncome - 800000);
    } else if (ageGroup === ">=40 & <60") {
      tax = 0.4 * (overallIncome - 800000);
    } else if (ageGroup === ">=60") {
      tax = 0.1 * (overallIncome - 800000);
    }
  }

  overallIncome -= tax;

  // Format overallIncome with commas
  const formattedOverallIncome = overallIncome.toLocaleString();

  overallIncomeElement.textContent = `₹ ${formattedOverallIncome}`;
}

submitButton.addEventListener("click", function () {
  validateInput(grossAnnualInput);
  validateInput(extraIncomeInput);
  validateInput(totalDeductionsInput);
  validateAgeInput(age);
  calculateOverallIncome();
});

// Initially disable the submit button
submitButton.disabled = true;

document.getElementById("submit").addEventListener("click", function () {
  document.getElementById("overview").style.display = "block";
});

document.getElementById("close").addEventListener("click", function () {
  document.getElementById("overview").style.display = "none";
});

document.getElementById("overview").addEventListener("click", function (event) {
  if (event.target === this) {
    document.getElementById("overview").style.display = "none";
  }
});

// reset calculator
document.getElementById("reset").addEventListener("click", function (event) {
  event.preventDefault();
  // Reset input fields
  document.getElementById("gross-annual").value = "";
  document.getElementById("extra-income").value = "";
  document.getElementById("age-group").selectedIndex = 0;
  document.getElementById("total-applicable-deductions").value = "";

  // Hide error messages and reset border colors
  const errorIcons = document.querySelectorAll(".bi-exclamation-circle");
  errorIcons.forEach((icon) => {
    icon.classList.add("hide");
  });

  const inputs = document.querySelectorAll(".input");
  inputs.forEach((input) => {
    input.style.borderColor = "";
  });

  // Reset variables
  grossAnnualIncome = 0;
  extraIncome = 0;
  deductions = 0;
  ageGroup = "";

  // Disable submit button
  enableDisableSubmitButton();
});
