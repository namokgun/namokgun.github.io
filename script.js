const tomato = document.getElementById("tomato");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let popBuffer;


// 효과음 불러오기
async function loadSound() {
    const response = await fetch("pop.mp3");
    const arrayBuffer = await response.arrayBuffer();
    popBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

loadSound();


// 첫 터치 시 오디오 활성화
document.addEventListener("pointerdown", async () => {
    if (audioContext.state === "suspended") {
        await audioContext.resume();
    }
}, { once: true });


// 효과음 재생
function playSound() {
    if (!popBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = popBuffer;
    source.connect(audioContext.destination);
    source.start();
}


// 누를 때
function press(e) {
    e.preventDefault();

    tomato.classList.add("pressed");
    playSound();
}


// 뗄 때
function release(e) {
    e.preventDefault();

    tomato.classList.remove("pressed");
}


// 이벤트 등록
tomato.addEventListener("pointerdown", press);
tomato.addEventListener("pointerup", release);
tomato.addEventListener("pointerleave", release);
tomato.addEventListener("pointercancel", release);


// 드래그, 우클릭 방지
tomato.addEventListener("dragstart", e => e.preventDefault());
tomato.addEventListener("contextmenu", e => e.preventDefault());


// 화면 스크롤 방지
document.addEventListener("touchmove", e => {
    e.preventDefault();
}, { passive: false });


// iPhone 제스처(핀치 줌) 방지
document.addEventListener("gesturestart", e => e.preventDefault());
document.addEventListener("gesturechange", e => e.preventDefault());
document.addEventListener("gestureend", e => e.preventDefault());