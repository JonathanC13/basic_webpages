// if locations__ul is empty, ensure locations__ul and personal__locations do not have padding: var(--PADDING-HEADER-TOPBOT) var(--PADDING-SIDES);
// if socials__ul is empty, ensure socials__ul and personal__socials do not have padding: var(--PADDING-HEADER-TOPBOT) var(--PADDING-SIDES); . Just remove padding. if has items, must add .content_padding-sides and .content_margin-topbot (why? margins collapse and this is a vertical list. *collapse mean if there is an overlap, it will merge, unlike padding since it is inside it's respective element it will not collapse)

/* TODO: 
    1. @media screen and (min-width: 500px) * HERE
    3. Hovering followers and following will list the usernames
        if none, no container and cursor. else yes.

    https://api.github.com/users/JonathanC13
    https://api.github.com/users/JonathanC13/repos
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
 * @return {boolean} true if change, else false
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
            return true;
        }
    }
    return false;
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
 * Remove all child items from the list.
 * @param {object} ulElem The ul element for the list
 * @return {}
 */
const clearList = (ulElem) => {
    while (ulElem.firstChild) {
        ulElem.removeChild(ulElem.firstChild);
    }
}

/**
 * Remove all child items from the list.
 * @param {string} emoji Emoji of the li item
 * @param {string} text text of the li item
 * @param {string} hint Text for the abbr hint
 * @param {object} ulElem The ul element for the list
 * @return {}
 */
const createProfileListItem = (emoji, text, hint, ulElem) => {
    const newli = document.createElement("li");
    const abbr = document.createElement('abbr');
    abbr.title = hint;
    abbr.classList.add('abbr_no_underline');
    abbr.textContent = emoji.concat(' ').concat(text);

    newli.appendChild(abbr);
    ulElem.appendChild(newli);
}

