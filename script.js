const objekte = [
    {
        img: "ressources/klattschen.png",
        name: "Klattschen 2.0",
        description: "Mini-Games Erweiterung"
    },
    {
        img: "https://img.icons8.com/?id=58856",
        name: "Imaginäres (Haus)tier",
        description:
            "Zeichne ein <b>Tier</b> in die Luft.<br>" +
            "Du hast <b>3 Versuche</b>.<br><br>" +
            "Wird dein Tier erraten, klattschen <b>alle ohne</b> richtige Antwort.<br>" +
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
        img: "https://picsum.photos/400/300?random=2",
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
