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
    clearPage(content);
    setTimeout(() => {
        switch (pageID) {
            case PAGES.HOME:
                loadHomePage(content);
                document.getElementById("header-Home").style.color = "var(--color-primary)";
                break;
            case PAGES.VIDEOS:
                loadVideosPage(content);
                document.getElementById("header-Videos").style.color = "var(--color-primary)";
                break;
            case PAGES.SONGS:
                loadSongsPage(content);
                document.getElementById("header-Songs").style.color = "var(--color-primary)";
                break;
            case PAGES.PROJECTS:
                loadProjectsPage(content);
                document.getElementById("header-Projects").style.color = "var(--color-primary)";
                break;
            case PAGES.ABOUT:
                loadAboutPage(content);
                document.getElementById("header-About").style.color = "var(--color-primary)";
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
    document.getElementById("header-Home").style.color = "var(--color-white)";
    document.getElementById("header-Videos").style.color = "var(--color-white)";
    document.getElementById("header-Songs").style.color = "var(--color-white)";
    document.getElementById("header-Projects").style.color = "var(--color-white)";
    document.getElementById("header-About").style.color = "var(--color-white)";
}

function getRandomAnimationIn() {return animationsIn[Math.round(Math.random()*(animationsIn.length-1))];}
function getRandomAnimationOut() {return animationsOut[Math.round(Math.random()*(animationsOut.length-1))];}