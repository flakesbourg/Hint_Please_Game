import Player from "./Player.mjs";
import fs from "fs"

export default class GameState {
    constructor(gameDataPath) {
        this.players = [];
        this.currentRound = 0;
        this.gameData = JSON.parse(fs.readFileSync(gameDataPath).toString());
    }

    addPlayer(player) {
        if(!player)
            throw new Error("this player is undefined");

        if(!(player instanceof Player))
            throw new Error("argument is not an instance of class Player");

        if(this.players.find((elem) => elem.name === player.name))
            throw new Error("Player with this name already exists");

        this.players.push(player);
    }

    getPlayer(name) {
        return this.players.find((elem) => elem.name === name);
    }

    getBalanceOfPlayer(name) {
        let player = this.getPlayer(name);
        return player ? player.balance : undefined;
    }

    nextRound() {
        if (this.currentRound >= this.gameData.length)
            throw new Error("already the last round");

        this.currentRound++;
        this.players.forEach((player) =>{
            player.hints = [];
            player.guess = "";
        });
    }

    playerBuysHint(name, hintNumber) {
        let hint = this.gameData[this.currentRound]["hints"][hintNumber];
        let player = this.getPlayer(name);

        if(!hint)
            throw new Error("hint is unvalid");
        
        if(!player)
            throw new Error("player is unvalid");

        if(player.hints.length >= 2)
            throw new Error("player cant buy another hint");

        let price = hint["price"];

        if(player.balance < price)
            throw new Error("player doesnt have enough money");
        
        player.changeBalance(-price);
        player.hints.push({ category: this.gameData[this.currentRound]["hints"][hintNumber]["category"], hint: this.gameData[this.currentRound]["hints"][hintNumber]["hint"] });
    }

    playerIsCorrect(name) {
        let player = this.getPlayer(name);

        if(!player) 
            throw new Error("player is unvalid");

        player.balance += 15;
    }

    playerMakesGuess(name, guess) {
        let player = this.getPlayer(name);
        guess = guess.trim();

        if (!player)
            throw new Error("player is unvalid");

        if (typeof guess !== "string")
            throw new Error("guess is unvalid");

        if (!guess)
            guess = "";

        player.guess = guess;
    }

    getHints() {
        let hints = this.gameData[this.currentRound]["hints"];
        let result = [];

        for (let i = 0; i < hints.length; i++) {
            result.push({ category: this.gameData[this.currentRound]["hints"][i]["category"], price: this.gameData[this.currentRound]["hints"][i]["price"], hintNumber: i });
        }

        return result;
    }

    getAllOtherPlayers(name) {
        let result = [];
        this.players.forEach((elem) => {
            if(elem.name !== name) {
                result.push({name: elem.name, balance: elem.balance});
            }
        });

        return result;
    }
}