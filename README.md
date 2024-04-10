# Hint Please!
"Hint Please!" is a game where players need to guess a certain video game, movie, song, etc. in every round.

## Rules
To get closer to the answer, a player can buy up to 2 hints with their credit.
The price of a hint is higher the more helpful it is.
If a player guessed correct the players balance increases by 15.
The player with the highest credit by the end of the game wins.

## Server
The server-side of the application is realized with "Node.js". 
To guarantee a fast communication/updates between the players and the server, "Socket.io" is used.
After every action, the state of the game is updated and distributed to all players.

## Client
For the client-side of the application React is used. 
The socket.io client is used for the communication with the server and toastify-react to show the player certain information.
