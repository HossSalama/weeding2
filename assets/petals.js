// ===== بتلات الورد المتساقطة =====

let petalsInterval = null;

function createPetal(){

    const petal = document.createElement("div");
    petal.classList.add("petal");

    const size = Math.random() * 8 + 12;

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.width = size + "px";
    petal.style.height = size + "px";
    petal.style.opacity = Math.random() * 0.5 + 0.35;
    petal.style.animationDuration = (Math.random() * 5 + 7) + "s";

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 13000);
}

window.startPetals = function(){
    if (petalsInterval) return;
    petalsInterval = setInterval(createPetal, 700);
};
