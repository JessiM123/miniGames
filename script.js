const alphabet = "ABCDEFGHIJKLMNOPRSTUWZ".split("");
function randomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}
class Game {
    constructor(name, img, description) {
        this.name = name;
        this.img = img;
        this.description = description;
    }

    start() {
        return {
            name: this.name,
            img: this.img,
            description: this.description
        };
    }
}
class WordRoulette extends Game {
    constructor() {
        super("Buchstaben-Roulette",
            "ressources/wordRoulette.png",
            ""
        );
    }

    start() {
        const randomNumber = Math.floor(Math.random() * 3) + 3; // 3–5
        const letter = randomLetter();

        return {
            name: this.name,
            img: this.img,
            description:
                `Finde ein <b>${randomNumber}-Buchstaben-Wort</b>, das mit <b>${letter}</b> beginnt!<br>
                Du fängst an, danach geht es reihum weiter.<br><br>
                Wer <b>kein</b> Wort mehr findet oder ein <b>falsches</b> sagt, muss klattschen.`
        };
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
    constructor(min = 1, max = 20) {
        super(
            "Schneller als die Zeit erlaubt",
            "ressources/timeStopper.png",
            "Beschreibung wird generiert."
        );
        this.maxSeconds = max;
        this.minSeconds = min;

        this.stopTimeGoal = 0;

        this.player1Start = null;
        this.player2Start = null;
        this.player1Running = false;
        this.player2Running = false;
        this.stopTimePlayer1 = 0;
        this.stopTimePlayer2 = 0;
    }

    reset() {
        this.player1Start = null;
        this.player2Start = null;
        this.player1Running = false;
        this.player2Running = false;
        this.stopTimePlayer1 = 0;
        this.stopTimePlayer2 = 0;
    }

    start() {
        this.reset()
        this.generateGoal()
        return {
            name: this.name,
            img: this.img,
            description:
                `Suche dir eine Gegnerin aus.<br>
            Euer Ziel ist es, den Button bei einer zufälligen Zeit zu stoppen!<br><br>
            Klickt auf die Spielbeschreibung, um zu starten.`,
            onClick: () => timeStopperController.startNewGame(this)
        }
    }

    generateGoal() {
        this.stopTimeGoal =
            (Math.random() * (this.maxSeconds - this.minSeconds + 1)
                + this.minSeconds).toFixed(2);
    }

    startPlayer(player) {
        if (player === 1 && !this.player1Running && this.stopTimePlayer1 === 0) {
            this.player1Start = performance.now();
            this.player1Running = true;
        }

        if (player === 2 && !this.player2Running && this.stopTimePlayer2 === 0) {
            this.player2Start = performance.now();
            this.player2Running = true;
        }
    }

    stopPlayer(player) {
        if (player === 1 && this.player1Running) {
            this.player1Running = false;
            this.stopTimePlayer1 =
                (performance.now() - this.player1Start) / 1000;
        }

        if (player === 2 && this.player2Running) {
            this.player2Running = false;
            this.stopTimePlayer2 =
                (performance.now() - this.player2Start) / 1000;
        }
    }

    isFinished() {
        return (
            !this.player2Running &&
            this.stopTimePlayer2 > 0 &&
            !this.player1Running &&
            this.stopTimePlayer1 > 0
        );
    }

    getResult() {
        const diff1 =
            (this.stopTimePlayer1 - this.stopTimeGoal).toFixed(2);

        const diff2 =
            (this.stopTimePlayer2 - this.stopTimeGoal).toFixed(2);

        return {
            diff1,
            diff2,
            player1Time: this.stopTimePlayer1.toFixed(2),
            player2Time: this.stopTimePlayer2.toFixed(2),
            loserUpper: diff1 > diff2,
            loserLower: diff2 > diff1
        };
    }
}
class TimeStopperController {
    game = null;
    constructor() {
        this.overlay = document.getElementById("timeOverlay");
        this.goalText = document.getElementById("timeStopGoal");

        this.upper = document.getElementById("upperSide");
        this.lower = document.getElementById("downerSide");

        this.upperTime = document.getElementById("upperTime");
        this.lowerTime = document.getElementById("downerTime");

        this.upperNotice = document.getElementById("upperNotice");
        this.lowerNotice = document.getElementById("downerNotice");
    }

    startNewGame(timeStopper) {
        this.game = timeStopper
        this.resetUI();

        this.goalText.textContent =
            `${timeStopper.stopTimeGoal} Sekunden`;

        this.overlay.classList.remove("hidden");

        this.bindEvents();
    }

    resetUI() {
        this.upperTime.textContent = "Start";
        this.lowerTime.textContent = "Start";
        this.upperNotice.textContent = "";
        this.lowerNotice.textContent = "";
    }

    bindEvents() {

        this.upper.ontouchstart = () => this.handlePlayer(1);
        this.lower.ontouchstart = () => this.handlePlayer(2);
        this.goalText.addEventListener("click", () => this.overlay.classList.add("hidden"))
    }

