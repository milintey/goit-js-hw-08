var throttle = require('lodash.throttle');

let formData = {};
const FEEDBACK = "feedback-form-state";

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

onSaveMessage();
onProverka();

function onProverka() {
    if (localStorage.getItem(FEEDBACK)) {
        const saveMessage = localStorage.getItem(FEEDBACK);
        const save = JSON.parse(saveMessage);
        formData = save;
    }
}

function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    const storage = JSON.stringify(formData);
    localStorage.setItem(FEEDBACK, storage);
    
}

function onFormSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(FEEDBACK);

    console.log(formData);

    for (const key in formData) {
        delete formData[key];
    }
}

function onSaveMessage() { 
    const saveMessage = localStorage.getItem(FEEDBACK);
    const save = JSON.parse(saveMessage);

    if (save === null) {
        input.value = "";
        textarea.value = "";
    } else if (save.email === undefined && save.message !== undefined) {
        input.value = ""
        textarea.value = save.message;
    } else if (save.email !== undefined && save.message === undefined) {
        input.value = save.email;
        textarea.value = "";
    } else if (save) {
        input.value = save.email;
        textarea.value = save.message;
    }
}


