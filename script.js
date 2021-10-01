import { generateCodeLines, selectMenu, menus, InitHeader } from "./script/header.js";
import { setupDatabase } from "./script/firebase.js";
import { getEncrypted, isEncryptionReady } from "./script/encrypt.js";
import { setupAccount } from "./script/account.js";

window.onload = () => {
    generateCodeLines();
    InitHeader(document.getElementById("options-container"));
    setupDatabase();
    let it = setInterval(() => {
        if (!isEncryptionReady()) return;
        setupAccount();
        clearInterval(it);
    }, 100);
}