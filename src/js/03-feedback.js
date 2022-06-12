var throttle = require('lodash.throttle');

const formData = {};
const FEEDBACK = "feedback-form-state";

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

onSaveMessage();

function onFormInput (event) {
    formData[event.target.name] = event.target.value;

    const storage = JSON.stringify(formData);

    localStorage.setItem(FEEDBACK, storage);
}

function onFormSubmit(event) {
    event.preventDefault();

    event.currentTarget.reset();

    localStorage.removeItem(FEEDBACK);
    console.log(formData);
}

function onSaveMessage() {
    const saveMessage = localStorage.getItem(FEEDBACK);
    const save = JSON.parse(saveMessage);
    
    if (save) {
        input.value = save.email;
        textarea.value = save.message;
    }
}