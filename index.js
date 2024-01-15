const notifier = require("node-notifier");
const moment = require("moment");

const argvTime = process.argv.slice(2);
const working = argvTime[0];
const breaking = argvTime[1];

let timer = 0;
let workingStatus = false;

function displayTimer(time) {
    const getMoment = moment.duration(time, "seconds");
    const hours = getMoment.hours().toString().padStart(2, "0");
    const minutes = getMoment.minutes().toString().padStart(2, "0");
    const seconds = getMoment.seconds().toString().padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds}`;
}

function startTimer(time) {
    timer = time * 60;
    workingStatus = !workingStatus;
  
    const interval = setInterval(() => {
        timer--;

        const display = displayTimer(timer);

        console.log(`${workingStatus ? "Work" : "Break"} : ${display}`);

        if (timer === 0) {
            clearInterval(interval);
            notifier.notify({
                title: workingStatus ? "Good Work!" : "Good Break!",
                message: workingStatus ? "Break Time!" : "Work Time!",
            })
            startTimer(workingStatus ? working : breaking);
        }
    }, 1000);


}

startTimer(working);