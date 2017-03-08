var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var path = require('path');
var uuidV4 = require('uuid/v4');

var testword = [
  {
    "id"    : 0,
    "word"  : "javascript"
  },
  {
    "id"    : 1,
    "word"  : "nodejs"
  },
  {
    "id"    : 2,
    "word"  : "expressjs"
  },
  {
    "id"    : 3,
    "word"  : "angularjs"
  }
];

module.exports = function (app, config) {

  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('charset', 'utf-8');

    // Pass to next layer of middleware
    next();
  });

  // REST routes
  app.get('/api/uuid', function(req,res) {
		res.send(uuidV4());
  });

  app.post('/api/checkword', function(req,res) {
    console.log("this is checkword " + JSON.stringify(req.body));
    checkword(res, req.body);
  });

  app.get('/api/checkword', function(req,res) {
    res.send(wordcheck(res));
    // res.send("works works works");
  });

}; // modexports end -->

function checkword(res, letter) {
  if(letter) {
    wordcheck(res, letter);
  }  
}

function wordcheck(res, gameVals) {
  if(gameVals) {
    var wordInfo = getJs(gameVals.id);
    console.log("this is the gamevals " + JSON.stringify(gameVals));
    var word = wordInfo.word;
    var results = updateString(gameVals);

    var newLetters = remove(gameVals.letters, gameVals.letter);
    if(results == word) {
      var objGameUpdate = {
        "strWord" : "You Won",
        // "word"    : gameVals.word,
        "id"      : gameVals.id,
        "tries"   : gameVals.tries,
        "letters" : ""
      };
    } else if(gameVals.tries == 1) {
      var objGameUpdate = {
        "strWord" : "You Lose",
        // "word"    : gameVals.word,
        "id"      : gameVals.id,
        "tries"   : 0,
        "letters" : ""
      };
    } else if(word.indexOf(gameVals.letter) != -1) {
      var objGameUpdate = {
        "strWord" : results,
        // "word"    : gameVals.word,
        "id"      : gameVals.id,
        "tries"   : gameVals.tries,
        "letters" : newLetters
      };
    } else {
      var num = parseInt(gameVals.tries);

      var objGameUpdate = {
        "strWord" : gameVals.str,
        // "word"    : gameVals.word,
        "id"      : gameVals.id,
        "tries"   : num -= 1,
        "letters" : newLetters
      };
    }
    
    res.json(objGameUpdate);
  } else {
    // if gameVals has nothing, retrun random obj fr array 
    var objGetGameObj = testword[(Math.floor(Math.random()* testword.length) + 0)];
    var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    var objSendGameObj = {
      "strWord" : strAsterisk(objGetGameObj.word.length),
      // "word"    : objGetGameObj.word,
      "id"      : objGetGameObj.id,
      "tries"   : 8,
      "letters" : letters
    };

    res.json(objSendGameObj);
  }
}

function remove(arr, item) {
  for(var i = arr.length; i--;) {
    if(arr[i] === item) {
        arr.splice(i, 1);
    }
  }
  return arr;
}

function updateString(gameVals, wordInfo) {
  var wordInfo = getJs(gameVals.id);
    console.log("updateStr wordinfo " + JSON.stringify(wordInfo));
  var word = wordInfo.word;
    console.log("updateStr word " + word);
  var arrWord = Array.from(wordInfo.word);
    console.log("updateStr arrword " + arrWord);
  var results = gameVals.str;
    console.log("updatestr results " + results);
  results = results.split("");
    console.log("updatestr results split " + results);

  arrWord.forEach(function(item, i) {
    if(item == gameVals.letter) {
      console.log("match " + i);
      results[i] = gameVals.letter;
    }
  });
    console.log("updatestr final results " + results.toString().split(",").join(""));
  return results.toString().split(",").join("");
}

function strAsterisk(numChars) {
  var string = "";
  for(i=0;i<=numChars-1;i++) {
    string += "*";
  }
  console.log("this is strAsterisk " + string);
  return string;
}


// returns JSON object from testword array that matches passed in 'id'
function getJs(id) {
  for(var i = 0; i < testword.length; i++)
  {
    if(testword[i].id == id)
    {
      return testword[i];
        // console.log(JSON.stringify(testword[i]));
    }
  }
}
