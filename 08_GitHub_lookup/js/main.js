// if locations__ul is empty, ensure locations__ul and personal__locations do not have padding: var(--PADDING-HEADER-TOPBOT) var(--PADDING-SIDES);
// if socials__ul is empty, ensure socials__ul and personal__socials do not have padding: var(--PADDING-HEADER-TOPBOT) var(--PADDING-SIDES); . Just remove padding. if has items, must add .content_padding-sides and .content_margin-topbot (why? margins collapse and this is a vertical list. *collapse mean if there is an overlap, it will merge, unlike padding since it is inside it's respective element it will not collapse)

/* TODO: 
    1. @media screen and (min-width: 500px) * HERE
    2. Enter username on home, request to api, handle errors if any, at least display profile info on profile page
    3. new username in search will refresh page with new info

    4. build the repo container
    5. fill the repo containers with the user's actual repo data.

    d

    const response = await fetch(`https://api.github.com/users/${username}`);
*/

/**
 * If requested username exists from API return.
 * @param {}
 * @return {boolean} if existing username request to github
 */
const existUsernameRequest = () => {
    const jsonResponseData = JSON.parse(sessionStorage.getItem("jsonResponseData"));

    if (jsonResponseData === null || ('status' in jsonResponseData) && jsonResponseData['status'] === '404') {
        return false;
    } else {
        return true;
    }
}

/**
 * Retrieve the username from the search input
 * @param {}
 * @return {object} object that contains the params for the API URL
 */
const getDataFromSearchBar = () => {
    const username = document.querySelector("#search-form__input").value.trim();

    const requestObj = {
        username: username
    };

    return requestObj;
}

/**
 * Change pages if needed; If on index.html, must store
 * @param {string} dest The desired destination page.
 * @return {}
 */
const managePageLocation = (dest) => {
    if (window.location) {
        // href: 'http://127.0.0.1:5500/full_stack_road_map/basic_projects/basic_webpages/08_GitHub_lookup/index.html'
        let currhref = window.location['href'];
        let pageName = currhref.slice(currhref.lastIndexOf("/") + 1, currhref.lastIndexOf("."));
        // change page if needed
        if (pageName !== dest) {
            const profilePage = currhref.slice(0, currhref.lastIndexOf("/") + 1).concat(dest).concat('.html')
            // Go to profile page. Will load the profile.html and reload the JS and stop execution.
            window.location.href = profilePage;
        }
    }
}

/**
 * Build the URL for the API request.
 * @param {object} requestData Data for the URL params
 * @return {}
 */
const buildGithubRequestUrl = (requestData) => {
    return `https://api.github.com/users/${requestData["username"]}`;
}

/**
 * Send request to the API
 * @param {String} url API URL
 * @return {}
 */
const requestGithubProfile = async(url) => {
    const response = await fetch(url, 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const jsonResponseData = await response.json();

    sessionStorage.setItem('jsonResponseData', JSON.stringify(jsonResponseData));
}

/**
 * With the json data from the API request, populate the profile page.
 * @param {object} jsonData API URL
 * @return {}
 */
const populateGithubProfileInfo = () => {
    const jsonResponseData = JSON.parse(sessionStorage.getItem("jsonResponseData"));
    const searchInput = document.querySelector('#search-form__input');
    searchInput.value = jsonResponseData['login'];

    // TODO, reset and populate profile.html
    console.log('hi')
    console.log(jsonResponseData);
}

/**
 * Listener for the GO button for searching for the Github profile.
 * @param {object} event event that triggered the listener
 * @return {}
 */
async function githubUsernameSearch(event) {
    event.preventDefault();

    // Save the username into session storage in case the page needs to be changed.
    const searchMessage = document.querySelector('#search-form__message');
    const requestObj = getDataFromSearchBar();
    if (requestObj['username'].length == 0) {
        searchMessage.textContent = 'Please enter a username.'
        return;
    } else {
        searchMessage.textContent = ''
        const url = buildGithubRequestUrl(requestObj);
        await requestGithubProfile(url);

        if (existUsernameRequest()) {
            managePageLocation("profile");
            // if page had to redirect to profile.html. JS will reload here and not execute the remaining code; must check in initApp() if there a requestObj exists and if true and on profile.html, build the profile.
            populateGithubProfileInfo();
        } else {
            searchMessage.textContent = 'Not Found'
        }
    }
}

/**
 * If no session storage data for requestObj and not on index.html, default to index.html.
 * @param {}
 * @return {}
 */
const initialPage = () => {
    let pageName = '';
    if (window.location) {
        let currhref = window.location['href'];
        pageName = currhref.slice(currhref.lastIndexOf("/") + 1, currhref.lastIndexOf("."));
    }

    if (!existUsernameRequest() && pageName === 'profile') {
        managePageLocation("index");
    } else if (existUsernameRequest() && pageName === 'profile') {
        populateGithubProfileInfo();
    }
    // Else stay on index.html without any action.
}

/**
 * Intialize listeners
 * @param {}
 * @return {}
 */
function initApp() {
    // username search listener
    const searchUsernameBtn = document.querySelector("#search-form__button");
    searchUsernameBtn.addEventListener("click", githubUsernameSearch, false);

    initialPage();
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


/*
1. On Profile.html
    1.1. If on profile.html, but no session storage of jsonResponseData > redirect to index
        - initApp()
        - initialPage()
            - !existUsernameRequest() && pageName === 'profile' > managePageLocation("index")
        
    1.2. If on profile.html and has session storage of requestObj with valid username > build profile.html
        - initApp()
        - initialPage()
            - existUsernameRequest() && pageName === 'profile'
            - populateGithubProfileInfo()

    1.3. search-form__button click with empty username > display message
        - githubUsernameSearch()
            - requestObj['username'].length == 0

    1.4. search-form__button click with username that does not exist > display message
        - githubUsernameSearch(event)
        - populateGithubProfileInfo()
            - requestGithubProfile(url)
            - populateGithubProfileInfo(jsonResponseData)
                - ('status' in jsonResponseData) && jsonResponseData['status'] === '404'

    1.5. search-form__button click with username that does exist > reset and populate profile.html page
        - githubUsernameSearch(event)
        - populateGithubProfileInfo()
            - requestGithubProfile(url)
            - populateGithubProfileInfo(jsonResponseData)

2. On Index.html
    2.1. search-form__button click with length of username == 0 > display message
        - githubUsernameSearch()
            - requestObj['username'].length == 0

    2.2. search-form__button click with username that does exist > display message
        - githubUsernameSearch()
        - requestGithubProfile(url) - store response into sessionStorage
        - if status 404 > display message

    2.3. search-form__button click with username that does exist > redirect to profile.html, reset and populate profile.html page
        - githubUsernameSearch()
        - requestGithubProfile(url) - store response into sessionStorage
            - managePageLocation("profile") - redirect if needed.
            ** No redirect:
                - populateGithubProfileInfo()
            ** Redirect
                - JS reloads, profile.html loads
                - initApp()
                - initialPage()
                    - existUsernameRequest() && pageName === 'profile'
                    - populateGithubProfileInfo()
*/