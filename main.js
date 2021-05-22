// part 1

function duplicateBirthdayProb (N, runs) {
    let birthdayPairs = 0;
    for (let i = 0; i < runs ; i++){
        // populate array with 23 random numbers between 1 and 366, for each possible date
        const birthdaysArray = Array.from({length: N}, () => Math.floor(Math.random() * (367 - 1) + 1)); // 366 possible dates (including leap years)
        if(checkForDuplicate(birthdaysArray)) {
            birthdayPairs++;
        }
    }
    const probOfBirthdayPair = birthdayPairs/runs;
    console.log('Given ' + N + ' people, the chance of at least two people having the same birthday is: ' + probOfBirthdayPair * 100 + '%');
}

function checkForDuplicate (array) {
    // Set can only contain unique values, so if the size is different, it means the input array contains duplicate values
    return new Set(array).size !== array.length
}

function decimalCount (num) {
    const numStr = String(num);
    if (numStr.includes('.')) {
        return numStr.split('.')[1].length;
    }
    return 0;
}

// part 2

function duplicateBirthdayProb2 (N, accuracy) {
    let probVariation = null;
    let probOfBirthdayPair = 0;
    let birthdayPair = 0;
    let run = 0;
    let countAfterAccuracyFound = 0;
    // starting the loop of event as long as the desired accuracy is not achieved
    // I decided to assume that accuracy is met when the probability variations is stable for 10 runs in a row
    while(accuracy !== probVariation || countAfterAccuracyFound !== 10) {
        run++;
        const prevProb = probOfBirthdayPair;
        const birthdaysArray = Array.from({length: N}, () => Math.floor(Math.random() * (367 - 1) + 1)); // 366 possible dates (including leap years)
        if(checkForDuplicate(birthdaysArray)){
            birthdayPair++
        }
        probOfBirthdayPair = birthdayPair/run;

        // variation: difference between two probability in absolute number.
        probVariation = parseFloat(Math.abs(probOfBirthdayPair - prevProb).toFixed(decimalCount(accuracy))); // round the number to have the same decimal places as accuracy
        if(probVariation === accuracy){
            countAfterAccuracyFound++;
        } else {
            countAfterAccuracyFound = 0; // if variation is not stable, counter is reinitialized
        }
    }
    console.log('Given ' + N + ' people, the chance of at least two people having the same birthday is: ' + probOfBirthdayPair * 100 + '% with an accuracy of ' + accuracy);
    console.log('number of runs: '+run);


}

duplicateBirthdayProb(23, 500);

duplicateBirthdayProb2(23, 0.001);
