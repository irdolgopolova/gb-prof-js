document
    .querySelector('.user_form')
    .addEventListener('submit', event => {
        let formValidator = new FormValidator('user_form');

        if (!formValidator.isValid) {
            event.preventDefault();
        }
    });

class FormValidator {
    constructor(classnameForm) {
        this.classnameForm = classnameForm;
        this.isValid = true;
        this._setValidators();
        this._checkValidate();
    }

    _setValidators() {
        this.validators = {
            name: {
                pattern: /^[а-яё]+$/i,
                message: "Имя содержит только буквы"
            },
            phone: {
                pattern: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
                message: "Телефон имеет вид +7(000)000-0000"
            },
            email: {
                pattern: /^[\w.-]+@[a-z]+\.\w{2,4}$/i,
                message: "E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru"
            }
        }
    }

    _clearErrors() {
        let listInputForm = document.querySelectorAll('.user_form__input.error');
        for (let inputForm of listInputForm) {
            if (inputForm.classList.contains('error')) {
                inputForm.classList.remove('error');
            }
        }

        let listErrorsMessage = document.querySelectorAll('.error_message');
        for (let errorsMessage of listErrorsMessage) {
            errorsMessage.remove();
        }
    }

    _checkValidate() {
        this._clearErrors();

        let listInputForm = document.querySelectorAll('.user_form__input');
        for (let inputForm of listInputForm) {
            if (inputForm.name in this.validators) {
                let validator = this.validators[inputForm.name];
                let isValid = validator['pattern'].test(inputForm.value)

                if (!isValid) {
                    inputForm.classList.add('error');

                    let template = `<span class="error_message">${validator['message']}</span>`;
                    inputForm.insertAdjacentHTML("afterend", template);

                    this.isValid = false;
                }
            }
        }
    }
}