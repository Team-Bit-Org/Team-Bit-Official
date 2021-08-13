NodeList.prototype.indexOf = Array.prototype.indexOf;
const body = document.getElementsByTagName("body")[0];
const header = document.getElementsByTagName("header")[0];
const headerMenu = document.querySelectorAll("header>ul>li");
const logoCanvas = document.getElementById("logo3");
const logoCtx = logoCanvas.getContext("2d");
let logoVideo = []
header.addEventListener("click", (e) => {
    let menuNumber = headerMenu.indexOf(e.target);
    if (menuNumber > 0) {
        window.scrollTo(0, logoCanvas.offsetHeight * menuNumber);
        let searchParams = new URLSearchParams(window.location.search);
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
        window.scrollTo(0, logoCanvas.offsetHeight * Number(window.location.href[window.location.href.indexOf("?page=") + 6]));
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
