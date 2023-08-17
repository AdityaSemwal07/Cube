const cont = document.getElementById("cont");
const block = document.getElementById("block");
const n = document.getElementById("n");
const r = document.getElementById("r");
const b = document.getElementById("b");
const p = document.getElementById("p");
const view = document.getElementById("view");
var x = 0, y = 0, x1 = 0, x2 = 0, y1 = 0, y2 = 0;
var md1 = 0, md2 = 0;
var chunk = 3;
var perspective = true;

function correction(){
    x = Math.round(x/chunk)*chunk;
    y = Math.round(y/chunk)*chunk;
    block.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
    x1 = x2;
    y1 = y2;
}

b.addEventListener("click", () => {
    view.style.opacity = "0%";
    if (perspective){
        b.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><defs><style>.cls-1,.cls-2{fill:none;stroke:%23000;stroke-miterlimit:10;}.cls-2{stroke-width:1.3px;}</style></defs><title>icons</title><polygon class="cls-1" points="18.5 17.03 13.5 21.39 8.5 17.03 8.5 9.42 13.5 6.61 18.5 9.42 18.5 17.03"/><polyline class="cls-1" points="8.44 9.31 13.5 13 13.5 21"/><line class="cls-1" x1="18.53" y1="9.42" x2="13.47" y2="13"/><line class="cls-2" x1="14" y1="21" x2="22.5" y2="13.5"/><line class="cls-2" x1="13" y1="21" x2="5" y2="14"/></svg>')`;
        cont.style.perspective = "999999px";
        p.style.width = "15.5ch";
        setTimeout(() => {
            view.innerHTML = "Perspective View";
        }, 150);
        perspective = false;
    }
    else{
        b.style.backgroundImage = "";
        cont.style = "";
        p.style = "";
        setTimeout(() => {
            view.innerHTML = "Flat View";
        }, 150);
        perspective = true;
    }
    setTimeout(() => view.style = "", 150);
    correction();
});

n.addEventListener("click", (e) => {
    e.preventDefault();
    setTimeout(() => {
        n.select();
    }, 1);
});

n.addEventListener("keydown", (e) => {
    if (e.keyCode >= 37 && e.keyCode <= 40){
        e.preventDefault();
    }
    if (e.keyCode == 38){
        if (chunk < 6){
            chunk += 1;
            n.value = chunk;
            r.value = chunk;
        }
    }
    else if (e.keyCode == 40){
        if (chunk > 1){
            chunk -= 1;
            n.value = chunk;
            r.value = chunk;
        }
    }
    correction();
    n.select();
});

n.addEventListener("input", () => {
    if (n.value < 1 & n.value.length != 0){
        n.value = 1;
    }
    if (n.value > 6){
        n.value = 6;
    }
    if (n.value.length > 0){
        if (isNaN(n.value)){
            n.value = chunk;
        }
        else{
            r.value = n.value;
            chunk = n.value;
        }
    }
    correction();
    n.select();
});

n.addEventListener("change", () => {
    if (n.value.length == 0){
        n.value = chunk;
    }
    correction();
});

r.addEventListener("input", () => {
    chunk = parseInt(r.value);
    n.value = chunk;
    correction();
});

function mdts(e){
    if (e.touches){
        x1 = Math.round(e.touches[0].clientX/chunk);
        y1 = Math.round(e.touches[0].clientY/chunk);
    }
    else{
        x1 = Math.round(e.clientX/chunk);
        y1 = Math.round(e.clientY/chunk);
    }
    md1= 1;
}

function mmtm(e){
    roundY = Math.round(80/chunk)*chunk;
    if (md1== 1){
        if (e.touches){
            x2 = Math.round(e.touches[0].clientX/chunk);
            y2 = Math.round(e.touches[0].clientY/chunk);
        }
        else{
            x2 = Math.round(e.clientX/chunk);
            y2 = Math.round(e.clientY/chunk);
        }
        x += (x2-x1)*chunk;
        y += (y2-y1)*chunk;
        if (x >= 360 | x <= -360 | y >= roundY | y <= -roundY){
            if (x >= 360 | x <= -360){
                x = 0;
            }
            if (y >= roundY){
                y = roundY;
            }
            if (y <= -roundY){
                y = -roundY;
            }
        }
        block.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
        x1 = x2;
        y1 = y2;
    }
}

cont.addEventListener("mousedown", (e) => {
    mdts(e);
});
cont.addEventListener("touchstart", (e) => {
    mdts(e);
});

cont.addEventListener("mousemove", (e) => {
    mmtm(e);
});
cont.addEventListener("touchmove", (e) => {
    mmtm(e);
});

document.addEventListener("mouseup", () => md1 = 0);
document.addEventListener("touchend", () => md1 = 0);