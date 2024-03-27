import GameState from "../scripts/GameState.mjs";
import {jest} from "@jest/globals"
import Player from "../scripts/Player.mjs";

describe("GameState", () => {
    let gameState;

    beforeEach(() => {
        gameState = new GameState('./scripts/testData/test.json');
    });

    describe(".addPlayer()", () => {
        test("defines a function", () => {
            expect(typeof gameState.addPlayer).toBe("function");
        });

        test("call addPlayer without arguments", () => {
            expect(() => gameState.addPlayer()).toThrow(Error);
        });

        test("call addPlayer with wrong argument", () => {
            expect(() => gameState.addPlayer("string")).toThrow(Error);
        });

        test("call addPlayer with an argument", () => {
            let player = new Player("name");
            expect(() => gameState.addPlayer(player)).not.toThrow(Error);
            expect(gameState.players.length).toBe(1);
        });

        test("call addPlayer with a second player with the same name", () => {
            let player1 = new Player("name");
            let player2 = new Player("name");
            expect(() => gameState.addPlayer(player1)).not.toThrow(Error);
            expect(() => gameState.addPlayer(player2)).toThrow(Error);
            expect(gameState.players.length).toBe(1);
        });

        test("call addPlayer with distinct arguments", () => {
            let player1 = new Player("name1");
            let player2 = new Player("name2");
            expect(() => gameState.addPlayer(player1)).not.toThrow(Error);
            expect(() => gameState.addPlayer(player2)).not.toThrow(Error);
            expect(gameState.players.length).toBe(2);
        });
    });

    describe(".getPlayer(name)", () => {
        test("defines a function", () => {
            expect(typeof gameState.getPlayer).toBe("function");
        });

        test("call getPlayer with existing player", () => {
            let player = new Player("name");
            gameState.addPlayer(player);
            expect(gameState.getPlayer("name")).toBe(player);
        });

        test("call getPlayer with not existing players name", () => {
            expect(gameState.getPlayer("name")).toBeUndefined();
        });

        test("call getPlayer without argument", () => {
            expect(gameState.getPlayer()).toBeUndefined();
        });
    });

    describe(".playerBuysHint(name, hintnumber)", () => {
        test("defines a function", () => {
            expect(typeof gameState.playerBuysHint).toBe("function");
        });

        test("call playerBuysHint without an argument", () => {
            let player = new Player("name");
            let balance = player.balance;

            gameState.addPlayer(player);

            expect(() => gameState.playerBuysHint()).toThrow(Error);
            expect(player.hints[0]).toBeUndefined();
            expect(player.balance).toBe(balance);
        });

        test("call playerBuysHint with one argument", () => {
            let player = new Player("name");
            let balance = player.balance;

            gameState.addPlayer(player);

            expect(() => gameState.playerBuysHint("name")).toThrow(Error);
            expect(player.hints[0]).toBeUndefined();
            expect(player.balance).toBe(balance);
        });

        test("call playerBuysHint one time with two valid arguments", () => {
            let player = new Player("name");
            let hintNumber = 0;
            let balance = player.balance;

            gameState.addPlayer(player);

            expect(() => gameState.playerBuysHint("name", hintNumber)).not.toThrow(Error);
            expect(player.hints[0]).toEqual({ category: gameState.gameData[gameState.currentRound]["hints"][hintNumber]["category"], hint: gameState.gameData[gameState.currentRound]["hints"][hintNumber]["hint"] });
            expect(player.balance).toBe(balance - gameState.gameData[gameState.currentRound]["hints"][hintNumber]["price"]);
        });

        test("call playerBuysHint with unvalid playerName", () => {
            let player = new Player("name");
            let hintNumber = 0;
            let balance = player.balance;

            gameState.addPlayer(player);

            expect(() => gameState.playerBuysHint("unvalid_name", hintNumber)).toThrow(Error);
            expect(player.hints[0]).toBeUndefined();
            expect(player.balance).toBe(balance);
        });

        test("call playerBuysHint with unvalid hintNumber", () => {
            let player = new Player("name");
            let hintNumber = -1;
            let balance = player.balance;

            gameState.addPlayer(player);

            expect(() => gameState.playerBuysHint("name", hintNumber)).toThrow(Error);
            expect(player.hints[0]).toBeUndefined();
            expect(player.balance).toBe(balance);
        });

        test("call playerBuysHint too often", () => {
            let player = new Player("name");
            let hintNumber = 0;

            gameState.addPlayer(player);

            expect(() => gameState.playerBuysHint("name", hintNumber)).not.toThrow(Error);
            expect(() => gameState.playerBuysHint("name", hintNumber)).not.toThrow(Error);
            expect(() => gameState.playerBuysHint("name", hintNumber)).toThrow(Error)
        });

        test("call playerBuysHint but balance too low", () => {
            let player = new Player("name");
            let hintNumber = 0;

            gameState.addPlayer(player);

            expect(() => gameState.playerBuysHint("name", hintNumber)).not.toThrow(Error);
            expect(player.balance).toBe(7);
            expect(() => gameState.playerBuysHint("name", hintNumber)).not.toThrow(Error);
            expect(player.balance).toBe(4);
            gameState.nextRound();
            expect(() => gameState.playerBuysHint("name", hintNumber)).not.toThrow(Error);
            expect(player.balance).toBe(1);
            expect(() => gameState.playerBuysHint("name", hintNumber)).toThrow(Error);
            expect(player.balance).toBe(1);
        });
    });

    describe(".getBalanceOfPlayer(name)", () => {
        test("defines a function", () => {
            expect(typeof gameState.getBalanceOfPlayer).toBe("function");
        });

        test("get Balance of existing player", () => {
            let player = new Player("name");
            gameState.addPlayer(player);
            expect(gameState.getBalanceOfPlayer("name")).toBe(10);
            player.balance = 5;
            expect(gameState.getBalanceOfPlayer("name")).toBe(5);
        });

        test("get Balance of nonexistent player", () => {
            expect(gameState.getBalanceOfPlayer("name")).toBeUndefined();
        });
    });

    describe(".playerMakesGuess(name, guess)", () => {
        test("defines a function", () => {
            expect(typeof gameState.playerMakesGuess).toBe("function");
        });

        test("call without arguments", () => {
            expect(() => gameState.playerMakesGuess()).toThrow(Error);
        });

        test("call with one argument", () => {
            expect(() => gameState.playerMakesGuess("name")).toThrow(Error);
        });

        test("call with unvalid player", () => {
            let player = new Player("name");
            gameState.addPlayer(player);
            expect(() => gameState.playerMakesGuess("unvalid_name", "guess")).toThrow(Error);
        });

        test("call with valid player", () => {
            let player = new Player("name");
            gameState.addPlayer(player);
            expect(() => gameState.playerMakesGuess("name", "guess")).not.toThrow(Error);
        });

        test("call with unvalid guess", () => {
            let player = new Player("name");
            gameState.addPlayer(player);
            expect(() => gameState.playerMakesGuess("name", 2)).toThrow(Error);
        });
    });

    describe(".playerIsCorrect(name)", () => {
        test("describe a function", () => {
            expect(typeof gameState.playerIsCorrect).toBe("function");
        });

        test("call without argument", () => {
            expect(() => gameState.playerIsCorrect()).toThrow(Error);
        });

        test("call with unvalid name", () => {
            let player = new Player("name");
            let balance = player.balance;
            gameState.addPlayer(player);

            expect(() => gameState.playerIsCorrect("unvalid_name")).toThrow(Error);
            expect(player.balance).toBe(balance);
        });

        test("call with valid name", () => {
            let player = new Player("name");
            let balance = player.balance;
            gameState.addPlayer(player);

            expect(() => gameState.playerIsCorrect("name")).not.toThrow(Error);
            expect(player.balance).toBe(balance + 15);
        });
    });

    describe(".nextRound()", () => {
        test("describe a function", () => {
            expect(typeof gameState.nextRound).toBe("function");
        });

        test("call once", () => {
            let player = new Player("name");
            gameState.addPlayer(player);
            gameState.playerBuysHint("name", 0);
            gameState.playerMakesGuess("name", "guess");
            gameState.playerIsCorrect("name");

            expect(player.hints.length).toBe(1);
            expect(gameState.currentRound).toBe(0);

            gameState.nextRound();

            expect(player.hints.length).toBe(0);
            expect(gameState.currentRound).toBe(1);
        });

        test("call function too often", () => {
            let player = new Player("name");
            let gameDataLength = gameState.gameData.length;

            gameState.addPlayer(player);
            gameState.playerBuysHint("name", 0);
            gameState.playerMakesGuess("name", "guess");
            gameState.playerIsCorrect("name");

            expect(player.hints.length).toBe(1);
            expect(gameState.currentRound).toBe(0);

            for (let i = 0; i < gameDataLength; i++) {
                gameState.nextRound();
            }

            expect(() => gameState.nextRound()).toThrow(Error);

            expect(player.hints.length).toBe(0);
            expect(gameState.currentRound).toBe(gameDataLength);
        });
    });
});