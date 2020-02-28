/*
[IMPORTANT]
You are free to create any number of helper function you want.
We know the problem could be seached online, and we are aware of those solutions.
So please sight sources if you took help from any online resource.
*/



//IDs for all the table elements. You get the cell element just by using document.getElementById("A1")
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

/*
An integer array of length 9.
Usaged: This is to store the state to the tictactoe board.
When a move is made
(Example player 1 (who is X) move at Cell 'A1' --- The board_state[0] will be made 1 )
Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2] will be made 0 )
We store the move of player 1 as '1' and player 2 as '0'. So after the above two moves the state should look like
[1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false

/*
A variable to keep track of each players turn. Since the game always starts with player 1 - The default value is set to '1'
1 means player_1
0 means player_0
*/
var turn = 1

/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}

/*
@Return int This return the turn variable. Please note that
turn = 1 is for player_1 and
turn = 0 is for player_2
@Param - No param
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	this.turn = !this.turn
}

/*
@Return boolean
@Param
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started(){
	return this.started
}


/*
TODO - Rule 1
This is the first method you'll implement. This method is called when the Begin Play button is clicked.
The method should do all the validations as stated in rule 1.
1. Verify if the player names are empty or not. Raise an alert if they are empty.
2. If the field are empty don't start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
3. If all verification is successful, disable the name fields and update the player moves as shown in the image.
4. If all verification is successful, update the turn information on the page. (See the source code and image). And set the started flag to true.(this will help you track at any instant if the game is in start state or not.)
5. Once game has started, Handle multiple clicks on begin play.
*/

function rule1(){
    if (started == true) {
        alert("Game already started, press reset to start a new game");
        return;
    }
    var x = "(X)"
    var o = "(O)"
    var p1 = document.getElementById("player1_id");
    var p2 = document.getElementById("player2_id");
    if (p1.value.length == 0 | p2.value.length == 0) {
        alert("Two player game, both fields are mandatory");
        return false;
    }
    else {
        started = true;
        p1.value += " (X)" //Assign X to player_1
        p2.value += " (O)" //Assign O to player_2
        p1.disabled = true;
        p2.disabled = true
        if (turn == 1) {
            document.getElementById("turn_info").innerHTML = "Turn for: "
            document.getElementById("turn_info").innerHTML += x.bold();
        }
        else { // Player 2's turn
            document.getElementById("turn_info").innerHTML = "Turn for: "
            document.getElementById("turn_info").innerHTML += o.bold();
        }

    }


    return true;
}

function begin_play(){
    rule1();
}

/*
TODO - Rule 2
This is the second method you'll implement. This method is called when the Reset Play button is clicked.
The method should do all the things as stated in rule 2.
1. The reset play button should reset the whole game.(At any time when reset is clicked - All the three text boxes should be cleared and Turn should be set to the default message.)
2. The text boxes for entering name should be enablled back.
3. The Tic Tac Toe Grid should be set to its default entries.
4. Clicking reset play again and again shall have the same effect.(or no effect when clicked multiple times)
Remember to set the strated flag as false

*/

function rule2() {
    var p1 = document.getElementById("player1_id");
    var p2 = document.getElementById("player2_id");
    started = false;
    p1.value = null;
    p2.value = null;
    p1.disabled = false;
    p2.disabled = false;
    document.getElementById("turn_info").innerHTML = "Game has not begun.";
    var x = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"] // Because I change these values during the game
    for (var i = 0; i < 9; i++) {
        document.getElementById(x[i]).innerHTML = x[i];
    }
}



function reset_play(){
    rule2();
}

/*
TODO - Rule 3
This is the last method you'll implement. This method is called everytime a move has been player( Play button was clicked).
The method should do all the things as stated in rule 2.
1. The moves should be validated can only be these ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
2. Invalid moves should be reported by an alert message.(You are encorraged to use Modal which you learned in HW1 - Usage is not mandatory.)
3. If the move is a valid move, the grid should be updated with the correct move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not zero!)) - The turn information should also be updated
	Hint: Use the turn variable to figure out who is currently playing. Use to toggle method to change moves.
4. A move should always be a valid move. (Example: If say a move was made in already filled cell, it should be invalidated with an alert.)
5. If the game has not started, clicking on <b>Play</b> should give an alert "The game has not started."<br/>
6. After any move, the state of the table should be validated.(see the document attached in the homework)
   If the there is winner - Show it in an alert message - (Ex - Winner is X or O) - Displaying name is not important. <br/>
7. The game should reset itself once a winner is determined.<br/>
8. After all the moves have exhausted, you're not required to display any message. (It should be obvious to Reset play.)<br/>

*/

