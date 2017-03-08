#################################################
############## HACKER HANGMAN ###################
#################################################
Installation
-------------------------------------------------
Requirements:
    - NodeJS v6
Clone repo, go into resulting directory "hangman" and execute:
    - npm install
I used 'nodemon' to run the app, but 'node', 'npm', or anything similar should work. 
To run the application, from within the 'hangman' directory, execute the following command:
    - node app.js
This will start the application. Please note that for development, Ive been running the application on port 3000. If you need to change this for some reason, please reference the 'app.js' file found in the root directory of the project '~/hangman/app.js'. Toward the bottom of the file there is a call titled 'app.listen', with a port (3000 in this case) as its first argument. If you wish to change this setting, this is where you'd do it. 

To play the game, open a web browser and point it to the following URL:
    - http://localhost:3000
    - NOTES: this app has only been tested in Google Chrome browser version 56 on Mac

This will initialize the game. 

This is a basic hangman game. The following are available as words in the current state of the project:
    - javascript
    - nodejs
    - angularjs
    - expressjs

In the current state of the application, words are stored as JSON objects inside of a JSON array called 'testword' in the '~/hangman/config/routes.js' file. Each object has a corresponding 'id' value. 
There is one route for the API, http://localhost:3000/api/checkword. On initialization, the front end makes a request to the route. The route checks to see if the request contains game data, if the request does not contain game data, an object from the 'testwords' array is randomly selected, modified, and then returned to the front end for game play. 
The front end receives a string of asterisks representing the number of characters in the word to be guessed, number of remaining tries, the 'letters' that can still be guessed, and an 'id' value. When the player clicks on one of the buttons, the letter corresponding to that button is sent to the api along with the associated 'id', as well as the string of asterisks. The API receives the request, looks up the actual word on the backend by the id, compares the guessed letter with the actual word, updates the string if the letter is in word or the number of remaining guesses if it is not, and then returns the appropriate info back to the front end via the define API route for further play. 
In this app, all logic is handled on the backend and communicated over the API. The front end only responds to data updated on its bindings and the button clicks of the guessed letters. 