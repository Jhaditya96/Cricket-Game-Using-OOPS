import { Cricket } from './Logic';

let generateTable = (teamName: string): HTMLTableElement => {
    let teamtable = <HTMLTableElement>document.createElement('table');
    teamtable.classList.add('table', 'table-bordered');

    let header = tableHeader(teamName);
    let tbody = createTable(teamName);
    teamtable.append( header, tbody);
    return teamtable;
}

let createTable = (team: string) => {
    let tableBody = document.createElement('tbody');

    for (let i = 1; i <= 10; i++) {
        let row = ScoreBody(i, team);
        tableBody.append(row);
    }
    return tableBody;
}

let ScoreBody = (index: number, team: string): HTMLTableRowElement => {
    let tr = <HTMLTableRowElement>document.createElement('tr');

    for (let i = 0; i < 8; i++) {
        let tag = (i == 0) ? 'th' : 'td';
        let cell = <HTMLTableCellElement>document.createElement(tag);

        if (tag == 'th') cell.scope = "row";
        if (i == 0) cell.innerText = 'Player ' + index;
        else cell.innerHTML = `<span id="${team + (index - 1).toString() + (i - 1).toString()}"></span>`;

        tr.append(cell);
    }
    return tr;
}

let tableHeader = (teamName: string): HTMLTableSectionElement => {
    let theader = <HTMLTableSectionElement>document.createElement('thead');
    let tr = <HTMLTableRowElement>document.createElement('tr');
    let scope = 'col';

    for (let i = 0; i < 8; i++) {
        let th = <HTMLTableHeaderCellElement>document.createElement('th');
        th.scope = scope;
        if (i == 0) th.innerText = teamName;
        else if (i == 7) th.innerText = 'TOTAL'
        else th.innerText = 'B' + i;
        tr.append(th);
    }

    theader.append(tr);
    return theader;
}
let battedteam = false

let startTimer = (timer: HTMLParagraphElement, player: string) => {
    alert(`${player} get ready to play`);

    let seconds: number = 60;
    let setTimer = setInterval(() => {
        if (seconds < 0 || battedteam) {
            battedteam = false;
            clearInterval(setTimer);
            if (player !== 'Player 2') {
                (<HTMLButtonElement>document.getElementById('team1')).disabled = true;
                (<HTMLButtonElement>document.getElementById('team2')).disabled = false
                startTimer(timer, 'Player 2');

            }
            else {
                clearTimer();
                alert('Both player played....')
            }
        }

        (seconds != -1) ? timer.innerText = seconds.toString() : '';
        seconds--;
    }, 1000);
};

let clearTimer = () => {
    (<HTMLButtonElement>document.getElementById('team2')).disabled = true;
    resultButton.disabled = false;
}

let Scoregeneater = () => {
    return Math.floor(Math.random() * (7 - 0) + 0);
}

let analyseResult = () => {
    let winner = match.chennai.teamScore > match.mumbai.teamScore ? match.chennai : match.mumbai;
    let winnerName = winner.name.toUpperCase();
    matchScores.innerHTML = `Match Won By <p> ${winnerName} </p>`;
    bestPlayer.innerHTML = `Man Of The Match <p>by ${winner.maxScore.player}</p> <p>${winnerName}</p> <p> Score :${winner.maxScore.score}</p>`;
}

let contentConverter = () => {
    matchScores.innerText = 'Match Won By';
    bestPlayer.innerHTML = `Man Of The Match `;
}

let strtButton = <HTMLButtonElement>document.getElementById('start');
let timer = <HTMLDivElement>document.getElementsByClassName('timer')[0];
let resultButton = (<HTMLButtonElement>document.getElementsByClassName('result')[0]);
let team1 = (<HTMLButtonElement>document.getElementById('team1'));
let team2 = (<HTMLButtonElement>document.getElementById('team2'));
let Scoreteam1 = (<HTMLDivElement>document.getElementById('team-1-score'));
let Scoreteam2 = (<HTMLDivElement>document.getElementById('team-2-score'));
let matchScores = (<HTMLParagraphElement>document.getElementsByClassName('match-scores')[0])
let bestPlayer = (<HTMLParagraphElement>document.getElementsByClassName('bestPlayer')[0]);

strtButton.addEventListener('click', (element) => {
    strtButton.classList.add('none');
    timer.classList.remove('none');
    startTimer(timer.querySelector('p'), 'Player 1');
    (<HTMLButtonElement>document.getElementById('team1')).disabled = false
    contentConverter();
    if ((<HTMLDivElement>document.getElementsByClassName('scoreBoard-1')[0]).children.length) {
        createPlayBaord();
    }
});

resultButton.addEventListener('click', () => {
    timer.classList.add('none');
    strtButton.classList.remove('none');
    analyseResult();
    resultButton.disabled = true;
});

team1.addEventListener('click', () => {
    let score = Scoregeneater();
    let isValid = match.chennai.updateTeamScore(score);
    Scoreteam1.innerText = match.chennai.teamScore.toString();
    if (!isValid)
        battedteam = true;
})

team2.addEventListener('click', () => {
    let score = Scoregeneater();
    let isValid = match.mumbai.updateTeamScore(score);
    Scoreteam2.innerText = match.mumbai.teamScore.toString();
    if (!isValid) battedteam = true;
})

let createPlayBaord = () => {
    let table1 = generateTable('Team 1');
    let t1 = (<HTMLDivElement>document.getElementsByClassName('scoreBoard-1')[0]);
    while (t1.children.length) t1.removeChild(t1.firstElementChild)
    t1.append(table1);

    let table2 = generateTable('Team 2');
    let t2 = (<HTMLDivElement>document.getElementsByClassName('scoreBoard-2')[0]);
    while (t2.children.length) t2.removeChild(t2.firstElementChild)

    t2.append(table2);
    match = new Cricket()
}
createPlayBaord();
let match = new Cricket();