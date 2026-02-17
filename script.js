const objekte = [
    {
        img: "ressources/klattschen.png",
        name: "Mannschafts-Klattschen",
        description: "Mini-Games 2.0"
    },
    {
        img: "ressources/luftmalerei.png",
        name: "Luftbilder",
        description:
            "Zeichne etwas mit deinem Finger in die Luft.<br>" +
            "Du hast <b>2 Versuche</b>.<br><br>" +
            "Wird dein Bild erraten, klattschen <b>alle ohne</b> richtige Antwort.<br>" +
            "Errät es <b>niemand</b>, musst du klattschen."
    },
    {
        img: "ressources/wordRoulette.png",
        name: "Buchstaben-Roulette",
        description:
            "Finde ein <b>5-Buchstaben-Wort</b>, das mit <Buchstabe> beginnt!<br>" +
            "Du fängst an, danach geht es reihum weiter.<br>" +
            "Wer <b>kein</b> Wort mehr findet oder ein <b>falsches</b> sagt, muss klattschen."
    },
    {
        img: "ressources/wordChain.png",
        name: "Wortkette",
        description:
            "Du beginnst mit einem <b>zusammengesetzten Wort</b> – z. B. Boxsack. " +
            "Deine rechte Mitspielerin nimmt den <b>letzten</b> Wortteil und bildet daraus ein <b>neues</b> Wort – z. B. Sackhüpfen. " +
            "Leichte Abwandlungen dürfen gemacht werden (Sackhüpfen → <b>Hüpf</b>burg).<br><br>" +
            "Es geht reihum. Es klattscht, wer ein <b>falsches</b> Wort sagt oder <b>keine Idee</b> mehr hat."
    },
    {
        img: "ressources/counterChallange.png",
        name: "Counter-Strike",
        description:
            "Ihr zählt gemeinsam bis 8 (wenn ihr weniger seid: bis Anzahl der Spieler - 1). Du fängst mit 1 an. Danach gibt es keine Reihenfolge oder Absprache wer die nächst höhere Zahl nennt. " +
            "Jeder darf nur eine Zahl sagen.<br>" +
            "Wenn eine Zahl <b>gleichzeitig mehrfach</b> gesagt wird, klattschen diese Mitspieler und das Spiel ist vorbei.<br>" +
            "Habt ihr es geschafft fertig zu zählen, klattschen alle, die noch <b>keine Zahl</b> genannt haben."
    },
    {
        img: "ressources/wouldYouRather.png",
        name: " Entweder-Oder irre ich mich?",
        description:
            "Du stellst einer beliebigen Mitspielerin eine <b>Entweder-Oder</b>-Frage (z. B. Pizza oder Burger).<br>" +
            "Alle antworten <b>gleichzeitig</b>!<br>" +
            "Die befragte Mitspielerin beantwortet die Frage dabei nach eigenem Gusto. " +
            "Alle anderen Mitspielerinnen (auch du) versuchen im Sinne der befragten Mitspielerin zu antworten.<br>" +
            "Zeigt wie gut ihr euch kennt!<br><br>" +
            "Alle mit <b>anderer Antwort</b> als die der Befragten klattschen!"
    },
    {
        img: "ressources/jinx.png",
        name: "Verhexxt",
        description:
            "Du und deine linke Mitspielerin sagt gleichzeitig <b>spontan irgendein</b> Wort. " +
            "<b>Ziel</b> ist, das <b>gleiche</b> Wort zu sagen. Schafft ihr es direkt: prima! Ihr dürft jeweils 1 Klattscher <b>verteilen</b>. " +
            "Schafft ihr es nicht, spielt deine linke Mitspielerin mit ihrer linken Mitspielerin erneut. " +
            "Nutzt dafür die beiden <b>vorher genannten</b> Worte, um dadurch zum gleichen Wort zu gelangen.<br>" +
            "Beispiel: Die ersten Wörter sind 'Apfel' und 'Birne'. Die nächsten Spielerinnen kommen dann gemeinsam zu dem Wort 'Obst'.<br><br>" +
            "Ihr habt eine Runde Zeit, um auf ein gleiches Wort zu kommen. Schafft ihr es nicht klattschen <b>alle</b>."
    },
    {
        img: "ressources/countNdSound.png",
        name: "Zählen oder so",
        description:
            "Ihr <b>zählt</b> gemeinsam bis 10, wobei Zahlen durch andere Wörter/Zahlen/Sounds <b>ersetzt</b> werden. Du beginnst mit einer Ersetzung (sagt statt 3 -> blau). Danach wird linksum hoch gezählt.<br>" +
            "Seid ihr bei 10 angekommen, ersetzt diejenige, die an der Reihe ist erneut eine Zahl. Dies kann die <b>gleiche</b> oder eine <b>andere</b> Zahl betreffen.<br><br>" +
            "Wer zuerst einen <b>Fehler</b> macht klattscht."
    },
    {
        img: "",
        name: "TEST",
        description:
            "TEST"
    }
];

let lastGameIndex = 0;
const buchstaben = "ABCDEFGHIJKLMNOPRSTUVWZ".split("");

function randomBuchstabe() {
    return buchstaben[Math.floor(Math.random() * buchstaben.length)];
}

function showCard(gameIndex) {
    const obj = objekte[gameIndex];
    document.getElementById("cardImg").src = obj.img;
    document.getElementById("cardName").textContent = obj.name;

    // Beschreibung kopieren
    let description = obj.description;

    // Platzhalter <Buchstabe> ersetzen, falls vorhanden
    if (description.includes("<Buchstabe>")) {
        const buchstabe = randomBuchstabe();
        description = description.replace(/<Buchstabe>/g, buchstabe);
    }

    document.getElementById("cardDescription").innerHTML = description;
}
// Funktion: neue Karte zufällig auswählen
function neueKarte() {
    do {
        randomIndex = Math.floor(Math.random() * (objekte.length - 1)) + 1;
    } while (randomIndex === lastGameIndex);

    lastGameIndex = randomIndex;
    showCard(randomIndex);
}

// Event Listener für Repick Button
document.getElementById("repickBtn").addEventListener("click", neueKarte);

// Beim Laden Standardkarte zeigen
window.onload = showCard(0);
