let pandownContent = ``;
let hitrn = 0;
let score = 0;
let hiscore = localStorage.getItem('hiscore') || 0;

const saveHighScore = (hs, s) => {
    if (s > hs) {
        return s;
    }
    return hs;
};

const makeBubbles = () => {
    pandownContent = ``;
    for (let i = 1; i <= 168; i++) {
        let rn = Math.floor(Math.random() * 10);
        // console.log(rn);
        pandownContent += `<div class="bubble">${rn}</div>`
        document.querySelector('#pandown').innerHTML = pandownContent;
    }
}

let timer = 60;
const runTimer = () => {

    let timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.querySelector('#timerVal').innerHTML = timer;
        }
        else {
            clearInterval(timerInterval);

            // setting up the high score
            hiscore = saveHighScore(hiscore, score);
            localStorage.setItem('hiscore', hiscore);

            pandownContent = `
                        <div class="container-inner">
                            <div class="content">
                            <p>Game Over!<br>Your score - ${score}<br><b>High Score - ${hiscore}</b>
                            </p>
                            </div>
                            <div class="buttons">
                                <button type="button" class="restart">Restart</button>
                                <button type="button" class="cancel">Cancel</button>
                            </div>
                        </div>
                `;
            document.querySelector('#pandown').innerHTML = pandownContent;


            document.querySelector('.restart').addEventListener('click', () => {
                // location = location.href
                location.reload();
            })
            document.querySelector('.cancel').addEventListener('click', () => {
                document.querySelector('#pandown').innerHTML = '<h1>Game Over</h1>';
            })
        }
    }, 1000);


}

const getHit = () => {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector('#hitVal').innerHTML = hitrn;
}

const increaseScore = () => {
    score += 10;
    document.querySelector('#scoreVal').innerHTML = score;
}

document.querySelector('#pandown').addEventListener('click', (details) => {
    let clickedVal = Number(details.target.textContent);
    // console.log(clickedVal);
    if (hitrn === clickedVal) {
        increaseScore();
        makeBubbles();
        getHit();
    }
    else {
        if (score > 0 && timer > 0) {
            score -= 5;
            document.querySelector('#scoreVal').innerHTML = score;
        }
    }
})



makeBubbles();
runTimer();
getHit();
