//Assign the variables for page elements
var pageClue = document.getElementById("user-clue");
var pageGuess = document.getElementById("user-guess");
var pageWord = document.getElementById("user-word");
var pageWins = document.getElementById("user-wins");
var pageLosses = document.getElementById("user-losses");
var pageHang = document.getElementById("user-hang");

//initialize the variables
var wins = 0;
var losses = 0;

var badGuess = "";
var goodGuess = "";
var secretWord = "";
var printWord = "";
var clue = "";
var errors = 0;
var hangStr = "rm -rf";

//Create a hash of words/clues
var dictionary = {
    "rm -rf" : "A permanent solution to a temporary problem",
    "global thermonuclear war" : "The only way to win is not to play the game.",
    "function" : "A way to avoid repeating code", 
    "method" : "a fancy word for function",
    "argument" : "What you pass a function",
    "terminal" : "A place to have a direct conversation with your computer.", 
    "balloons" : "99 red ones",
     

    randomWord : function () {
        var temp_key, keys = [];
        for(temp_key in this) {
             if(this.hasOwnProperty(temp_key) && typeof this[temp_key] === "string") {
                console.log(temp_key);
             keys.push(temp_key);
            }
        }
        return keys[Math.floor(Math.random() * keys.length)];
    }
};
   
//Select a random key from dictionary
secretWord = dictionary.randomWord();
//Assign the clue from selected key
clue = dictionary[secretWord]; 
//Initialize the blank word displayed on page that updates as correct guesses are made
for (var i=0; i <secretWord.length; i++) {
    printWord += "_"; 
}

//write the blank word and the clue to the page
pageClue.textContent = clue;
pageWord.textContent = printWord;

document.onkeyup = function(event) {
    var letter = String.fromCharCode(event.keyCode).toLowerCase();
    // Confirm user pressed a letter of the alphabet
    console.log("letter is " + letter);
    
    //Determine if guess is a letter in the word.  Need to deal with duplicate letters
    var guessIndex = secretWord.indexOf(letter);
    if (guessIndex > -1) {
        while (guessIndex > -1) {
            printWord = setCharAt(printWord, guessIndex, letter);
            guessIndex = findNextInstance(secretWord, guessIndex);
        }
    } else {
        badGuess = badGuess + " " + letter;

        errors++;
        if (errors > 6) { 
            alert("Recursive Deletion in Progress.  Please Try Again."); 
            losses++;
            newGame();
        }
    }
    
    
    if (secretWord === printWord) {
        wins++;
        pageWord.textContent = secretWord;
        alert("Winner!");
        newGame();
        
    }        
    
    drawScreen();
    
};

function drawScreen(){
    pageGuess.textContent = badGuess;
    pageWord.textContent = printWord;
    pageWins.textContent = wins;
    pageLosses.textContent = losses; 
    pageHang.textContent = hangStr.substr(0,errors);
    pageClue.textContent = clue;
}

function setCharAt(str,index,chr) {
    console.log("length: " + str.length + "Index: " + index + " Character: " + chr);
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function checkDuplicates (str) { 
    var dupCount = [];
    for (var i = 0; i < str.length; i++) {
        dupCount[i] = 0;
        for (var j = i; j < str. length; j++) {
            if (str[i] === str[j] && i != j) {
                console.log("First letter: " + str[i] + " second: " + str[j] + "index = " + i );
                dupCount[i]++;
            }
        }
    }
    return dupCount; 
}

function newGame () {
 
    badGuess = "";
    printWord = "";
    errors = 0;

    //Select a random key from dictionary
    secretWord = dictionary.randomWord();
    //Assign the clue from selected key
    clue = dictionary[secretWord]; 
    //Initialize the blank word displayed on page that updates as correct guesses are made
    for (var i=0; i <secretWord.length; i++) {
        printWord += "_"; 
    }

    //write the blank word and the clue to the page
    drawScreen();

    return;

}

function findNextInstance (str, index) {
    var nextInstance = -1
    for (var i = index+1; i<str.length; i++) {
        if (str[index] === str[i]) {
            nextInstance = i; 
        }
    } 
    return nextInstance;  
}
  
