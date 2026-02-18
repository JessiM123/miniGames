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
        this._render()
    }
}
class WordRoulette extends Game {
    constructor() {
        super("Buchstaben-Roulette",
            "ressources/wordRoulette.png",
            "Ihr spielt Buchstaben-Roulette"
        );
    }

    start() {
        const randomLetter = _randomBuchstabe()
        this.description =
            `Finde ein <b>5-Buchstaben-Wort</b>, das mit <b>${randomLetter}</b> beginnt!<br>` +
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
            "ressources/counterChallange.png",
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

const currentGame = new Game("Mannschafts-Klattschen", "ressources/klattschen.png", "Mini-Games 2.0")
const games = [
    new WordRoulette(),
    new CountAndSound(),
    new Luftmalerei(),
    new WordChain(),
    new CounterStrike(),
    new WouldYouRather()
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