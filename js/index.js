NodeList.prototype.indexOf = Array.prototype.indexOf;
const body = document.getElementsByTagName("body")[0];
const header = document.getElementsByTagName("header")[0];
const headerMenu = document.querySelectorAll("header>ul>li");
const logoCanvas = document.getElementById("logo3");
const logoCtx = logoCanvas.getContext("2d");
let logoVideo = []
let searchParams = new URLSearchParams(window.location.search);
let menuNumber = 0;
let slideNumber = 0;
const slideButton = document.getElementsByClassName("slide-button");
const slide = document.querySelector(".slide ul");
const slideLength = document.querySelectorAll(".slide ul>li").length;
header.addEventListener("click", (e) => {
    menuNumber = headerMenu.indexOf(e.target) + 1;
    if (menuNumber > 0) {
        window.scrollTo(0, logoCanvas.offsetHeight * menuNumber);
        searchParams.set("foo", "bar");
        if (window.location.href.includes("?page=")) {
            console.log(menuNumber)
            history.pushState(null, '', window.location.href.replace(/\?page=[0-9]/i, `?page=${menuNumber}`));
        } else {
            history.pushState(null, '', window.location.href + "?page=" + menuNumber.toString());
        }
    }
});
window.addEventListener("DOMContentLoaded", () => {
    for (let i = 1; i <= 100; i++) {
        logoVideo.push(new Image());
        logoVideo[i - 1].src = `./img/teambit5/${i.toString().padStart(4, "0")}.png`;
    }
    logoCtx.drawImage(logoVideo[0], 0, 0);
    body.classList.remove("loading");
    for (let i of document.getElementsByClassName("preload")) {
        i.classList.remove("preload");
    }
    window.scrollTo(0, 0);
    if (window.location.href.includes("?page=")) {
        menuNumber = Number(window.location.href[window.location.href.indexOf("?page=") + 6])
        window.scrollTo(0, logoCanvas.offsetHeight * menuNumber);
    }
    if (window.location.href.includes("&member=")) {
        slideNumber = Number(window.location.href.match(/member=[0-9]+/i)[0].slice(7));
        slide.style.transform = `translateX(${-1 * slideNumber * slide.offsetWidth / slideLength}px)`;
    }
    console.log("Hello, World!");
})
let fixed = true;
window.addEventListener("scroll", () => {
    if (window.scrollY < logoCanvas.offsetHeight) {
        if (!fixed) {
            logoCanvas.classList.remove("unfix");
            fixed = true;
        }
        logoCtx.drawImage(logoVideo[Math.floor(100 * window.scrollY / logoCanvas.offsetHeight)], 0, 0);
    } else if (fixed && window.scrollY > logoCanvas.offsetHeight) {
        logoCanvas.classList.add("unfix");
        fixed = false;
    }
})
slideButton[0].addEventListener("click", () => {
    if (slideNumber > 0) {
        slideNumber--;
        slide.style.transform = `translateX(${-1 * slideNumber * slide.offsetWidth / slideLength}px)`;
    }
    searchParams.set("foo", "bar");
    if (window.location.href.includes("&member=")) {
        history.pushState(null, '', window.location.href.replace(/\?page=[0-9]\&member=[0-9]+/i, `?page=2&member=${slideNumber}`));
    } else if (window.location.href.includes("?page=")) {
        history.pushState(null, '', window.location.href.replace(/\?page=[0-9]/i, `?page=2&member=${slideNumber}`));
    } else {
        history.pushState(null, '', window.location.href + `?page=2&member=${slideNumber}`)
    }
});
slideButton[1].addEventListener("click", () => {
    if (slideNumber < slideLength - 3) {
        slideNumber++;
        slide.style.transform = `translateX(${-1 * slideNumber * slide.offsetWidth / slideLength}px)`;
    }
    searchParams.set("foo", "bar");
    if (window.location.href.includes("&member=")) {
        history.pushState(null, '', window.location.href.replace(/\?page=[0-9]\&member=[0-9]+/i, `?page=2&member=${slideNumber}`));
    } else if (window.location.href.includes("?page=")) {
        history.pushState(null, '', window.location.href.replace(/\?page=[0-9]/i, `?page=2&member=${slideNumber}`));
    } else {
        history.pushState(null, '', window.location.href + `?page=2&member=${slideNumber}`)
    }
});
const menuButton = document.getElementById("menu-icon");
let menuOpened = true;
menuButton.addEventListener("click", () => {
    if (menuOpened) {
        header.classList.remove("opened");
        menuOpened = false;
    } else {
        header.classList.add("opened");
        menuOpened = true;
    }
});
