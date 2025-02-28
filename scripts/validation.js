const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-save_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__input-error_active",
};

// function to selecting all forms
function enableValidation(config) {
  // Selecting all forms
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    // Call event listener function and set on each form
    setEventListeners(formEl, config);
  });
}
enableValidation(settings);

// Set event listener
function setEventListeners(form, config) {
  const inputElements = Array.from(form.querySelectorAll(config.inputSelector));

  // for each input element call validation checker
  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(form, inputEl, config);
      toggleSubmitButtons(inputElements, form, config);
    });
  });
}

// function to check input validity and call function
// to desplay error or not
function checkInputValidity(form, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(form, inputEl, config);
    console.log(inputEl.validity.typeMismatch);
  } else {
    hideInputError(form, inputEl, config);
  }
}

// function to select and show error
function showInputError(form, inputEl, config) {
  const inputError = form.querySelector(`.${inputEl.id}-error`);
  inputError.textContent = inputEl.validationMessage;
  inputError.classList.add(config.errorClass);
  inputEl.classList.add(config.inputErrorClass);
}

// function to hide error
function hideInputError(form, inputEl, config) {
  const inputError = form.querySelector(`.${inputEl.id}-error`);
  inputError.classList.remove(config.errorClass);
  inputEl.classList.remove(config.inputErrorClass);
}

// function if any input is not valid disable submit button
function toggleSubmitButtons(inputList, form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    // submitButton.classList.add(config.inactiveButtonClass);
    disableSubmitButton(submitButton);
  } else {
    // submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableSubmitButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// function to reset error displayed in edit profile form after closed
const resetErrorDisplayedInEditProfileModal = (form, config) => {
  const inputElements = Array.from(form.querySelectorAll(config.inputSelector));

  // for each input element call function to hide error
  inputElements.forEach((inputEl) => {
    hideInputError(form, inputEl, config);
  });
};
