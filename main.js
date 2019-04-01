var player = {
    health: 10,
    maxHealth: 10,
    gold: 0,
    level: 1,
    xp: 0,
    xpNeeded: 10
}
var gameLoop = setInterval("update()", 100);

function update() {
    if(xp >= xpNeeded) {
        xp = 0;
        xpNeeded = Math.round(xpNeeded * 1.25);
        level++;
        Console.apply("Level up! Level: " + level + " Xpneeded: " + xpNeeded);
    }
}

