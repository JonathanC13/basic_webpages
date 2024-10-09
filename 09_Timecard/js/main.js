function initApp() {
    const myDate = Date();
    const timeFormatted = dayjs(myDate).format('HH:mm:ss');
    const dateFormatted = dayjs(myDate).format('dddd, D MMMM, YYYY');

    const timecardTimezone = document.querySelector('.timecard__timezone');
    timecardTimezone.textContent = dayjs.tz.guess();

    const timecardTime = document.querySelector('.timecard__time');
    timecardTime.textContent = timeFormatted;

    const timecardDate = document.querySelector('.timecard__date');
    timecardDate.textContent = dateFormatted;
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