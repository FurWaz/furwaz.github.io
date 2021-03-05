var animationsIn = ["spawn-in-left", "spawn-in-right", "spawn-in-top", "spawn-in-bottom"];
var animationsOut = ["spawn-out-left", "spawn-out-right", "spawn-out-top", "spawn-out-bottom"];
const PAGES = {
    HOME: 1,
    VIDEOS: 2,
    SONGS: 3,
    PROJECTS: 4,
    ABOUT: 5
}

window.onload = () => {
    var url = window.location.href;
    var pageID = url.split("page=")[1];
    loadPage(stringToID(pageID));
}

window.onpopstate = function(event) {
    var url = window.location.href;
    var pageID = url.split("page=")[1];
    loadPage(stringToID(pageID), false);
};

/**
 * Convert any string to a page ID
 * @param {any} pageInfo 
 */
function stringToID(pageInfo=undefined) {
    var result = PAGES.HOME;
    switch (pageInfo) {
        case "home":
            result = PAGES.HOME;
            break;
        case "videos":
            result = PAGES.VIDEOS;
            break;
        case "songs":
            result = PAGES.SONGS;
            break;
        case "projects":
            result = PAGES.PROJECTS;
            break;
        case "about":
            result = PAGES.ABOUT;
            break;
        default:
            break;
    }
    return result;
}
/**
 * Convert any page ID to string
 * @param {number} pageID
 */
function IDtoString(pageID=PAGES.HOME, capitalize=false) {
    var result = "home";
    switch (pageID) {
        case PAGES.HOME:
            result = "home";
            break;
        case PAGES.VIDEOS:
            result = "videos";
            break;
        case PAGES.SONGS:
            result = "songs";
            break;
        case PAGES.PROJECTS:
            result = "projects";
            break;
        case PAGES.ABOUT:
            result = "about";
            break;
        default:
            break;
    }
    result = capitalize? result[0].toUpperCase()+result.substring(1, result.length): result;
    return result;
}

/**
 * Loads the required web page
 * @param {string} pageID 
 */
function loadPage(pageID=undefined, pushState=true) {
    if (pageID == undefined) pageID = PAGES.HOME;
    if (pushState) window.history.pushState({}, 'FurWaz | WebSite', '/index.html?page='+IDtoString(pageID))
    document.title = "FurWaz | "+IDtoString(pageID, true);
    var content = document.getElementById("page-content");
    if (pageID == PAGES.HOME) {
        document.getElementById("promo-container").style.height = "50vh";
        document.getElementById("promo-title").style.marginTop = "14vh";
        document.getElementById("promo-infos-back").style.transform = "translate(calc(-70vh - 8vw), 0vh) skew(30deg)";
        document.getElementById("promo-infos-front").style.top = "17vh";
    }
    else {
        document.getElementById("promo-container").style.height = "30vh";
        document.getElementById("promo-title").style.marginTop = "2.5vh";
        document.getElementById("promo-infos-back").style.transform = "translate(calc(-70vh - 8vw), -10vh) skew(30deg)";
        document.getElementById("promo-infos-front").style.top = "6.5vh";
    }
    clearPage(content);
    setTimeout(() => {
        switch (pageID) {
            case PAGES.HOME:
                loadHomePage(content);
                break;
            case PAGES.VIDEOS:
                loadVideosPage(content);
                break;
            case PAGES.SONGS:
                loadSongsPage(content);
                break;
            case PAGES.PROJECTS:
                loadProjectsPage(content);
                break;
            case PAGES.ABOUT:
                loadAboutPage(content);
                break;
    
            default:
                break;
        }
    }, 250);
}

/**
 * Clear the content in the given element
 * @param {HTMLDivElement} content
 */
function clearPage(content) {
    for (let i = 0; i < content.childElementCount; i++) {
        content.children[i].classList.add(getRandomAnimationOut());
    }
    setTimeout(() => {
        while (content.firstChild) {
            content.firstChild.remove();
        }
    }, 200);
}

function getRandomAnimationIn() {return animationsIn[Math.round(Math.random()*(animationsIn.length-1))];}
function getRandomAnimationOut() {return animationsOut[Math.round(Math.random()*(animationsOut.length-1))];}