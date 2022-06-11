var throttle = require('lodash.throttle');

const formData = {};

const FEEDBACK = "feedback-form-state";
const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const inputEmail = document.querySelector('.feedback-form input')

form.addEventListener('submit', onFormSubmit);
textarea.addEventListener('input', throttle(onTextareaInput, 500));
inputEmail.addEventListener('input', throttle(onInput, 500));

onTextareaSaveMessage();

function onInput(event) {
    const email = event.target.value;

    localStorage.setItem(FEEDBACK, email);
}


function onFormSubmit(event) {
    event.preventDefault();

    formData[event.target.name] = event.target.value;
    console.log(formData);

    event.currentTarget.reset();

    localStorage.removeItem(FEEDBACK);
}


function onTextareaInput(event) {
    const message = event.target.value;

    localStorage.setItem(FEEDBACK, message);
}


function onTextareaSaveMessage() {
    const textareaMessage = localStorage.getItem(FEEDBACK);

    if (textareaMessage) {
        console.log(textareaMessage);
        textarea.value = textareaMessage;
    }
}