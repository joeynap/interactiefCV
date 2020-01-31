function swapTiles(cell1,cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
  }
  
function shuffle(puzzle) {
  do {
    for (var row=1;row<=5;row++) { //For each row of the 5x5 grid
      for (var column=1;column<=5;column++) {
       var row2=Math.floor(Math.random()*5 + 1);
       var column2=Math.floor(Math.random()*5 + 1);
        
       swapTiles("cell"+row+column+puzzle,"cell"+row2+column2+puzzle); //Swap both cells
     } 
   } 
  } while (isSolvable(getTileOrder(puzzle)));
}
  
function clickTile(row,column,puzzle) {
    var cell = document.getElementById("cell"+row+column+puzzle);
    var tile = cell.className;
    if (tile!="tile25"+puzzle) { 
         //Checking if white tile on the right
         if (column<5) {
           if ( document.getElementById("cell"+row+(column+1)+puzzle).className=="tile25"+puzzle) {
             swapTiles("cell"+row+column+puzzle,"cell"+row+(column+1)+puzzle);
             return;
           }
         }
         //Checking if white tile on the left
         if (column>1) {
           if ( document.getElementById("cell"+row+(column-1)+puzzle).className=="tile25"+puzzle) {
             swapTiles("cell"+row+column+puzzle,"cell"+row+(column-1)+puzzle);
             return;
           }
         }
           //Checking if white tile is above
         if (row>1) {
           if ( document.getElementById("cell"+(row-1)+column+puzzle).className=="tile25"+puzzle) {
             swapTiles("cell"+row+column+puzzle,"cell"+(row-1)+column+puzzle);
             return;
           }
         }
         //Checking if white tile is below
         if (row<5) {
           if ( document.getElementById("cell"+(row+1)+column+puzzle).className=="tile25"+puzzle) {
             swapTiles("cell"+row+column+puzzle,"cell"+(row+1)+column+puzzle);
             return;
           }
         } 
    }
}

function checkPuzzle(puzzle) {
    var tileNum = 1;
    for (var row=1;row<=5;row++) {
       for (var column=1;column<=5;column++) {
            if(document.getElementById("cell"+row+column+puzzle).className=="tile"+tileNum+puzzle) {
                tileNum++;
            } else {return;}
        }
    }
    if (puzzle==1) {
      document.getElementById("credentialsText").style.display = "none";
      document.getElementById("credentialsTable").style.display = "block";
    } else if (puzzle == 2) {
      document.getElementById("experienceText").style.display = "none";
      document.getElementById("experienceInfo").style.display = "block";
    } else if (puzzle == 3) {
      document.getElementById("hobbiesText").style.display = "none";
      document.getElementById("hobbiesInfo").style.display = "block";
    }
}

function solvePuzzle(puzzle) {
    var tileNum = 1;
    for (var row=1;row<=5;row++) {
       for (var column=1;column<=5;column++) {
            document.getElementById("cell"+row+column+puzzle).className = "tile"+tileNum+puzzle
            tileNum++;
        }
    }
}

function getTileOrder(puzzle) {
  var tiles = [];
  for (var row=1;row<=5;row++) {
    for (var column=1;column<=5;column++) {
         var tile = document.getElementById("cell"+row+column+puzzle).className;
         var tileNum = tile.substring(4, (tile.length-1))
         if (tileNum == 25) {
           tiles.push(0);
          } else {tiles.push(tileNum);}
     }
  }
  return tiles;
}

function isSolvable(tiles) {
  //if the amount of inversions is an odd number the puzzle is unsolvable
  var inv_count = 0; 
  for (var i=0;i<24;i++) { 
      for (var j=(i+1);j<25; j++) {
          if (tiles[j] && tiles[i] && tiles[i] > tiles[j]) {inv_count++;}
      }
  }
  return (inv_count % 2 == 0);
}

function showGuide(step) {
  for (var i=1;i<6;i++) {
    if (i==step) {
      document.getElementById("Guide"+i).style.display = "block";
    } else {
      document.getElementById("Guide"+i).style.display = "none";
    }
  }
}