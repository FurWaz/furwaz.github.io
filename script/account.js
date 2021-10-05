import { COLOR } from "./colors.js";
const EMAIL_REGEX = /[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;

export function setupAccount() {
    document.getElementById("account-btn").onclick = toogleAccountPanel;
    document.getElementById("btn-switch").onclick = switchlogType;
    accountPanel.div = document.getElementById("account-panel");
    document.getElementById("btn-validate").onclick = validateAccount;
}

let accountPanel = {
    open: false,
    loginPage: true,
    div: null
};

function toogleAccountPanel() {
    if (accountPanel.open) { // close the panel
        accountPanel.div.style.animation = "fade-out-left 200ms ease forwards";
        setTimeout(() => {
            accountPanel.div.style.display = "none";
        }, 500);
    } else { // open the panel
        accountPanel.div.style.display = "block";
        accountPanel.div.style.animation = "fade-in-left 200ms ease forwards";
    }
    accountPanel.open = !accountPanel.open;
}

function switchlogType() {
    let plusDivs1 = document.getElementById("account-plus1");
    let plusDivs2 = document.getElementById("account-plus2");
    if (accountPanel.loginPage) { // switch to register
            plusDivs1.style.display = "block";
            plusDivs2.style.display = "block";
            setTimeout(() => {
                plusDivs1.style.maxHeight = "75px";
                plusDivs2.style.maxHeight = "75px";
                plusDivs1.style.opacity = "1";
                plusDivs2.style.opacity = "1";
            }, 10);
    } else { // switch to login
            plusDivs1.style.maxHeight = "0px";
            plusDivs2.style.maxHeight = "0px";
            plusDivs1.style.opacity = "0";
            plusDivs2.style.opacity = "0";
            setTimeout(() => {
                plusDivs1.style.display = "none";
                plusDivs2.style.display = "none";
            }, 500);
    }
    accountPanel.loginPage = !accountPanel.loginPage;
    document.getElementById("btn-switch").value = accountPanel.loginPage? "Register": "Login";
}

let logTimeout = -1;
function logInfo(text="Log info", color=COLOR.WHITE) {
    let info = document.getElementById("account-logger");
    info.innerHTML = text;
    info.style.maxHeight = "20px";
    info.style.color = color;
    if (logTimeout != -1)
        clearTimeout(logTimeout);
    logTimeout = setTimeout(() => {
        info.style.maxHeight = "0px";
        logTimeout = -1;
    }, 2000);
}
function clearInfo() {
    if (logTimeout != -1) {
        clearTimeout(logTimeout);
        info.style.maxHeight = "0px";
        logTimeout = -1;
    }
}

function validateAccount() {
    let input_pseudo = document.getElementById("pseudo-input");
    let input_email = document.getElementById("email-input");
    let input_pswd = document.getElementById("password-input");
    let input_pswd2 = document.getElementById("password2-input");

    /* ACCOUNT FIELDS CHECKING */
    if (input_pseudo.value.length < 3)
        return logInfo("The pseudo is too short", COLOR.RED);
    if (input_pswd.value.length < 5)
        return logInfo("The password is too short", COLOR.RED);
    if (!accountPanel.loginPage) { // register page
        if (!input_email.value.match(EMAIL_REGEX))
            return logInfo("The email is not valid", COLOR.RED);
        if (input_pswd.value != input_pswd2.value)
            return logInfo("The two passwords doesn't match", COLOR.RED);
    }

    /* ACCOUNT LOGIN */
    if (accountPanel.loginPage) {
        logInfo("Connecting to database ...", COLOR.YELLOW);
        onValue(ref(database, "/accounts/"), v => {
            logInfo("Got userbase", COLOR.GREEN);
            let val = v.val();
            let userInfo = {exists: false, pwd: "", username: "", email: ""};
            val.forEach(el => {
                console.log(el);
            });
        });
    }
    /* ACCOUNT REGISTRATION */
    else {

    }
}