    handlePlayer(player) {

        const running =
            player === 1
                ? this.game.player1Running
                : this.game.player2Running;

        const stoppedTime =
            player === 1
                ? this.game.stopTimePlayer1
                : this.game.stopTimePlayer2;

        if (!running && stoppedTime === 0) {
            this.game.startPlayer(player);
            if (player === 1) this.upperTime.textContent = "";
            if (player === 2) this.lowerTime.textContent = "";
        }
        else if (running) {
            this.game.stopPlayer(player);

            if (player === 1)
                this.upperTime.textContent = "Fertig";

            if (player === 2)
                this.lowerTime.textContent = "Fertig";

            if (this.game.isFinished()) {
                this.finishGame();
            }
        }
    }

    finishGame() {

        const result = this.game.getResult();

        this.upperTime.textContent =
            result.loserUpper ? "Klattschen" : "";

        this.lowerTime.textContent =
            result.loserLower ? "Klattschen" : "";

        this.upperNotice.textContent =
            result.player1Time;

        this.lowerNotice.textContent =
            result.player2Time;
    }

    close() {
        this.overlay.classList.add("hidden");
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
            "ressources/WhoAmI.png",
            ""
        )
    }
}
class TouchMeIfYouCan extends Game {
    constructor(min = 1, max = 300) {
        super(
            "Touch Me If You Can",
            "ressources/touchMeIfYouCan.png",
            ""
        );
        this.letter = "";
        this.minSeconds = min;
        this.maxSeconds = max;
        this.timer = null;
        this.onTimerEnd = null;
    }

    start() {
        this.letter = randomLetter()
        return {
            name: this.name,
            img: this.img,
            description:
                `Sobald ihr das "Touch-Me"-Signal hört, berührt schnellstmöglich irgendetwas mit dem Anfangsbuchstaben <b>${this.letter}</b>.
                Die <b>Langsamste</b> klattscht.<br><br>
                Klicke auf die Spielbeschreibung, um das Spiel zu <b>starten</b> und spielt bis zum Signalton einfach weiter.`,
            onClick: () => {
                this.startTimer();
                touchMeIfYouCanController.gameStartedNotification()
            }
        }
    }

    startTimer() {
        if (this.timer) {
            console.log("timer already running");
            return
        };

        const randomTime = (Math.random() * (this.maxSeconds - this.minSeconds) + this.minSeconds) * 1000;
        console.log("randomTime: " + randomTime)
        this.timer = setTimeout(() => this.finish(), randomTime);
    }
    async finish() {
        if (touchMeIfYouCanController) {
            await touchMeIfYouCanController.onTimerEnd(this.letter);
        }
        this.timer = null;
    }

    isRunning() {
        return this.timer ? true : false;
    }
}
class TouchMeIfYouCanController {
    constructor() {
        this.overlay = document.getElementById("touchOverlay");
        this.letterText = document.getElementById("touchLetter");
        this.cardDescription = document.getElementById("cardDescription");
        this.audio = new Audio("ressources/touchMeAlert.mp3");
        this.audio.preload = "auto";
    }
    onTimerEnd(letter) {
        return new Promise((resolve) => {
            this.letterText.textContent = letter;
            this.audio.currentTime = 1.5;
            this.audio.play();
            this.overlay.classList.remove("hidden");


            setTimeout(() => {
                this.overlay.classList.add("hidden");
                resolve();
            }, 1000);
        });
    }
    gameStartedNotification() {
        this.cardDescription.innerHTML =
            `Spiel wurde gestartet.<br><br>
        Du kannst weiterspielen!`
    }
}
class TEST extends Game { //TODO 
    constructor() {
        super(
            "Wer bin ich?",
            "ressources/WhoAmI.png",
            ""
        )
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
    new TouchMeIfYouCan(),
    //new WhoAmI(),
]

class GameRenderer {
    constructor() {
        this.card = document.getElementById("card");
        this.cardImg = document.getElementById("cardImg");
        this.cardName = document.getElementById("cardName");
        this.cardDescription = document.getElementById("cardDescription");
    }

    render(gameData) {
        this.cardImg.src = gameData.img;
        this.cardName.textContent = gameData.name;
        this.cardDescription.innerHTML = gameData.description;

        this.card.onclick = gameData.onClick || null
    }
}
class GameManager {
    constructor(games, renderer) {
        this.games = games;
        this.renderer = renderer;
        this.lastIndex = -1;
    }

    newGame() {
        let index;
        let game;
        do {
            index = Math.floor(Math.random() * this.games.length);
            game = this.games[index]
        } while (index === this.lastIndex || (game instanceof TouchMeIfYouCan && game.isRunning()));
        console.log(game.constructor.name)
        this.lastIndex = index;
        const gameData = game.start();
        this.renderer.render(gameData);
    }
}
const timeStopperController = new TimeStopperController();
const touchMeIfYouCanController = new TouchMeIfYouCanController();
const renderer = new GameRenderer();
const manager = new GameManager(games, renderer);

document.getElementById("repickBtn")
    .addEventListener("click", () => manager.newGame());
window.onload = renderer.render(currentGame.start())