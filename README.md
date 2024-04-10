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
The following steps are different for every role.
### Start
Click the "create"-button to create a new game lobby and the host view will be displayed.
<br></br>
The user can also insted fill out the form and join an existing game.
<br></br>
<img src="https://github.com/flakesbourg/hint_please_game/assets/112900790/63f4822d-3836-4a39-b84a-7818edba0b3f" alt="Alt-Text" width="500" >
<br></br>

---

### Host:

After the "create"-button in the start view is clicked and players joined, the following host view will be displayed:
<br></br>
<img src="https://github.com/flakesbourg/hint_please_game/assets/112900790/c459cfc3-b3dd-4451-9f1a-db89d3feb303" alt="Alt-Text" width="500" >
<br></br>
By checking the checkbox of a player, the player will be marked as correct.
If the players made their guesses and the host decides that the round over, the host can click the "next round" or "end game"-button to start the next round or end the game.
If the "leave game"-button is clicked the user will get back to the start view.

---

### Player:

After the "join"-button in the start view is clicked and players joined, the following player view will be displayed:
<br></br>
<img src="https://github.com/flakesbourg/hint_please_game/assets/112900790/61c771e9-0bcb-49e5-82e2-6f20b88af6d7" alt="Alt-Text" width="500" >
<br></br>

---

### End:

After the host ends the game a ranking of the best players will be shown to everyone participating in the game.
A button at the bottom will redirect the user to the start view.
<br></br>
<img src="https://github.com/flakesbourg/hint_please_game/assets/112900790/86139bd8-e9c0-4072-968b-5923c451e6d8" alt="Alt-Text" width="500" >
<br></br>
