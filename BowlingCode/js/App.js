$(document).ready(function() {
    scoreTable = new ScoreTable;
    buttons(0);
    $('#title').fadeIn(500, function() {
        $('#buttons').fadeIn(500, function() {
        $('#scoreTable').fadeIn(500);
        });
    });
});

// Function that will reset all fields 
//and reload the ScoreTable for a new game. 
function playAgain() {
    $('#endGame').fadeOut(1000, function() {
      $('#scoreTable').fadeOut(1000, function() {
        scoreTable = new ScoreTable;
        $("#scoreTableFrame td").html('');
        $('#buttons').hide( function() {
            buttons(0);
          $('#buttons').fadeIn(500, function () {
            $('#scoreTable').fadeIn(500);
          });
        });
      });
    });
}

function select(knockedPins) {
    if(scoreTable.frames.length === 0 || scoreTable.completeCurrentFrame()) {
        frame = new Frame;
        scoreTable.addFrame(frame);
        updateValues(knockedPins, 1);
    } else {
        updateValues(knockedPins, 2);
    }
    endGame();
}

function updateValues(knockedPins, rollNumber) {
    frame.logThrowResult(knockedPins);
    var currentFrame = (scoreTable.frames.length - 1);
    if(rollNumber === 1) {
        selectThrowContent1(knockedPins, currentFrame);
    }
    else {
        selectThrowContent2(knockedPins, currentFrame);
    }
    updateScoreDisplay(currentFrame);
    updateButtons(knockedPins, currentFrame);
}

function updateButtons(knockedPins, currentFrame) {
    if(scoreTable.completeCurrentFrame() || (scoreTable.frames.length === scoreTable.maxFrames && !(scoreTable.frames[scoreTable.maxFrames-1].throws.length === 1 && scoreTable.frames[scoreTable.maxFrames-1].throws[0] < scoreTable.frames[currentFrame].pins))) {
      buttons(0);
    } else {
      buttons(knockedPins);
    }
  }

// Function that handles action when button is clicked. 
function buttons(knockedPins) {
    var buttonStringValue = '';
    for(var i = 0; i < (11-knockedPins); i++) {
        buttonStringValue += '<button type="button" class="button" onclick="select(' + i + ')">' + i + '</button>';
    }
    $('#buttons').html(buttonStringValue);
}

function strike(knockedPins) {
    return (knockedPins === frame.pins);
}
  
function spare(currentFrame) {
    return (scoreTable.frames[currentFrame].throws[0] + scoreTable.frames[currentFrame].throws[1] === scoreTable.frames[currentFrame].pins);
}


function selectThrowContent1(knockedPins, currentFrame) {
    if(strike(knockedPins) && scoreTable.frames.length < scoreTable.maxFrames) {
        updateRollDislay(1, currentFrame, 'X');
    } else if (strike(knockedPins) && scoreTable.frames.length === scoreTable.maxFrames) {
        updateRollDislay(0, currentFrame, 'X');
    } else {
        updateRollDislay(0, currentFrame, knockedPins);
    }
}

// Function to Change display for a strike or a spare accordingly.
function selectThrowContent2(knockedPins, currentFrame) {
    if(strike(knockedPins)) {
      displayContent = 'X';
    }
    else if(spare(currentFrame) && scoreTable.frames[currentFrame].throws.length < 3) {
      displayContent = '/';
    }
    else {
      displayContent = knockedPins;
    }
  
    if(scoreTable.frames[currentFrame].throws.length < 3) {
      updateRollDislay(1, currentFrame, displayContent);
    } else {
      updateRollDislay(2, currentFrame, displayContent);
    }
}

function updateRollDislay(position, currentFrame, displayContent) {
    $('#scoreTableFrame tr:eq(1) td:eq(' + ((currentFrame*2)+position) + ')').html(displayContent);
}


function updateScoreDisplay(currentFrame) {
    var accumulator = 0;
    for(var i = 0; i < (currentFrame+1); i++) {
      accumulator += scoreTable.scoreDisplay(i)
      if(scoreTable.scoreDisplay(i) != null) {
        $('#scoreTableFrame tr:eq(2) td:eq(' + (i) + ')').html(accumulator);
      }
    }
}

// Function to handle the end of the game after 10 frames are completed. 
function endGame() {
    if(scoreTable.endGame()) {
        $('.button').prop('onclick',null).off('click');
        $('.button').hide();
        $('#endGame').hide().addClass('endgame').html('Game Over!').fadeIn(1000).fadeOut(1000, function () {
            $('#endGame').html('<a id="playAgain" href="#" onclick="playAgain();return false;">Play Again?</a>').fadeIn(1000);
        });
    }
}