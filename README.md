# Hint Please!
"Hint Please!" is a game where players need to guess a certain video game, movie, song, etc. in every round.
After I saw youtubers playing a similar game without such a program I thought it would be practical to 
develop an application which solves the problems that comes with the manual execution of such a game.
With this application a person can host and coordinate the game for multiple players.
<br></br>
For the server side of the application I used "Node.js" with "Socket.io" to send the update of a games state to 
every participatig player. The client side is made with React to create a interactive one-page application.
<br></br>
In possible future updates the host view may show more information like the hints a player bought or 
all available hints.

## Rules
The following rules apply for the game:
* To get closer to the answer, a player can buy up to 2 hints with their credit.
* The price of a hint is higher the more helpful it is.
* If a player guessed correct, the players balance increases by 15.
* The player with the highest credit by the end of the game wins.

## How to Use
1. Host a new Game
![Start View](https://github.com/flakesbourg/hint_please_game/assets/112900790/63f4822d-3836-4a39-b84a-7818edba0b3f | width=100)
<img src="https://github.com/flakesbourg/hint_please_game/assets/112900790/63f4822d-3836-4a39-b84a-7818edba0b3f" alt="Alt-Text" width="500" >
