class Api {
    constructor(serverUrl, headers) {
        this._serverUrl = serverUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(this._serverUrl, {
            method: "GET",
            headers: this._headers
        }).then((res) => {
            debugger;
            return res.json();
        })
    }






















    _errorHandler(error) {
        console.log(error);
    }
}