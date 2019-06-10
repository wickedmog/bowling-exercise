function ScoreTable() {
    this.frames = [];
    this.maxFrames = 10; //Frame Limit per game.
}

ScoreTable.prototype.addFrame = function(frame) {
    this.frames.push(frame);
};

// Function that will handle display of the score per frame. 
ScoreTable.prototype.scoreDisplay = function(frameNumber) {
    var display = null;
        rollInFrame1 = this.frames[frameNumber].throws[0];
        rollInFrame2 = this.frames[frameNumber].throws[1];
        rollInFrame3 = this.frames[frameNumber].throws[2];
        rollInFrameTotal = this.frames[frameNumber].total();
        nextFrame = this.frames[frameNumber + 1];  // Advance to next frame.

    if(nextFrame) {
        var nextFrameThrow1 = this.frames[frameNumber + 1].throws[0];
    }

    if(nextFrame) {
        var nextFrameThrow2 = this.frames[frameNumber + 1].throws[1];
    }

    var nextComingFrame = this.frames[frameNumber + 2];

    if(nextComingFrame) {
        var nextComingFrameThrow1 = this.frames[frameNumber + 2].throws[0];
    }

    if(frameNumber+1 === this.maxFrames && rollInFrame3) {
        display = rollInFrameTotal;
    } else if(rollInFrame1 === frame.pins && nextFrame) {
        if(nextFrameThrow2) {
            display = (rollInFrameTotal + nextFrameThrow1 + nextFrameThrow2);
        } else if(nextComingFrame) {
            display = (rollInFrameTotal + nextFrameThrow1 + nextComingFrameThrow1);
        }
    } else if((rollInFrame1 + rollInFrame2) === frame.pins && nextFrame) {
        display = (rollInFrameTotal + nextFrameThrow1);
    } else if ((rollInFrame1 + rollInFrame2) < frame.pins) { // Validate total of throws is less than 10.
        display = rollInFrameTotal;
    }
    return display;
};

ScoreTable.prototype.completeCurrentFrame = function() {
    var currentFrame = (this.frames.length - 1);
    var rollInFrame1 = this.frames[currentFrame].throws[0];
    var rollInFrame2 = this.frames[currentFrame].throws[1];
    var rollInFrame3 = this.frames[currentFrame].throws[2];
  
    if(this.frames.length === this.maxFrames) {
      return (rollInFrame3 != undefined || (rollInFrame1 + rollInFrame2) < frame.pins);
    } else {
      return (rollInFrame2 != undefined || rollInFrame1 === frame.pins);
    };
  };

  ScoreTable.prototype.endGame = function() {
    if(this.frames.length === this.maxFrames) {
      var finalFrameThrow1 = this.frames[this.maxFrames-1].throws[0];
      var finalFrameThrow2 = this.frames[this.maxFrames-1].throws[1];
      var finalFrameThrow3 = this.frames[this.maxFrames-1].throws[2];
  
      return (finalFrameThrow3 != undefined || (finalFrameThrow1 + finalFrameThrow2) < frame.pins);
    }
  };