import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');
const emailInput = document.querySelector(`[name="email"]`);
const messageInput = document.querySelector(`[name="message"]`);

formRef.addEventListener(`input`, throttle(setKeyInLocalStorage, 500));
formRef.addEventListener(`submit`, onSubmit);

const formData = {};
updateForm();
function setKeyInLocalStorage(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
function updateForm() {
  try {
    const localData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (localData.email) {
      emailInput.value = localData.email;
    }
    if (localData.message) {
      messageInput.value = localData.message;
    }
    Object.assign(formData, localData);
  } catch (error) {
    console.log('Пожалуйста, заполните поля');
  }
}

function onSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  evt.target.reset();
}
