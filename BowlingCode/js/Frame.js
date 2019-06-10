//File that handles adding scores per frame.

function Frame () {
    this.pins = 10; //Total Number of pins 
    this.throws = []; 
};

//Function to push scores one by one.
Frame.prototype.logThrowResult = function(knockedPins) {
    this.throws.push(knockedPins);
};

// Function to calculate total score of each frame.
Frame.prototype.total = function() {
    var runningTotal = 0;
    for(var i = 0; i < this.throws.length; i++) {
        runningTotal += this.throws[i];
    }

    return runningTotal;
};