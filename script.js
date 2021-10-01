import { generateCodeLines, selectMenu, menus, InitHeader } from "./script/header.js";

window.onload = () => {
    generateCodeLines();
    InitHeader(document.getElementById("options-container"));
}