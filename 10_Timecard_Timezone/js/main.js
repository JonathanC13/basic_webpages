/*
npm modules:
1. dayjs
    > npm install dayjs --save
2. micromodal
    > npm install micromodal --save
*/

// <script src="./js/main.js" type="module"></script>, ensure type="module" for import to work
import MicroModal from '../node_modules/micromodal/dist/micromodal.es.js';  // es6 module

function updateTimeCard(currTimezone, timezoneElem, timeElem, dateElem) {
    const myDate = Date();
    const dayjsDate = dayjs(myDate).tz(currTimezone);
    const timeFormatted = dayjsDate.format('HH:mm:ss');
    const dateFormatted = dayjsDate.format('dddd, MMMM, D, YYYY');

    timezoneElem.textContent = currTimezone;
    timeElem.textContent = timeFormatted;
    dateElem.textContent = dateFormatted;
}

async function requestTimezoneNames() {
    // const response = await fetch('https://worldtimeapi.org/api/timezone', 
    //     {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }
    // );

    // const jsonResponseData = await response.json();
    // CORS blocked since on localhost

    const jsonResponseData = ["Africa/Abidjan","Africa/Algiers","Africa/Bissau","Africa/Cairo","Africa/Casablanca","Africa/Ceuta","Africa/El_Aaiun","Africa/Johannesburg","Africa/Juba","Africa/Khartoum","Africa/Lagos","Africa/Maputo","Africa/Monrovia","Africa/Nairobi","Africa/Ndjamena","Africa/Sao_Tome","Africa/Tripoli","Africa/Tunis","Africa/Windhoek","America/Adak","America/Anchorage","America/Araguaina","America/Argentina/Buenos_Aires","America/Argentina/Catamarca","America/Argentina/Cordoba","America/Argentina/Jujuy","America/Argentina/La_Rioja","America/Argentina/Mendoza","America/Argentina/Rio_Gallegos","America/Argentina/Salta","America/Argentina/San_Juan","America/Argentina/San_Luis","America/Argentina/Tucuman","America/Argentina/Ushuaia","America/Asuncion","America/Bahia","America/Bahia_Banderas","America/Barbados","America/Belem","America/Belize","America/Boa_Vista","America/Bogota","America/Boise","America/Cambridge_Bay","America/Campo_Grande","America/Cancun","America/Caracas","America/Cayenne","America/Chicago","America/Chihuahua","America/Ciudad_Juarez","America/Costa_Rica","America/Cuiaba","America/Danmarkshavn","America/Dawson","America/Dawson_Creek","America/Denver","America/Detroit","America/Edmonton","America/Eirunepe","America/El_Salvador","America/Fort_Nelson","America/Fortaleza","America/Glace_Bay","America/Goose_Bay","America/Grand_Turk","America/Guatemala","America/Guayaquil","America/Guyana","America/Halifax","America/Havana","America/Hermosillo","America/Indiana/Indianapolis","America/Indiana/Knox","America/Indiana/Marengo","America/Indiana/Petersburg","America/Indiana/Tell_City","America/Indiana/Vevay","America/Indiana/Vincennes","America/Indiana/Winamac","America/Inuvik","America/Iqaluit","America/Jamaica","America/Juneau","America/Kentucky/Louisville","America/Kentucky/Monticello","America/La_Paz","America/Lima","America/Los_Angeles","America/Maceio","America/Managua","America/Manaus","America/Martinique","America/Matamoros","America/Mazatlan","America/Menominee","America/Merida","America/Metlakatla","America/Mexico_City","America/Miquelon","America/Moncton","America/Monterrey","America/Montevideo","America/New_York","America/Nome","America/Noronha","America/North_Dakota/Beulah","America/North_Dakota/Center","America/North_Dakota/New_Salem","America/Nuuk","America/Ojinaga","America/Panama","America/Paramaribo","America/Phoenix","America/Port-au-Prince","America/Porto_Velho","America/Puerto_Rico","America/Punta_Arenas","America/Rankin_Inlet","America/Recife","America/Regina","America/Resolute","America/Rio_Branco","America/Santarem","America/Santiago","America/Santo_Domingo","America/Sao_Paulo","America/Scoresbysund","America/Sitka","America/St_Johns","America/Swift_Current","America/Tegucigalpa","America/Thule","America/Tijuana","America/Toronto","America/Vancouver","America/Whitehorse","America/Winnipeg","America/Yakutat","Antarctica/Casey","Antarctica/Davis","Antarctica/Macquarie","Antarctica/Mawson","Antarctica/Palmer","Antarctica/Rothera","Antarctica/Troll","Antarctica/Vostok","Asia/Almaty","Asia/Amman","Asia/Anadyr","Asia/Aqtau","Asia/Aqtobe","Asia/Ashgabat","Asia/Atyrau","Asia/Baghdad","Asia/Baku","Asia/Bangkok","Asia/Barnaul","Asia/Beirut","Asia/Bishkek","Asia/Chita","Asia/Choibalsan","Asia/Colombo","Asia/Damascus","Asia/Dhaka","Asia/Dili","Asia/Dubai","Asia/Dushanbe","Asia/Famagusta","Asia/Gaza","Asia/Hebron","Asia/Ho_Chi_Minh","Asia/Hong_Kong","Asia/Hovd","Asia/Irkutsk","Asia/Jakarta","Asia/Jayapura","Asia/Jerusalem","Asia/Kabul","Asia/Kamchatka","Asia/Karachi","Asia/Kathmandu","Asia/Khandyga","Asia/Kolkata","Asia/Krasnoyarsk","Asia/Kuching","Asia/Macau","Asia/Magadan","Asia/Makassar","Asia/Manila","Asia/Nicosia","Asia/Novokuznetsk","Asia/Novosibirsk","Asia/Omsk","Asia/Oral","Asia/Pontianak","Asia/Pyongyang","Asia/Qatar","Asia/Qostanay","Asia/Qyzylorda","Asia/Riyadh","Asia/Sakhalin","Asia/Samarkand","Asia/Seoul","Asia/Shanghai","Asia/Singapore","Asia/Srednekolymsk","Asia/Taipei","Asia/Tashkent","Asia/Tbilisi","Asia/Tehran","Asia/Thimphu","Asia/Tokyo","Asia/Tomsk","Asia/Ulaanbaatar","Asia/Urumqi","Asia/Ust-Nera","Asia/Vladivostok","Asia/Yakutsk","Asia/Yangon","Asia/Yekaterinburg","Asia/Yerevan","Atlantic/Azores","Atlantic/Bermuda","Atlantic/Canary","Atlantic/Cape_Verde","Atlantic/Faroe","Atlantic/Madeira","Atlantic/South_Georgia","Atlantic/Stanley","Australia/Adelaide","Australia/Brisbane","Australia/Broken_Hill","Australia/Darwin","Australia/Eucla","Australia/Hobart","Australia/Lindeman","Australia/Lord_Howe","Australia/Melbourne","Australia/Perth","Australia/Sydney","CET","CST6CDT","EET","EST","EST5EDT","Etc/GMT","Etc/GMT+1","Etc/GMT+10","Etc/GMT+11","Etc/GMT+12","Etc/GMT+2","Etc/GMT+3","Etc/GMT+4","Etc/GMT+5","Etc/GMT+6","Etc/GMT+7","Etc/GMT+8","Etc/GMT+9","Etc/GMT-1","Etc/GMT-10","Etc/GMT-11","Etc/GMT-12","Etc/GMT-13","Etc/GMT-14","Etc/GMT-2","Etc/GMT-3","Etc/GMT-4","Etc/GMT-5","Etc/GMT-6","Etc/GMT-7","Etc/GMT-8","Etc/GMT-9","Etc/UTC","Europe/Andorra","Europe/Astrakhan","Europe/Athens","Europe/Belgrade","Europe/Berlin","Europe/Brussels","Europe/Bucharest","Europe/Budapest","Europe/Chisinau","Europe/Dublin","Europe/Gibraltar","Europe/Helsinki","Europe/Istanbul","Europe/Kaliningrad","Europe/Kirov","Europe/Kyiv","Europe/Lisbon","Europe/London","Europe/Madrid","Europe/Malta","Europe/Minsk","Europe/Moscow","Europe/Paris","Europe/Prague","Europe/Riga","Europe/Rome","Europe/Samara","Europe/Saratov","Europe/Simferopol","Europe/Sofia","Europe/Tallinn","Europe/Tirane","Europe/Ulyanovsk","Europe/Vienna","Europe/Vilnius","Europe/Volgograd","Europe/Warsaw","Europe/Zurich","HST","Indian/Chagos","Indian/Maldives","Indian/Mauritius","MET","MST","MST7MDT","PST8PDT","Pacific/Apia","Pacific/Auckland","Pacific/Bougainville","Pacific/Chatham","Pacific/Easter","Pacific/Efate","Pacific/Fakaofo","Pacific/Fiji","Pacific/Galapagos","Pacific/Gambier","Pacific/Guadalcanal","Pacific/Guam","Pacific/Honolulu","Pacific/Kanton","Pacific/Kiritimati","Pacific/Kosrae","Pacific/Kwajalein","Pacific/Marquesas","Pacific/Nauru","Pacific/Niue","Pacific/Norfolk","Pacific/Noumea","Pacific/Pago_Pago","Pacific/Palau","Pacific/Pitcairn","Pacific/Port_Moresby","Pacific/Rarotonga","Pacific/Tahiti","Pacific/Tarawa","Pacific/Tongatapu","WET"]

    sessionStorage.setItem('timezoneNames', JSON.stringify(jsonResponseData));

    // if (response.status === 403 || response.status === 404) {
    //     const msg = '403'
    //     throw msg
    // } else {
    //     sessionStorage.setItem('timezoneNames', JSON.stringify(jsonResponseData));
    // }
}

