/*
    @author: FurWaz
*/
var helloWorld = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.";
var cursorBounds = {min: 5, max: 94}
var cases = [];
/**@type {HTMLDivElement} */
var codeZone = null;
/**@type {HTMLDivElement} */
var resultZone = null;
/**@type {HTMLDivElement} */
var collection = null;
/**@type {HTMLDivElement} */
var colorizer = null;
/**@type {HTMLDivElement} */
var cursor = null;
var cursorIndex = 0;
var spaceLeft = 0;

var compiledCode = "";
var charIndex = 0;
var codeDone = false;
var codeDT = 0;
var opPerSecond = 6;
var scriptBlocked = false;

window.onload = () => {
    collection = document.getElementById("case-collection");
    cursor = document.getElementById("cursor");
    codeZone = document.getElementById("code-zone");
    colorizer = document.getElementById("colorizer");
    resultZone = document.getElementById("result-zone");
    var opPerSec = document.getElementById("opPerSec");
    opPerSec.onkeyup = ev => {
        var val = parseInt(opPerSec.value);
        if (!isNaN(val)) {
            val = clamp(val, 1, 100)
            setOpPerSec(val);
            opPerSec.value = val;
        }
    };
    opPerSec.onkeyup();

    codeZone.onkeydown = ev => {
        switch (ev.key) {
            case "[":
                if (codeZone.selectionStart == codeZone.selectionEnd) {
                    setTimeout(() => {
                        var start = codeZone.selectionStart;
                        codeZone.value = 
                        codeZone.value.substring(0, codeZone.selectionStart) + "]" +
                        codeZone.value.substring(codeZone.selectionStart, codeZone.value.length);
                        codeZone.selectionStart = start;
                        codeZone.selectionEnd = start;
                    }, 5);
                } else {
                    var selectedText = codeZone.value.substring(codeZone.selectionStart, codeZone.selectionEnd);
                    var start = codeZone.selectionStart;
                    var end = codeZone.selectionEnd;
                    setTimeout(() => {
                        codeZone.value = 
                        codeZone.value.substring(0, codeZone.selectionStart) + selectedText + "]" +
                        codeZone.value.substring(codeZone.selectionEnd, codeZone.value.length);
                        codeZone.selectionStart = start+1;
                        codeZone.selectionEnd = end+1;
                    }, 5);
                }
                break;
            case "]":
                if (codeZone.value.charAt(codeZone.selectionEnd) == "]")
                setTimeout(() => {
                    var start = codeZone.selectionEnd;
                    codeZone.value = 
                    codeZone.value.substring(0, codeZone.selectionEnd) +
                    codeZone.value.substring(codeZone.selectionEnd+1, codeZone.value.length);
                    codeZone.selectionEnd = start;
                }, 5);
                break;
            default:
                break;
        }
        setTimeout(() => {
            colorizer.innerHTML = colorizeCode(codeZone.value);
        }, 5);
    };

    codeZone.value = helloWorld;

    addNewCase();
    updateCursorPos();
    setInterval(gameloop, 10);
}

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

function setOpPerSec(nbr) {
    opPerSecond = nbr;
}

function Case() {
    this.div = document.createElement("div");
    this.div.classList.add("case");
    this.p = document.createElement("p");
    this.p.classList.add("case");
    this.div.appendChild(this.p);
    this.value = 0;
    this.updateValue = () => {
        this.p.innerHTML = this.value;
    }
    this.setValue = val => {
        this.value = val;
        this.updateValue();
    }
    this.increment = () => {
        this.value++;
        cursor.style.transform = "translateY(-10px) rotate(-90deg)";
        this.p.style.transform = "translateY(-10px)";
        setTimeout(() => {
            cursor.style.transform = "translateY(0px) rotate(-90deg)";
            this.p.style.transform = "translateY(0px)";
        }, 100);
        this.updateValue();
    }
    this.decrement = () => {
        this.value--;
        cursor.style.transform = "translateY(10px) rotate(-90deg)";
        this.p.style.transform = "translateY(10px)";
        setTimeout(() => {
            cursor.style.transform = "translateY(0px) rotate(-90deg)";
            this.p.style.transform = "translateY(0px)";
        }, 100);
        this.updateValue();
    }

    this.updateValue();
}

function addNewCase() {
    var newCase = new Case();
    cases.push(newCase);
    collection.appendChild(newCase.div);
}

function moveCursorRight() {
    cursorIndex++;
    for (let i = cases.length-1; i < cursorIndex; i++) {
        addNewCase();
    }
}
function moveCursorLeft() {
    if (cursorIndex > 0) cursorIndex--;
}