const requestProfileRepos = async(url) => {
    const response = await fetch(url, 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const jsonResponseData = await response.json();

    return jsonResponseData;
}

const createRepoListItem = (item, ulElem) => {
    const newLi = document.createElement('li');
    newLi.classList.add('repos__li', 'cursor_pointer');
    ulElem.appendChild(newLi);

    const newA = document.createElement('a');
    newA.classList.add('no_a_text_deco');
    newA.setAttribute("href", item['html_url']);
    newA.setAttribute("target",'_blank');
    newLi.appendChild(newA);

    const newArtie = document.createElement('article');
    newArtie.classList.add('repos__artie', 'repartie');
    newA.appendChild(newArtie);

    const newH2 = document.createElement('h2');
    newH2.classList.add('offscreen');
    newH2.textContent = item['name'];
    newArtie.appendChild(newH2);

    const newDivTitleInfo = document.createElement('div');
    newDivTitleInfo.classList.add('repartie__title_info');
    newArtie.appendChild(newDivTitleInfo);

    const newTitleInfoH3 = document.createElement('h3');
    newTitleInfoH3.classList.add('repartie__h3');
    newTitleInfoH3.textContent = item['name'];
    newDivTitleInfo.appendChild(newTitleInfoH3);

    const newTitleInfoSpan = document.createElement('span');
    newTitleInfoSpan.classList.add('repartie__visibility');
    newTitleInfoSpan.textContent = item['visibility'];
    newDivTitleInfo.appendChild(newTitleInfoSpan);

    const newDivDesc = document.createElement('div');
    newDivDesc.classList.add('repartie__desc');
    newDivDesc.textContent = item['description'];
    newArtie.appendChild(newDivDesc);

    const newDivSuppInfo = document.createElement('div');
    newDivSuppInfo.classList.add('repartie__supp_info');
    newArtie.appendChild(newDivSuppInfo);

    const newSpanSuppLang = document.createElement('span');
    newSpanSuppLang.classList.add('main_lang');
    newSpanSuppLang.textContent = item['language'];
    newDivSuppInfo.append(newSpanSuppLang);

    const newSpanSuppUpdate = document.createElement('span');
    newSpanSuppUpdate.classList.add('last_update');
    // 2022-05-15T00:01:44Z
    const date = new Date(String(item['updated_at']))
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const updateDate = month[date.getMonth()].concat(' ').concat(String(date.getDate()).concat(', ')).concat(String(date.getFullYear()));
    newSpanSuppUpdate.textContent = 'Updated on '.concat(updateDate);
    newDivSuppInfo.append(newSpanSuppUpdate);
}

/**
 * Control function to construct the repos list
 * @param {String} reposURL 
 * @return {}
 */
const buildRepoListItem = async(reposURL, ulElem) => {
    const jsonResponseData = await requestProfileRepos(reposURL);
    const { compare } = Intl.Collator('en-US');
    // sorted in desc update_at
    jsonResponseData.sort((a, b) => {
        return compare(a.updated_at, b.updated_at)
    }).reverse();
    
    for (let i = 0; i < jsonResponseData.length; i ++) {
        createRepoListItem(jsonResponseData[i], ulElem);
    }
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

    const profilePic = document.querySelector('#personal__pic__img');
    const profileName = document.querySelector('.names__name');
    const profileUsername = document.querySelector('.names__username');
    const profileDesc = document.querySelector('.personal__desc__text');
    const followersNum = document.querySelector('.follow__followers-num');
    const followingNum = document.querySelector('.follow__following-num');
    // company, location, blog
    const locationsList = document.querySelector('.locations__ul');
    // twitter username
    const socialsList = document.querySelector('.socials__ul');

    // repos
    const reposH3 = document.querySelector('.repos__h3');
    const reposList = document.querySelector('.repos__ul');

    // Reset
    clearList(locationsList);
    clearList(socialsList);
    clearList(reposList);
    if (reposList.firstChild) {
        reposH3.classList.add('offscreen');
    }

    // Populate
    profilePic.src = jsonResponseData['avatar_url'];
    profileName.textContent = jsonResponseData['name'];
    profileUsername.textContent = jsonResponseData['login'];
    profileDesc.textContent = jsonResponseData['bio'];
    followersNum.textContent = jsonResponseData['followers'];
    followingNum.textContent = jsonResponseData['following'];

    if (jsonResponseData['company'].length > 0) {
        // 'None' is OK
        createProfileListItem('🏢', jsonResponseData['company'], 'Company', locationsList);
    }
    if (jsonResponseData['location'].length > 0) {
        createProfileListItem('🏡', jsonResponseData['location'], 'Location' ,locationsList);
    }
    if (jsonResponseData['blog'].length > 0) {
        createProfileListItem('🗀', jsonResponseData['blog'], 'Blog', locationsList);
    }
    
    if (jsonResponseData['twitter_username'] !== null && jsonResponseData['twitter_username'].length > 0) {
        createProfileListItem('🦅', jsonResponseData['twitter_username'], 'Twitter', socialsList);
    }

    if (jsonResponseData['repos_url'].length == 0) {
        reposH3.classList.remove('offscreen');
    } else {
        buildRepoListItem(jsonResponseData['repos_url'], reposList);
    }
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
            const change = managePageLocation("profile");
            // if page had to redirect to profile.html, the current JS executing is on the previous page, must return out. When on load of the profile.html page, the JS must check in initApp() if there a requestObj exists and if true and on profile.html, build the profile.
            if (change) {
                return;
            }
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
    // Profile page header
    const header = document.querySelector('.profile-header');
    if (header !== null) {
        header.addEventListener('click', (event) => {
            managePageLocation('index');
        }, false);
    }

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

/*
<li class="repos__li">
    <article class="repos__artie repartie">
        <h2 class="offscreen">Title</h2>
        <div class="repartie__title_info">
            <h3 class="repartie__h3">Title11</h3>
            <span class="repartie__visibility">Public</span>
        </div>

        <div class="repartie__desc">
            Web development from the beginning. Again, and again, and again.
        </div>

        <div class="repartie__supp_info">
            <span class="main_lang">HTML</span>
            <span class="last_update">Updated on Apr 22, 2023</span>
        </div>
    </article>
</li>
*/