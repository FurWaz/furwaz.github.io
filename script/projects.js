export function setupProjects() {
    let dom = document.getElementById("page-content");
    while (dom.firstChild)
        dom.firstChild.remove();
    loadProjects(dom);
}

let projects = [
    {
        title: "FullBowody",
        url: "https://github.com/FurWaz/FullBowody",
        website: "https://furwaz.github.io/FullBowody/",
        icon: "https://github.com/FurWaz/FullBowody/blob/main/resources/pics/fullbowody.png?raw=true"
    },
    {
        title: "Zefur",
        url: "https://github.com/FurWaz/Zefur",
        website: "https://furwaz.github.io/Zefur/",
        icon: "https://raw.githubusercontent.com/FurWaz/Zefur/main/resources/icon.png"
    },
    {
        title: "WebXR",
        url: "https://github.com/FurWaz/WebXR",
        website: "https://furwaz.github.io/WebXR/client/",
        icon: "https://immersiveweb.dev/images/webxrlogo.png"
    }
]

function loadProjects(dom) {
    let cont = document.createElement("div");
    cont.classList.add("card-container");
    dom.appendChild(cont);

    let index = 0;
    projects.forEach(p => {
        let card = document.createElement("div");
        card.classList.add("card-main");
        let title = document.createElement("h2");
        title.classList.add("card-title");
        title.innerHTML = p.title;
        let icon = document.createElement("img");
        icon.classList.add("card-icon");
        icon.src = p.icon;
        icon.onclick = () => {window.location.href = p.website;};
        let sourceDiv = document.createElement("div");
        sourceDiv.classList.add("card-centered");
        let source = document.createElement("p");
        source.classList.add("card-source");
        source.innerHTML = "Source code";
        source.onclick = () => {window.location.href = p.url;};
        sourceDiv.appendChild(source);

        card.appendChild(title);
        card.appendChild(icon);
        card.appendChild(sourceDiv);
        cont.appendChild(card);
        icon.onload = () => {
            setTimeout(() => {
                card.classList.add("card-spawn");
                setTimeout(() => {
                    card.style.opacity = "1";
                }, 500);
            }, (index++)*100);
        }
    });
}