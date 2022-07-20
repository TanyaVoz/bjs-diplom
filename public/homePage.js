//реализация выхода из личного кабинета
const logout = new LogoutButton();

logout.action = () => ApiConnector.logout(response => {
    if (response.success) {
        location.reload();
    }
});

//Получение информации о пользователе
ApiConnector.current(response => {

    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

//реализация получения курса валюты
const ratesBoard = new RatesBoard();

function stocks() {
    ApiConnector.getStocks(response => {

        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

stocks();
setTimeout(stocks, 60000);

//1.блок операции с деньгами
const moneyManager = new MoneyManager();

//1.2  пополнение баланса
moneyManager.addMoneyCallback = (data) => {

    ApiConnector.addMoney(data, response => {  // запрос на пополнение баланса 

        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Счет был успешно пополнен");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

//1.3 конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {

        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация прошла успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

//1.4 перевод валюты
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {

        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод прошел успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

//1.блок "Работа с избранным"
const favorite = new FavoritesWidget();

//1.2 начальный список избранного
ApiConnector.getFavorites(function (response) {
    if (response.success) {
        favorite.clearTable();
        favorite.fillTable(response.success);
        moneyManager.updateUsersList(response.success);
    }
});

//1.3 Реализуйте добавления пользователя в список избранных
favorite.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {

        if (response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favorite.setMessage(response.success, "Пользователь добавлен");
        } else {
            favorite.setMessage(response.success, response.error);
        }
    });
}
//1.4 Реализуйте удаление пользователя из избранного
favorite.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favorite.setMessage(response.success, "Пользователь удален");
        } else {
            favorite.setMessage(response.success, response.error);
        }
    });
}