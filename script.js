// define variables
const form = document.getElementById("registration-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const strengthIndicator = document.getElementById("password-strength");
const captchaInput = document.getElementById("captcha");
const captchaImage = document.getElementById("captcha-img");
const submitButton = document.getElementById("submit-button");
const registerButton = document.getElementById('register-button');
registerButton.addEventListener('click', registerUser);


// password strength criteria
const passwordCriteria = {
  minLength: 8,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[^A-Za-z0-9]/
};

// function to check password strength
function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= passwordCriteria.minLength) {
    strength++;
  }
  if (passwordCriteria.hasUppercase.test(password)) {
    strength++;
  }
  if (passwordCriteria.hasLowercase.test(password)) {
    strength++;
  }
  if (passwordCriteria.hasNumber.test(password)) {
    strength++;
  }
  if (passwordCriteria.hasSpecialChar.test(password)) {
    strength++;
  }
  return strength;
}

// function to update password strength indicator
function updateStrengthIndicator(strength) {
  strengthIndicator.textContent = `Password strength: ${strength}/5`;
  strengthIndicator.className = `strength-${strength}`;
}

// function to generate random captcha code
function generateCaptcha() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// function to update captcha image
function updateCaptchaImage() {
  const captchaCode = generateCaptcha();
  captchaImage.src = `https://dummyimage.com/120x50/000/fff&text=${captchaCode}`;
  return captchaCode;
}

// initialize captcha
let captchaCode = updateCaptchaImage();

// event listener for password input
passwordInput.addEventListener("input", (event) => {
  const password = event.target.value;
  const strength = checkPasswordStrength(password);
  updateStrengthIndicator(strength);
});

// event listener for captcha input
captchaInput.addEventListener("input", (event) => {
  const inputCode = event.target.value;
  if (inputCode === captchaCode) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

// event listener for form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // validate input fields
  const username = usernameInput.value;
  const password = passwordInput.value;
  const captcha = captchaInput.value;
  if (!username || !password || !captcha) {
    alert("Please fill in all fields.");
    return;
  }
  if (checkPasswordStrength(password) < 3) {
    alert("Password is too weak.");
    return;
  }
  if (captcha !== captchaCode) {
    alert("Captcha code is incorrect.");
    return;
  }
  // send email with token
  const token = Math.floor(Math.random() * 900000) + 100000;
  const emailMessage = `Your One Time Token is ${token}.`;
  alert(emailMessage);
});
function register() {
    // Code to register the user goes here
    console.log('User registered!');
  }