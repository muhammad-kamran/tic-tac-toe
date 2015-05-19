$(document).ready(function() {

	// get the 2d drawing context
	var ctx = (function() {
		var c = document.getElementById("game");
		return c.getContext("2d");
	})();
	
	var setupBoard = function () {
		
		ctx.fillStyle = 'yellow';
		
		// row 1
		ctx.fillRect(5, 5, 100, 100);
		ctx.fillRect(110, 5, 100, 100);
		ctx.fillRect(215, 5, 100, 100);
		
		// row 2
		ctx.fillRect(5, 110, 100, 100);
		ctx.fillRect(110, 110, 100, 100);
		ctx.fillRect(215, 110, 100, 100);
		
		// row 3
		ctx.fillRect(5, 215, 100, 100);
		ctx.fillRect(110, 215, 100, 100);
		ctx.fillRect(215, 215, 100, 100);

	}

	setupBoard();
	var items = [[null,null,null],[null,null,null],[null,null,null]];
	var currentPlayer = 'X';
	var turnCount = 0;
	
	$("#game").click(function(e) {
		makeMove(e.pageX, e.pageY);
	});
		
	var makeMove = function(x, y) {
	
		var drawX = null;
		var drawY = null;
		
		var indexRow = null;
		var indexCol = null;
		
		if (x >= 5 && x <= 105 && y >= 5 && y <= 105) { // 0,0
			drawX = 30;
			drawY = 70;
			indexRow = 0;
			indexCol = 0;
		} else if (x >= 110 && x <= 210 && y >= 5 && y <= 105) { // 0,1
			drawX = 130;
			drawY = 70;
			indexRow = 0;
			indexCol = 1;
		} else if (x >= 215 && x <= 315 && y >= 5 && y <= 105) { // 0,2
			drawX = 240;
			drawY = 70;
			indexRow = 0;
			indexCol = 2;
		} else if (x >= 5 && x <= 105 && y >= 110 && y <= 210) { // 1,0
			drawX = 30;
			drawY = 170;
			indexRow = 1;
			indexCol = 0;
		} else if (x >= 110 && x <= 210 && y >= 110 && y <= 210) { // 1,1
			drawX = 130;
			drawY = 170;
			indexRow = 1;
			indexCol = 1;
		} else if (x >= 215 && x <= 315 && y >= 110 && y <= 210) { // 1,2
			drawX = 240;
			drawY = 170;
			indexRow = 1;
			indexCol = 2;
		} else if (x > 5 && x < 115 && y > 215 && y < 315) { // 2,0
			drawX = 30;
			drawY = 270;
			indexRow = 2;
			indexCol = 0;
		} else if (x > 110 && x < 210 && y > 215 && y < 315) { // 2,1
			drawX = 130;
			drawY = 270;
			indexRow = 2;
			indexCol = 1;
		} else if (x > 215 && x < 315 && y > 215 && y < 315) { // 2,2
			drawX = 240;
			drawY = 270;
			indexRow = 2;
			indexCol = 2;
		}
		
		// check if the selected spot is already used
		if (items[indexRow][indexCol] !== null) {
			alert('This spot is alrady used!');
			return;
		}
		
		items[indexRow][indexCol] = currentPlayer;
		
		if (drawX != null && drawY != null) {
			ctx.fillStyle = "orange";
			ctx.font = "bold 48px FingerPaint";
			ctx.fillText(currentPlayer, drawX, drawY);
			currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
			turnCount++;
			
			checkWhoWon();
		}
	}
	
	var checkWhoWon = function() {
	
		var winner = null;		
		var winnerFound = false;

		// check for horizontal
		for (var i = 0; i < 3; i++) {
			if (items[i][0] == items[i][1] && items[i][1] == items[i][2]) {
				winner = items[i][0];
				winnerFound = true;
				break;
			}
		}

		// check for vertical
		if (!winnerFound) {
			for (var i = 0; i < 3; i++) {
				if (items[0][i] == items[1][i] && items[1][i] == items[2][i]) {
					winner = items[0][i];
					winnerFound = true;
					break;
				}
			}
		}

		// check for diognals
		if (!winnerFound && (items[0][0] == items[1][1] && items[1][1] == items[2][2]) || (items[0][2] == items[1][1] && items[1][1] == items[2][0])) {
			winner = items[1][1];
			winnerFound = true;
		}

		// checking the result:
		if (winner != null) {
			alert(winner + " Won!");
		} else if (winner == null && turnCount == 9) {
			alert("It's a Tie!");
		}
	}
	
});
