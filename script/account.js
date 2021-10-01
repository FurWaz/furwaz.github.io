export function setupAccount() {
    document.getElementById("account-btn").onclick = toogleAccountPanel;
    document.getElementById("btn-switch").onclick = switchlogType;
    accountPanel.div = document.getElementById("account-panel");
}

let accountPanel = {
    open: false,
    loginPage: true,
    div: null
};

function toogleAccountPanel() {
    if (accountPanel.open) { // close the panel
        accountPanel.div.style.animation = "fade-out-left 200ms ease forwards";
    } else { // open the panel
        accountPanel.div.style.animation = "fade-in-left 200ms ease forwards";
    }
    accountPanel.open = !accountPanel.open;
}

function switchlogType() {
    let plusDivs1 = document.getElementById("account-plus1");
    let plusDivs2 = document.getElementById("account-plus2");
    if (accountPanel.loginPage) { // switch to register
            plusDivs1.style.maxHeight = "75px";
            plusDivs2.style.maxHeight = "75px";
            plusDivs1.style.opacity = "1";
            plusDivs2.style.opacity = "1";
    } else { // switch to login
            plusDivs1.style.maxHeight = "0px";
            plusDivs2.style.maxHeight = "0px";
            plusDivs1.style.opacity = "0";
            plusDivs2.style.opacity = "0";
    }
    accountPanel.loginPage = !accountPanel.loginPage;
    document.getElementById("btn-switch").value = accountPanel.loginPage? "Register": "Login";
}