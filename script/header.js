export let menus = ["Home", "Projects", "About"];

export function generateCodeLines() {
    let colors = ["var(--color-white)", "var(--color-red)", "var(--color-blue)", "var(--color-yellow)", "var(--color-green)", "var(--color-grey)"];
    let container = document.getElementById("header-lines");
    let nbLines = 16;
    for (let i = 0; i < nbLines; i++) {
        setTimeout(() => {
            let cont = document.createElement("div");
            cont.classList.add("lines-container");
            let max = Math.random() * 20 + 1;
            for (let j = 0; j < max; j++) {
                let line = document.createElement("div");
                line.classList.add("code-line");
                line.style.backgroundColor = colors[Math.round(Math.random() * (colors.length - 1))];
                line.style.width = (Math.random() * 40 + 20) + "px";
                line.style.marginRight = (Math.random()*10 + 10) + "px";
                line.style.opacity = (j/max+0.02)+"";
                cont.appendChild(line);
            }
            container.appendChild(cont);
        }, i * 50);
    }
}

export function InitHeader(container) {
    let index = 0;
    menus.forEach(m => {
        setTimeout(() => {
            let cont = document.createElement("div");
            cont.classList.add("option-container");
            cont.onclick = () => {selectMenu(m)};
            let title = document.createElement("h2");
            title.id = "opts-"+m;
            title.classList.add("option-text");
            title.innerHTML = m;
            cont.appendChild(title);
            container.appendChild(cont);
        }, (index++) * 100);
    });
    let displayMenu = menus[0];
    if (window.location.href.split("?").length > 1)
        displayMenu = window.location.href.split("?")[1].split("=")[1];
    console.log(displayMenu)
    setTimeout(() => {selectMenu(displayMenu);}, index * 100 + 50);
}

export function selectMenu(name = menus[0], pushState = true) {
    menus.forEach(m => {document.getElementById("opts-"+m).style.color = "var(--color-grey)";});
    document.getElementById("opts-"+name).style.color = "var(--color-white)";
    document.title = "FurWaz - "+name;
    if (pushState)
        history.pushState({menu: name}, document.title, "?menu="+name);
}