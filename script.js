const objekte = [
    {
        img: "https://picsum.photos/400/300?random=10",
        name: "Klattschen 2.0",
        description: "Mini-Games Erweiterung"
    },
    {
        img: "https://picsum.photos/400/300?imagine",
        name: "Imaginäres (Haus)tier",
        description:
            "Zeichne ein <b>Tier</b> in die Luft.<br>" +
            "Du hast <b>3 Versuche</b>.<br><br>" +
            "Wird dein Tier erraten, klattschen ohne alle richtige Antwort.<br>" +
            "Errät es niemand, musst du klattschen."
    },
    {
        img: "https://picsum.photos/400/300?random=2",
        name: "Luftbild",
        description: "Zeichne ein Tier in die Luft. Du hast 3 Versuche. Wer es als erstes errät verteilt 2 Schlücke. Errät es niemand innerhalb von 3 Versuchen trinkst du 2 Schlücke."
    },
];

let lastGameIndex = 0;

function showCard(gameIndex) {
    const obj = objekte[gameIndex];
    document.getElementById("cardImg").src = obj.img;
    document.getElementById("cardName").textContent = obj.name;
    document.getElementById("cardDescription").innerHTML = obj.description;
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
