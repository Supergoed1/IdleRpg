var player = {
    health: 10,
    maxHealth: 10,
    gold: 0,
    level: 1,
    xp: 0,
    xpNeeded: 10,
    multiplier: 1.30
}
var gameLoop = setInterval("update()", 100);

function update() {
    if(player.xp >= player.xpNeeded) {
        player.xp = 0;
        player.xpNeeded = Math.round(player.xpNeeded * player.multiplier);
        player.level += 1;
        console.log("Level up! Level: " + player.level + " Xpneeded: " + player.xpNeeded);
        player.multiplier -= 0.001;
    }
    player.xp += 100000000000000000000;
}