function rule3() {
    if (started == false) {
        alert("game not started yet");
        return;
    }

    var a = document.getElementById("move_text_id");
    var check = false;
    var index = -1;

    for (var i = 0; i < table_ids.length; i++) {
        if (a.value == table_ids[i]) {
            check = true;
            index = i;
        }
    }
    if (check == false || index == -1) {
        alert("not a valid move");
        return;
    }
    else {
        if (turn == 1) {
            if (board_state[index] != -1) {
                alert("this spot is already taken");
                return;
            }
            document.getElementById(table_ids[index]).innerHTML = 'X';
            board_state[index] = 1;
            table_ids[index] = 'X';
            toggle_move(); // Change turns
        }
        else {
            if (board_state[index] != -1) {
                alert("this spot is already taken");
                return;
            }
            document.getElementById(table_ids[index]).innerHTML = 'O';
            board_state[index] = 1;
            table_ids[index] = 'O';
            toggle_move(); // Change turns
        }
    }


    // UPDATE WHOSE TURN IT IS
    var x = "(X)";
    var o = "(O)";
    if (turn == 1) {
        document.getElementById("turn_info").innerHTML = "Turn for: "
        document.getElementById("turn_info").innerHTML += x.bold();
    }
    else { // Player 2's turn
        document.getElementById("turn_info").innerHTML = "Turn for: "
        document.getElementById("turn_info").innerHTML += o.bold();
    }

}

function checkIfWon() { // THIS IS THE REALLY LONG AND LAZY WAY OF CHECKING WHO WON!!!!
    // All conditions for X winning
    if (table_ids[0] == 'X' && table_ids[1] == 'X' && table_ids[2] == 'X') {
        alert("Winner: X");
        reset_play();
    }
    if (table_ids[3] == 'X' && table_ids[4] == 'X' && table_ids[5] == 'X') {
        alert("Winner: X");
        reset_play();
    }
    if (table_ids[6] == 'X' && table_ids[7] == 'X' && table_ids[8] == 'X') {
        alert("Winner: X");
        reset_play();
    }
    if (table_ids[0] == 'X' && table_ids[3] == 'X' && table_ids[6] == 'X') {
        alert("Winner: X");
        reset_play();
    }
    if (table_ids[1] == 'X' && table_ids[4] == 'X' && table_ids[7] == 'X') {
        alert("Winner: X");
        reset_play();
    }
    if (table_ids[2] == 'X' && table_ids[5] == 'X' && table_ids[8] == 'X') {
        alert("Winner: X");
        reset_play();
    }
    if (table_ids[0] == 'X' && table_ids[4] == 'X' && table_ids[8] == 'X') {
        alert("Winner: X");
        reset_play();
    }
    if (table_ids[2] == 'X' && table_ids[4] == 'X' && table_ids[6] == 'X') {
        alert("Winner: X");
        reset_play();
    }

    // Conditions for O winning
    if (table_ids[0] == 'O' && table_ids[1] == 'O' && table_ids[2] == 'O') {
        alert("Winner: O");
        reset_play();
    }
    if (table_ids[3] == 'O' && table_ids[4] == 'O' && table_ids[5] == 'O') {
        alert("Winner: O");
        reset_play();
    }
    if (table_ids[6] == 'O' && table_ids[7] == 'O' && table_ids[8] == 'O') {
        alert("Winner: O");
        reset_play();
    }
    if (table_ids[0] == 'O' && table_ids[3] == 'O' && table_ids[6] == 'O') {
        alert("Winner: O");
        reset_play();
    }
    if (table_ids[1] == 'O' && table_ids[4] == 'O' && table_ids[7] == 'O') {
        alert("Winner: O");
        reset_play();
    }
    if (table_ids[2] == 'O' && table_ids[5] == 'O' && table_ids[8] == 'O') {
        alert("Winner: O");
        reset_play();
    }
    if (table_ids[0] == 'O' && table_ids[4] == 'O' && table_ids[8] == 'O') {
        alert("Winner: O");
        reset_play();
    }
    if (table_ids[2] == 'O' && table_ids[4] == 'O' && table_ids[6] == 'O') {
        alert("Winner: O");
        reset_play();
    }
}


function play() {
    rule3();
    checkIfWon();
}

/*
Do not change this method.
*/
function moveEnter(event) {
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}