async function populateTimezones(currentTimezone) {
    // Drop down list method for selecting timezone
    // const selTimezones = document.querySelector('.sel_timezone');
    const inputTimezones = document.querySelector('#timezoneName');
    const dlSelTimezones = document.querySelector('#timezoneNames');

    await requestTimezoneNames();

    const timezoneNames = JSON.parse(sessionStorage.getItem('timezoneNames'));

    if (timezoneNames === null) {
        return;
    } else {
        // Datalist method for selecting timezone
        // <option value="volvo">Volvo</option>
        for (let i = 0; i < timezoneNames.length; i ++) {
            const timezoneOption = document.createElement('option');
            const currTimezone = timezoneNames[i]
            timezoneOption.value = currTimezone;
            timezoneOption.innerText = currTimezone;
            if (currentTimezone == currTimezone) {
                inputTimezones.value = currTimezone;
            }
            dlSelTimezones.appendChild(timezoneOption);
        }


        // Drop down list method for selecting timezone
        // <option value="volvo">Volvo</option>
        // for (let i = 0; i < timezoneNames.length; i ++) {
        //     const timezoneOption = document.createElement('option');
        //     timezoneOption.value = timezoneNames[i];
        //     timezoneOption.innerText = timezoneNames[i];
        //     if (currentTimezone == timezoneNames[i]) {
        //         timezoneOption.setAttribute('selected', 'selected');
        //     }
        //     selTimezones.appendChild(timezoneOption)
        // }
    }
}

