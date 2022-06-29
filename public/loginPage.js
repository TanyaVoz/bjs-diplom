'use strict';

const userForm = new userForm();

//вход
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, response => {

        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    });
};

//регистрация
userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, response => {

        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    });
};