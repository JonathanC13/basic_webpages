// if locations__ul is empty, ensure locations__ul and personal__locations do not have padding: var(--PADDING-HEADER-TOPBOT) var(--PADDING-SIDES);
// if socials__ul is empty, ensure socials__ul and personal__socials do not have padding: var(--PADDING-HEADER-TOPBOT) var(--PADDING-SIDES); . Just remove padding. if has items, must add .content_padding-sides and .content_margin-topbot (why? margins collapse and this is a vertical list. *collapse mean if there is an overlap, it will merge, unlike padding since it is inside it's respective element it will not collapse)

/* TODO: 
    1. @media screen and (min-width: 500px)
    2. Enter username on home, request to api, handle errors if any, at least display profile info on profile page
    3. new username in search will refresh page with new info

    4. build the repo container
    5. fill the repo containers with the user's actual repo data.

    d
*/

function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (25+element.scrollHeight)+"px";
}

function initApp() {
    // temp here
    const locationsUl = document.querySelector(".locations__ul");
    const socialsUl = document.querySelector(".socials__ul");

    const personalDesc = document.querySelector("#ta_personal-desc");
    textAreaAdjust(personalDesc);

}

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});