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
    loadPage(stringToID(pageID))
}

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
function loadPage(pageID=undefined) {
    if (pageID == undefined) pageID = PAGES.HOME;
    window.history.pushState({}, 'FurWaz | WebSite', '/index.html?page='+IDtoString(pageID))
    document.title = "FurWaz | "+IDtoString(pageID, true);
}