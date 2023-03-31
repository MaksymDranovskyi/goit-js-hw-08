import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onSubmit);

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
reloadPage();

function onInputData(event) {
  formData = { email: email.value, message: message.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmit(event) {
  event.preventDefault();
  console.log({ email: email.value, message: message.value });

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  formData = {};
}

function reloadPage() {
  if (formData) {
    email.value = formData.email || '';
    message.value = formData.message || '';
  }
}
