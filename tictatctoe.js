// todo: GUI

'use strict';

// Initial data
var length = 3;

function findWinner(length, boardString) {

  var boardArray1d = boardString.match(/.{1,3}/g);
  var boardArray2d = new Array(length);
  var hBoardLine = new Array(length);

  var fillEnum = {x: 'x', o: 'o', space: ' '};
  var winnerEnum = {'x': 'WinnerX', 'o': 'WinnerO', 'c': 'CatsGame'};
  var hasSpace = false;

  /*

   Example:

   [
   ["x","x","o"], // line 0
   ["o","o","x"], // line 1
   ["o"," ","o"]  // line 2
   ]

   */
  function populateArray(boardArray1d) {
    for (var hLineNum = 0; hLineNum < boardArray1d.length; hLineNum++) {
      var hLineString = boardArray1d[hLineNum];
      for (var i = 0; i < hLineString.length; i++) {
        hBoardLine[i] = hLineString[i];
      }

      boardArray2d[hLineNum] = hBoardLine.splice(0); // copy
    }
    return boardArray2d;
  }

  function hSearch(board) {
    top:
      for (var i = 0; i < length; i++) {
        var hPrev = board[i][0];           // first: [0, 0] then: [1, 0], [2, 0], etc
        var hLineLength = 1;

        // Run through the line values vertically
        for (var j = 1; j < length; j++) {

          var hNext = board[i] [j];        // then: [0, 1], [0, 2], [0, 3], etc

          if ((fillEnum.space === hPrev) || (fillEnum.space === hNext)) {
            hasSpace = true;
          }

          if (!(hPrev === hNext)) {
            continue top;
          }

          if (++hLineLength === length) {
            return winnerEnum[hPrev];
          }

        }
      }
  }

  function dSearch(board) {

    var dLineLength = 1;
    var dPrev = board[0][0];          // first: [0, 0] then: [1, 1], [2, 2], etc

    for (var i = 1; i < length; i++) {

      // Run through the line values diagonally
      var dNext = board[i][i];        // then: [1, 0], [2, 0], [3, 0], etc

      if ((fillEnum.space === dPrev) || (fillEnum.space === dNext)) {
        hasSpace = true;
      }

      if (!(dPrev === dNext)) {
        return;
      }

      if (++dLineLength === length) {
        return winnerEnum[dPrev];
      }

    }
  }

  function getWinner(board) {

    /*
    Example: [0, 1, 2] => [2, 1, 0]
     */
    var reverseBoard = function(hLine) {
      return hLine.reverse();
    };

    /*
    [0], [1], [2],         [0], [3], [6],
    [3], [4], [5],    =>   [1], [4], [7],
    [6], [7], [6]          [2], [5], [8]
     */
    var rotateBoard = function(board) {
      var rotatedBoard = [];
      for (var i = 0; i < board.length; i++) {
        var arrParts =  board[i];
        for (var j = 0; j < arrParts.length; j++) {
          rotatedBoard[i] = board[j];
        }
      }
      return rotatedBoard;
    };

    var hWinner = hSearch(board);
    var vWinner = hSearch(rotateBoard(board));
    var dWinner = dSearch(board) || dSearch(board.map(reverseBoard));

    // Define result
    return hWinner
      || vWinner
      || dWinner
      || (hasSpace ? winnerEnum['c'] : null);
  }

  var board = populateArray(boardArray1d);
  var winner = getWinner(board);

  console.log('winner: ' + winner);
  return winner;

};

// Tests

var hInputO = 'xxoooxooo'; // WinnerO (h)
var hInputX = 'xxxooxoxo'; // WinnerX (h)

var vInputO = 'xooooxxoo'; // WinnerO (v)
var vInputX = 'oxxxxooxx'; // WinnerX (v)

var dInputO = '  o o o  '; // WinnerX (d)
var dInputX = 'oxxxx  xx'; // WinnerO (d)

var inputNull = 'xxoooxxxo'; // null
var inputDraw = '         '; // CatsGame

console.log(findWinner(length, hInputO) === 'WinnerO');
console.log(findWinner(length, hInputX) === 'WinnerX');

console.log(findWinner(length, vInputO) === 'WinnerO');
console.log(findWinner(length, vInputX) === 'WinnerX');

console.log(findWinner(length, dInputO) === 'WinnerO');
console.log(findWinner(length, dInputX) === 'WinnerX');

console.log(findWinner(length, inputNull) === null);
console.log(findWinner(length, inputDraw) === 'CatsGame');
