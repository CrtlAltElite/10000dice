


const rollDice=()=>{
    let screen_dice = document.getElementById('dice')
    removeDice(screen_dice)
    let dice = []
    for (let i = 0; i<6; i++){
        let die = Math.floor(Math.random()*6)+1 
        dice.push(die)
    }
    let my_dice = document.createElement('p')
    my_dice.innerHTML = `<span class="a-dice"><img src="./images/d-${dice[0]}.svg"></span><span class="a-dice"><img src="./images/d-${dice[1]}.svg"></span><span class="a-dice"><img src="./images/d-${dice[2]}.svg"></span><span class="a-dice"><img src="./images/d-${dice[3]}.svg"></span><span class="a-dice"><img src="./images/d-${dice[4]}.svg"></span><span class="a-dice"><img src="./images/d-${dice[5]}.svg"></span>`
    screen_dice.appendChild(my_dice)
    roundScore(dice)

}

const removeDice=(parent)=>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

const isStraight = obj => Object.values(obj).every(val => val === 1);

const roundScore=(dice)=>{
    let screen_score = document.getElementById('round')
    removeDice(screen_score)
    let diceCount = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
    }
    let score = 0
    for (i = 0; i<6; i++){
        diceCount[dice[i]] += 1
    }
    if(isStraight(diceCount)){
        score+=1500
    }else{

        
        for (const [key, value] of Object.entries(diceCount)){
            if (key == '1'){
                if (value >= 3 && value<6){
                    score += 1000
                }else if (value===6){
                    score += 2000
                }
                score+= value % 3 * 100
            }else if (key == '5'){
                if (value >= 3 && value<6){
                    score += 500
                }else if (value===6){
                    score +=1000
                }
                score+= value % 3 * 50
                
            }else if(value >= 3){
                if (value >= 3 && value<6){
                    score += parseInt(key) * 100
                }else if (value==6){
                    score += parseInt(key) * 200
                }

            }
        }
    }

    let rollScore = document.createElement('h4')
    rollScore.innerText = `${score}`
    screen_score.appendChild(rollScore)

    total(score)
}


const total=(score)=>{
    let myScore = JSON.parse(localStorage.getItem('score')) ?? 0
    console.log(score)
    console.log(myScore)
    let screen_total = document.getElementById('total')
    removeDice(screen_total)
    score += myScore
    localStorage.setItem('score', JSON.stringify(score))
    let thisTotal = JSON.parse(localStorage.getItem('score')) ?? 0

    let totalScore = document.createElement('h4')
    totalScore.innerText = `${thisTotal}`
    screen_total.appendChild(totalScore)
    if (myScore >= 10000){
        document.getElementById("canvas").style.display="block"
        document.getElementById("win").style.display="block"
        setTimeout(reset,5000)
    }
}

const reset=()=>{
    let round_total = document.getElementById('round')
    round_total.innerText=""
    let totalScore = document.getElementById('total')
    totalScore.innerText=""
    let screen_dice = document.getElementById('dice')
    removeDice(screen_dice)
    document.getElementById("win").style.display="none"

    document.getElementById("canvas").style.display="none"

    localStorage.setItem('score', 0)
}



//Win Screen stolen from codepen

let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
Draw();