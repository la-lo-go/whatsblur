const PARENT_DIV = '#pane-side';
const CHILD_CLASSES = '.rx9719la';
const blurLevel = 5;

waitForElementToDisplay(PARENT_DIV, 10);

function waitForElementToDisplay(selector, time) {
    const element = document.querySelector(selector);

    if (element) {
        const node = element.parentNode;
        createObserver(node);
        routine();
    } else {
        setTimeout(function () {
            waitForElementToDisplay(selector, time);
        }, time);
    }
}

function createObserver(parentDiv) {
    const observer = new MutationObserver(() => {
        routine();
    });

    observer.observe(parentDiv, { childList: true, subtree: true });
}

function routine() {
    const divs = getDivs();

    blurDivs(divs);
    divs.forEach((div) => {
        addMouseEvents(div);
    });
}

function getDivs() {
    const parentDiv = document.querySelector(PARENT_DIV);
    return parentDiv.querySelectorAll(CHILD_CLASSES);
}

function blurDivs(divs) {
    divs.forEach((div) => {
        blurDiv(div);
    });
}

function blurDiv(div) {
    div.style.filter = `blur(${blurLevel}px)`;
}

function unblurDiv(div) {
    div.style.filter = 'none';
}

function addMouseEvents(div) {
    div.addEventListener('mouseover', () => {
        unblurDiv(div);
    });

    div.addEventListener('mouseout', () => {
        blurDiv(div);
    });
}
