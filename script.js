const tomato = document.getElementById("tomato");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let popBuffer;

async function loadSound() {
    const response = await fetch("pop.mp3");
    const arrayBuffer = await response.arrayBuffer();
    popBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

loadSound();

document.addEventListener("pointerdown", () => {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}, { once: true });


function playSound() {
    if (!popBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = popBuffer;

    source.connect(audioContext.destination);
    source.start(0);
}


function press() {
    tomato.classList.add("pressed");
    playSound();
}


function release() {
    tomato.classList.remove("pressed");
}

tomato.addEventListener("pointerdown", press);
tomato.addEventListener("pointerup", release);
tomato.addEventListener("pointerleave", release);
tomato.addEventListener("pointercancel", release);