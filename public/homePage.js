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