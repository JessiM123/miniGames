const alphabet = "ABCDEFGHIJKLMNOPRSTUWZ".split("");
function _randomBuchstabe() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

class Game {
    constructor(name, img, description) {
        this.name = name;
        this.img = img;
        this.description = description;
    }

    _render() {
        document.getElementById("cardImg").src = this.img;
        document.getElementById("cardName").textContent = this.name;
        document.getElementById("cardDescription").innerHTML = this.description;
    }

    start() {
        console.log("Game started");
        card.classList.remove("clickable");
        card.replaceWith(card.cloneNode(true)); // entfernt alle Listener
        this._render()
    }
}
class WordRoulette extends Game {
    minWordLength = Math.ceil(3)
    maxWordLength = Math.floor(5)
    constructor() {
        super("Buchstaben-Roulette",
            "ressources/wordRoulette.png",
            "Ihr spielt Buchstaben-Roulette"
        );
    }

    start() {
        const randomLetter = _randomBuchstabe()
        const randomNumber = Math.floor(Math.random() * (this.maxWordLength - this.minWordLength + 1) + this.minWordLength)
        this.description =
            `Finde ein <b>${randomNumber}-Buchstaben-Wort</b>, das mit <b>${randomLetter}</b> beginnt!<br>` +
            "Du fängst an, danach geht es reihum weiter.<br><br>" +
            "Wer <b>kein</b> Wort mehr findet oder ein <b>falsches</b> sagt, muss klattschen."
        this._render()
    }
}
class CountAndSound extends Game {
    constructor() {
        super(
            "Zählen oder so",
            "ressources/countAndSound.png",
            "Ihr <b>zählt</b> gemeinsam bis 10, wobei Zahlen durch andere Wörter/Zahlen/Sounds <b>ersetzt</b> werden. Du beginnst mit einer Ersetzung (sagt statt 3 -> blau). Danach wird linksum hoch gezählt.<br>" +
            "Seid ihr bei 10 angekommen, ersetzt diejenige, die an der Reihe ist erneut eine Zahl. Dies kann die <b>gleiche</b> oder eine <b>andere</b> Zahl betreffen.<br><br>" +
            "Wer zuerst einen <b>Fehler</b> macht klattscht."
        )
    }
}
class Luftmalerei extends Game {
    constructor() {
        super(
            "Luftbilder",
            "ressources/luftmalerei.png",
            "Zeichne etwas mit deinem Finger in die Luft.<br>" +
            "Du hast <b>2 Versuche</b>.<br><br>" +
            "Wird dein Bild erraten, klattschen <b>alle ohne</b> richtige Antwort.<br>" +
            "Errät es <b>niemand</b>, musst du klattschen."
        )
    }
}
class WordChain extends Game {
    constructor() {
        super(
            "Wortkette",
            "ressources/wordChain.png",
            "Du beginnst mit einem <b>zusammengesetzten Wort</b> – z. B. Boxsack. " +
            "Deine rechte Mitspielerin nimmt den <b>letzten</b> Wortteil und bildet daraus ein <b>neues</b> Wort – z. B. Sackhüpfen. " +
            "Leichte Abwandlungen dürfen gemacht werden (Sackhüpfen → <b>Hüpf</b>burg).<br><br>" +
            "Es geht reihum. Es klattscht, wer ein <b>falsches</b> Wort sagt oder <b>keine Idee</b> mehr hat."
        )
    }
}
class CounterStrike extends Game {
    constructor() {
        super(
            "Counter-Strike",
            "ressources/counterStrike.png",
            "Ihr zählt gemeinsam bis 8 (wenn ihr weniger seid: bis Anzahl der Spieler - 1). Du fängst mit 1 an. Danach gibt es keine Reihenfolge oder Absprache wer die nächst höhere Zahl nennt. " +
            "Jeder darf nur eine Zahl sagen.<br>" +
            "Wenn eine Zahl <b>gleichzeitig mehrfach</b> gesagt wird, klattschen diese Mitspieler und das Spiel ist vorbei.<br>" +
            "Sagt niemand was innerhalb von 3 Sekunden oder ihr habt es geschafft fertig zu zählen, klattschen alle, die noch <b>keine Zahl</b> genannt haben."
        )
    }
}
class WouldYouRather extends Game {
    constructor() {
        super(
            "Entweder-Oder irre ich mich?",
            "ressources/wouldYouRather.png",
            "Du stellst einer beliebigen Mitspielerin eine <b>Entweder-Oder</b>-Frage (z. B. Pizza oder Burger).<br>" +
            "Alle antworten <b>gleichzeitig</b>!<br>" +
            "Die befragte Mitspielerin beantwortet die Frage dabei nach eigenem Gusto. " +
            "Alle anderen Mitspielerinnen (auch du) versuchen im Sinne der befragten Mitspielerin zu antworten.<br>" +
            "Zeigt wie gut ihr euch kennt!<br><br>" +
            "Alle mit <b>anderer Antwort</b> als die der Befragten klattschen!"
        )
    }
}
class TimeStopper extends Game {
    maxSeconds = 20
    minSeconds = 1
    stopTimeGoal = 0
    player1Start = null;
    player2Start = null;
    player1Running = false;
    player2Running = false;
    stopTimePlayer1 = 0;
    stopTimePlayer2 = 0;
    constructor() {
        super(
            "Schneller als die Zeit erlaubt",
            "ressources/timeStopper.png",
            "Beschreibung wird generiert."
        )
    }
    reset() {
        this.player1Start = null;
        this.player2Start = null;
        this.player1Running = false;
        this.player2Running = false;
        this.stopTimePlayer1 = 0;
        this.stopTimePlayer2 = 0;
        document.getElementById("upperTime").textContent = "Start"; document.getElementById("downerTime").textContent = "Start";
        document.getElementById("upperNotice").textContent = ""; document.getElementById("downerNotice").textContent = "";
    }
    start() {
        this.reset()
        card.classList.remove("clickable");
        card.replaceWith(card.cloneNode(true)); // entfernt alle Listener
        this.stopTimeGoal = (Math.random() * (this.maxSeconds - this.minSeconds + 1) + this.minSeconds).toFixed(2)
        this.description = `Suche dir eine Gegnerin aus.<br> Euer Ziel ist es, den Button bei <b>${this.stopTimeGoal}</b> Sekunden zu stoppen! <br>` +
            `Dabei seht ihr nicht, wie lange die Zeit bereits läuft.Wer weiter von der Zielzeit weg ist, klattscht! <br> <br>` +
            `Klickt auf die Spielbeschreibung, um zum Spielfeld zu kommen.`
        this._render()
        document.getElementById("card").onclick = () => { this.openOverlay() };
        document.getElementById("timeStopGoal").onclick = () => { this.closeOverlay() };
    }
    openOverlay() {
        const overlay = document.getElementById("timeOverlay"); overlay.classList.remove("hidden");
        document.getElementById("timeStopGoal").textContent = `${this.stopTimeGoal} Sekunden`;
        this.initPlayerLogic();
    }
    closeOverlay() {
        const overlay = document.getElementById("timeOverlay");
        overlay.classList.add("hidden"); // Overlay ausblenden 
    }
    initPlayerLogic() {
        const upper = document.getElementById("upperSide");
        const downer = document.getElementById("downerSide");
        const upperText = document.getElementById("upperTime");
        const downerText = document.getElementById("downerTime");
        upper.ontouchstart = () => {
            if (!this.player1Running && this.stopTimePlayer1 === 0) {
                this.player1Start = performance.now();
                this.player1Running = true; upperText.textContent = "";
            }
            else if (this.player1Running) {
                this.player1Running = false;
                this.stopTimePlayer1 = (performance.now() - this.player1Start) / 1000;
                upperText.textContent = "Fertig"; console.log("Player 1:",
                    this.stopTimePlayer1.toFixed(3)); this.checkGameover()
            }
        };
        downer.ontouchstart = () => {
            if (!this.player2Running && this.stopTimePlayer2 === 0) {
                this.player2Start = performance.now();
                this.player2Running = true; downerText.textContent = "";
            }
            else if (this.player2Running) {
                this.player2Running = false;
                this.stopTimePlayer2 = (performance.now() - this.player2Start) / 1000;
                downerText.textContent = "Fertig";
                console.log("Player 2:", this.stopTimePlayer2.toFixed(3));
                this.checkGameover()
            }
        }
    }
    checkGameover() {
        if (!this.player2Running && this.stopTimePlayer2 > 0 && !this.player1Running && this.stopTimePlayer1 > 0) {
            const diff1 = (this.stopTimePlayer1 - this.stopTimeGoal).toFixed(2);
            const diff2 = (this.stopTimePlayer2 - this.stopTimeGoal).toFixed(2);
            document.getElementById("upperTime").textContent = diff1 > diff2 ? "Klattschen" : "";
            document.getElementById("downerTime").textContent = diff2 > diff1 ? "Klattschen" : "";
            document.getElementById("upperNotice").textContent = `${this.stopTimePlayer1.toFixed(2)}`;
            document.getElementById("downerNotice").textContent = `${this.stopTimePlayer2.toFixed(2)}`;
        }
    }
}
class StarredEyes extends Game {
    constructor() {
        super(
            "Starre Augen",
            "ressources/starredEyes.png",
            "Alle schließen ihre <b>Augen</b>. Gleichzeitig <b>öffnet</b> ihr sie wieder und schaut dabei genau <b>eine andere</b> Person an.<br><br>" +
            "Schaut ihr euch dann <b>gegenseitig</b> in die Augen - klattscht ihr.",
        )
    }
}
class NeverHaveIEver extends Game {
    constructor() {
        super(
            "Ich hab' noch nie ...",
            "ressources/neverHaveIEver.png",
            "Spielt eine classic Runde 'Ich hab noch nie...'.<br><br>" +
            "Du stellst die Frage, musst aber nicht antworten."
        )
    }
}
class KlattschBattle extends Game {
    constructor() {
        super(
            "Klattsch-Battle",
            "ressources/klattschBattle.png",
            "Du klatschst nach <b>links</b> und sagt 'Ho', oder nach <b>rechts</b> mit 'Ha'. Je nachdem was du wählst, ist danach deine linke bzw. rechte Mitspielerin dran. " +
            "Euch erwarten wilde <b>Richtungswechsel</b> - aber beeilt euch!<br><br>" +
            "Wer zuerst <b>falsch klatscht</b> (entweder nicht dran war, oder links und rechts mit 'Ho' und 'Ha' vertauscht) beendet das Spiel und klattscht."
        )
    }
}
class WhoAmI extends Game { //TODO 
    constructor() {
        super(
            "Wer bin ich?",
            "",
            ""
        )
    }
}
class PointToNowhere extends Game { //TODO 
    constructor() {
        super(
            "Touch me if you can",
            "",
            ""
        )
    }

    start() {

    }
}

const currentGame = new Game("Mannschafts-Klattschen", "ressources/klattschen.png", "Mini-Games 2.0")
const games = [
    new WordRoulette(),
    new CountAndSound(),
    new Luftmalerei(),
    new WordChain(),
    new CounterStrike(),
    new WouldYouRather(),
    new TimeStopper(),
    new StarredEyes(),
    new NeverHaveIEver(),
    new KlattschBattle(),
    new WhoAmI()
]
let lastGameIndex = -1;
function newGame() {
    do {
        randomIndex = Math.floor(Math.random() * games.length);
    } while (randomIndex == lastGameIndex);

    lastGameIndex = randomIndex;
    games[randomIndex].start()
}

document.getElementById("repickBtn").addEventListener("click", newGame);
window.onload = currentGame.start()