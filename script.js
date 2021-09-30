let menus = ["home", "projects", "about"];

window.onload = () => {
    generateCodeLines();
    selectMenu(menus[0]);
}

function generateCodeLines() {
    let colors = ["var(--color-white)", "var(--color-red)", "var(--color-yellow)", "var(--color-green)", "var(--color-grey)"];
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

function selectMenu(name = menus[0]) {
    menus.forEach(m => {document.getElementById("opts-"+m).style.color = "var(--color-grey)";});
    document.getElementById("opts-"+name).style.color = "var(--color-white)";
}