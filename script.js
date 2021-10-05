import { generateCodeLines, InitHeader } from "./script/header.js";

window.onload = () => {
    generateCodeLines();
    InitHeader(document.getElementById("options-container"));
}