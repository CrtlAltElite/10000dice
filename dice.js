


const rollDice=()=>{
    let screen_dice = document.getElementById('dice')
    removeDice(screen_dice)
    let dice = []
    for (let i = 0; i<5; i++){
        let die = Math.floor(Math.random()*6)+1 
        dice.push(die)
    }
    let my_dice = document.createElement('p')
    my_dice.innerText = `[${dice[0]}] [${dice[1]}] [${dice[2]}] [${dice[3]}] [${dice[4]}]`
    screen_dice.appendChild(my_dice)
    roundScore(dice)

}

const removeDice=(parent)=>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

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
    for (i = 0; i<5; i++){
        diceCount[dice[i]] += 1
    }
    for (const [key, value] of Object.entries(diceCount)){
        if (key == '1'){
            if (value >= 3){
                score += 1000
            }else{
                score += 100 * value
            }
        }else if (key == '5'){
            if (value >= 3){
                score += 500
            }else{
                score += 50 * value
            }
        }else if(value >= 3){
            score += parseInt(key) * 100

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
}

const reset=()=>{
    localStorage.setItem('score', 0)
}

