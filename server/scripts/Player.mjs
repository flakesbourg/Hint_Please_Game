export default class Player {
    constructor (name) {
        this.name = name;
        this.balance = 10;
        this.hints = [];
    }

    changeBalance(value) {
        this.balance += value;
    }
}