function updateCursorPos() {
    var sizeX = collection.getBoundingClientRect().width;
    var curCell = collection.children.item(cursorIndex);
    if (curCell == null) return
    var cellDims = curCell.getBoundingClientRect();
    var cellCenter = (cellDims.x+cellDims.width/2);
    var pos = (cellCenter/sizeX)*(cursorBounds.max-cursorBounds.min);
    var screenCenter = document.body.getBoundingClientRect().width/2;
    spaceLeft -= (cellCenter-screenCenter)/6;
    if (spaceLeft > 0) {
        collection.style.paddingLeft = spaceLeft+"px";
        collection.style.paddingRight = "0px";
    }
    if (spaceLeft < 0) {
        collection.style.paddingRight = (-spaceLeft)+"px";
        collection.style.paddingLeft = "0px";
    }
    cursor.style.marginLeft = pos+"vw";
}

function gameloop() {
    updateCursorPos();
    if (!codeDone && !scriptBlocked) {
        codeDT += 10;
        if (codeDT >= 1000/opPerSecond) {
            if (charIndex >= compiledCode.length) {
                highlightChar(-1);
                codeDone = true;
            } else {
                highlightChar(charIndex);
                executeOperation(compiledCode[charIndex++]);
            }
            codeDT = 0;
        }
    }
    codeZone.selectionStart +" | "+ codeZone.selectionEnd
}

function compileCode() {
    compiledCode = codeZone.value;
    charIndex = 0;
    codeDone = false;
}

function executeOperation(op) {
    switch (op) {
        case ">":
            moveCursorRight();
            break;
        case "<":
            moveCursorLeft();
            break;
        case "-":
            cases[cursorIndex].decrement();
            break;
        case "+":
            cases[cursorIndex].increment();
            break;
        case ".":
            outputValue();
            break;
        case ",":
            inputValue();
            break;
        case "[":
            beginBrackets();
            break;
        case "]":
            endBrackets();
            break;
        default:
            break;
    }
}

function reset() {
    scriptBlocked = false;
    codeDone = true;
    charIndex = 0;
    cases = [];
    while (collection.firstChild)
        collection.firstChild.remove();
    cursorIndex = 0;
    resultZone.value = "";
    colorizer.innerHTML = colorizeCode(codeZone.value);
    addNewCase();
}

function highlightChar(index) {
    if (index < 0) colorizer.innerHTML = colorizeCode(codeZone.value);
    else {
        colorizer.innerHTML = 
        colorizeCode(codeZone.value.substring(0, index)) +
        "<span class='spantxt'>" + codeZone.value.charAt(index) + "</span>" +
        colorizeCode(codeZone.value.substring(index+1, codeZone.value.length));
    }
}

function outputValue() {
    resultZone.value += String.fromCharCode(cases[cursorIndex].value);
}

function inputValue() {
    scriptBlocked = true;
    var inputPopup = document.getElementById("input-popup");
    var inputZone = document.getElementById("input-zone");

    inputPopup.style.pointerEvents = "all";
    inputPopup.style.transform = "scale(1)";
    inputZone.focus();
    inputZone.onkeydown = ev => {
        if (ev.key == "Enter") {
            inputPopup.style.transform = "scale(0)";
            inputPopup.style.pointerEvents = "none";
            var val = parseInt(inputZone.value);
            if (isNaN(val))
                try {
                    val = inputZone.value.charCodeAt(0);
                } catch (e) {val = 0}
            while (cases[cursorIndex].value < val)
                cases[cursorIndex].increment();
            while (cases[cursorIndex].value > val)
                cases[cursorIndex].decrement();
            scriptBlocked = false;
        }
    };
}

function beginBrackets() {
    if (cases[cursorIndex].value == 0) {
        scriptBlocked = true;
        while (compiledCode.charAt(++charIndex) != "]");
        scriptBlocked = false;
    }
}

function endBrackets() {
    if (cases[cursorIndex].value != 0) {
        scriptBlocked = true;
        while (compiledCode.charAt(--charIndex) != "[");
        scriptBlocked = false;
    }
}

function colorizeCode(code) {
    var coloredCode = "";
    for (let i = 0; i < code.length; i++) {
        const l = code.charAt(i);
        let chunk = "";
        switch (l) {
            case "+":
                chunk = span(l, "green");
                break;
            case "-":
                chunk = span(l, "red");
                break;
            case ",":
            case ".":
                chunk = span(l, "purple");
                break;
            case "[":
            case "]":
                chunk = span(l, "orange");
                break;
            case ">":
            case "<":
                chunk = span(l, "yellow");
                break;
        
            default:
                chunk = span(l);
                break;
        }
        coloredCode += chunk;
    }
    return coloredCode;
}

function span(text, color) {
    if (color == null)
        return "<span style='color: var(--color-white); background-color: var(--color-red);'>"+text+"</span>";
    else
        return "<span style='color: var(--color-"+color+");'>"+text+"</span>";
}