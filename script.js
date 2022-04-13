const startBtn = document.getElementById("start");
const scoreText = document.getElementById("score");
const moles = document.querySelectorAll(".mole");
const durationText = document.querySelector("#duration");
let previousMole;
let TimeExpired = false;
let score = 0;
let duration = 15;

startBtn.addEventListener("click", startGame);
moles.forEach((kostebek) => kostebek.addEventListener("click", peep));

function RandomMole() {
    const order = Math.floor(Math.random() * moles.length);
    const ChosenMole = moles[order];
    if(previousMole === ChosenMole) {
        return RandomMole();
    }else {
        previousMole = ChosenMole;
    }
    return ChosenMole;
}

function RandomDuration(min,max){
    const time = Math.round(Math.random() * (max - min)) + min ;
    return time;
}

function above () {
    const kostebek = RandomMole();
    const MoleDuration = RandomDuration(1000,1500);
    kostebek.classList.add("secilen");
    setTimeout(() => { 
        kostebek.classList.remove("secilen");
        if (!TimeExpired) {
            above();
        }
    }, MoleDuration);
}

function durationyiBaslat() {
    if (!TimeExpired) {
      duration--;
      durationText.textContent = duration;
    } else {
      durationText.textContent = "Time Expired";
    }
  }

  function startGame() {
    duration = 15;
    skor = 0;
    TimeExpired = false;
    const interval = setInterval(() => {
      durationyiBaslat();
      if (TimeExpired) clearInterval(interval);
    }, 1000);
    above();
    setTimeout(() => {
      TimeExpired = true;
    }, duration * 1000);
  }

function peep(e) {
    if (e.target.classList.contains("secilen")){
        score++;
        e.target.classList.remove("secilen");
    }
    scoreText.textContent = score;
}

