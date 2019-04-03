var player = {
    health: 10,
    maxHealth: 10,
    gold: 0,
    level: 1,
    xp: 0,
    xpNeeded: 10,
    multiplier: 1.20,
    attack: 1
}
var enemy = {
    name: "Goblin",
    health: 5,
    maxHealth: 5,
    xpdrop: 5,
    golddrop: 5
}

var gameLoop = setInterval("update()", 100);
var gui = setInterval("updateGUI()", 10);

function update() {
    if(player.xp >= player.xpNeeded) {
        player.xp = 0;
        player.xpNeeded = Math.round(player.xpNeeded * player.multiplier);
        player.level += 1;
        console.log("Level up! Level: " + player.level + " Xpneeded: " + player.xpNeeded);
    }
    if(enemy.health <= 0) {
        player.gold += enemy.golddrop;
        player.xp += enemy.xpdrop;
        generateEnemy();
    }
}

function updateGUI() {
    document.getElementById("Ehealth").innerHTML = "Enemy Health: " + enemy.health + "/" + enemy.maxHealth;
    document.getElementById("health").innerHTML = "Health: " + player.health + "/" + player.maxHealth;
}

function generateEnemy() {
    enemy.name = "Goblin";
    enemy.maxHealth = Math.floor((Math.random() * 9) + 1);
    enemy.health = enemy.maxHealth;
    enemy.xpdrop = Math.floor((Math.random() * 9) + 1);
    enemy.golddrop = Math.floor((Math.random() * 9) + 1);
    console.log("Created a new enemy");
    
}

function attack() {
    enemy.health -= player.attack;
}

generateEnemy();

