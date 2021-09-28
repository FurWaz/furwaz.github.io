function EMPTY_FUNC(){}

const PAGES = [
    {name: "Home", loadPage: EMPTY_FUNC},
    {name: "Projects", loadPage: EMPTY_FUNC},
    {name: "About", loadPage: EMPTY_FUNC}
]

const OPTIONS_CONTAINER = document.getElementById("opts-container");

function getPageDOM(pageID=PAGES[0]) {
    return document.getElementById("header-"+pageID.name);
}

window.onload = () => {
    PAGES.forEach(p => {
        let opt = document.createElement("div");
        opt.classList.add("header-opt-container");
        opt.id = "header-"+p.name;
        opt.onclick = ()=>{loadPage(p)};
        let title = document.createElement("h2");
        title.classList.add("header-opt-title");
        title.innerHTML = p.name;
        opt.appendChild(title);
        OPTIONS_CONTAINER.appendChild(opt);
    });
    loadPage(PAGES[0]);
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
    var result = PAGES[0];
    PAGES.forEach(p => {
        if (p.name == pageInfo)
            result = p;
    });
    return result;
}
/**
 * Convert any page ID to string
 * @param {number} pageID
 */
function IDtoString(pageInfo=PAGES[0]) {
    return pageInfo.name;
}

function loadPage(pageID=PAGES[0], pushState=true) {
    document.title = "FurWaz | "+IDtoString(pageID, true);
    if (pushState) window.history.pushState({}, document.title, '/index.html?page='+IDtoString(pageID))
    var content = document.getElementById("page-content");
    clearPage(content);
    setTimeout(() => {
        let div = getPageDOM(pageID);
        pageID.loadPage();
        div.firstChild.style.color = "var(--color-orange-2)";
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
    PAGES.forEach(p => {
        getPageDOM(p).firstChild.style.color = "var(--color-orange-3)";
    });
}