function updateTimeCard(timezone, time, date) {
    const myDate = Date();
    const timeFormatted = dayjs(myDate).format('HH:mm:ss');
    const dateFormatted = dayjs(myDate).format('dddd, MMMM, D, YYYY');

    timezone.textContent = dayjs.tz.guess();
    time.textContent = timeFormatted;
    date.textContent = dateFormatted;
}

function initApp() {
    const timecardTimezone = document.querySelector('.timecard__timezone');
    const timecardTime = document.querySelector('.timecard__time');
    const timecardDate = document.querySelector('.timecard__date');

    // Initial set
    updateTimeCard(timecardTimezone, timecardTime, timecardDate)
    // update interval
    setInterval(updateTimeCard, 1000, timecardTimezone, timecardTime, timecardDate);
}

/**
 * Listener to wait for complete state before initializing js.
 * @param {}
 * @return {}
 */
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});