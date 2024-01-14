const notifier = require("node-notifier");
const moment = require("moment");

const argvTime = process.argv.slice(2);

const working = argvTime[0];
const breaking = argvTime[1];

let workingStatus = false;
let timer = 0;

function displayTimer(timer) {
    const getMoment = moment.duration(timer);
    const hours = getMoment.hours().toString().padStart(2, "0");
    const minutes = getMoment.minutes().toString().padStart(2, "0");
    const seconds = getMoment.seconds().toString().padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds}`;
}

function process(duration) {
    workingStatus = !workingStatus;
    timer = duration * 60;

    const timeStop = setInterval(() => {
        timer--;

        const display = displayTimer(timer);
        console.log(`${workingStatus ? "Work" : "Break"} ${display}`)

        if (timer === 0) {
            clearInterval(timeStop);
            notifier.notify({
                title: workingStatus ? "Working Time!" : "Breaking Time",
                message: workingStatus ? "Good Break!" : "Good Work!",
            })
            process(workingStatus ? working : breaking);
        }
    }, 1000)
}

process(working);