function initApp() {
    MicroModal.init();

    // Loading plugin in the browser
    // Load plugin as window.dayjs_plugin_NAME
    dayjs.extend(window.dayjs_plugin_utc);
    dayjs.extend(window.dayjs_plugin_timezone);

    const currTimezone = dayjs.tz.guess();

    const timecardTimezone = document.querySelector('.timezone__div');
    const timecardTimezoneChange = document.querySelector('.timezone_modal_button')
    const timecardTime = document.querySelector('.timecard__time');
    const timecardDate = document.querySelector('.timecard__date');
    const timezoneName = document.querySelector('#timezoneName');
    const timezoneNames = document.querySelector('#timezoneNames');

    // const micromodalContainer = document.querySelector('.micromodal__container');
    // micromodalContainer.addEventListener('click', (event) => {
    //     event.stopPropagation();
    //     console.log('hi')
    // }, false);

    // Initial set
    updateTimeCard(currTimezone, timecardTimezone, timecardTime, timecardDate)
    // update interval
    let timeUpdater = setInterval(updateTimeCard, 1000, currTimezone, timecardTimezone, timecardTime, timecardDate);

    // populate timezones
    populateTimezones(currTimezone);
    // console.log(dayjs("2013-11-18 11:55:20").tz("WET")['$d']);

    // Datalist method for selecting timezone
    // const timezoneName = document.querySelector('#timezoneName');
    // const timezoneNames = document.querySelector('#timezoneNames');
    // ['click'].forEach( function(event) {
    //     timezoneName.addEventListener(event, (event) => {
    //         timezoneName.value = "";
    //     }, false);
    // });

    // // Drop down list method for selecting timezone
    // const selTimezone = document.querySelector('.sel_timezone');
    // ['click','mousedown'].forEach( function(event) {
    //     selTimezone.addEventListener(event, (event) => {
    //         if(selTimezone.options.length > 6){
    //             selTimezone.size = 20;
    //         }
    //         selTimezone.focus();
    //     }, false);
    // });

    // selTimezone.addEventListener('mouseleave', (event) => {
    //     selTimezone.size = 0;
    // });

    timecardTimezoneChange.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const currTimezone = document.querySelector('.timezone__div');
        const tzModalMsg = document.querySelector('#modal_msg');
        timezoneName.value = currTimezone.innerText;
        tzModalMsg.textContent = '';

        MicroModal.show('modal-1');
    }, false);

    const applyTimezone = document.querySelector('#apply_timezone');
    applyTimezone.addEventListener('click', (event) => {
        // const newTimezone = selTimezone.value;
        const tzModalMsg = document.querySelector('#modal_msg');
        tzModalMsg.textContent = '';
        const timezoneNamesList = JSON.parse(sessionStorage.getItem('timezoneNames'));
        const newTimezoneInput = timezoneName.value;
        if (!timezoneNamesList.includes(newTimezoneInput)) {
            tzModalMsg.textContent = 'Please enter a valid timezone from the list.';
            return;
        }
        updateTimeCard(newTimezoneInput, timecardTimezone, timecardTime, timecardDate);
        clearInterval(timeUpdater);
        timeUpdater = setInterval(updateTimeCard, 1000, newTimezoneInput, timecardTimezone, timecardTime, timecardDate);
        MicroModal.close('modal-1');
    }, false);
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

// TODO. replace select with search bar and empty is all timezones and will filter based on user input