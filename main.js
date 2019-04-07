var player = {
    health: 10,
    maxHealth: 10,
    gold: 0,
    level: 1,
    xp: 0,
    xpNeeded: 10,
    multiplier: 1.20,
    weapon: wooden_sword
};
var enemy = {
    name: "Goblin",
    health: 5,
    maxHealth: 5,
    xpdrop: 5,
    golddrop: 5,
    attack: 1
};

var canAttack = true;
//Make a inventory with selling system

var gameLoop = setInterval("update()", 100);
var gui = setInterval("updateGUI()", 10);
var autoSave = setInterval("save()", 30000);

function levelUp() {
    player.xp = 0;
    player.xpNeeded = Math.round(player.xpNeeded * player.multiplier);
    player.level += 1;
    player.maxHealth += 2;
    player.health = player.maxHealth;
    player.attack += 1;
    console.log("Level up! Level: " + player.level + " Xpneeded: " + player.xpNeeded);
}

function update() {
    if(player.xp >= player.xpNeeded) {
        levelUp();
    }
    if(enemy.health <= 0) {
        player.gold += enemy.golddrop;
        player.xp += enemy.xpdrop;
        generateEnemy();
    }
    if(player.health <= 0) {
        console.log("You Died!");
        player.health = player.maxHealth;
        player.gold -= 5;
        if(player.gold < 0 ) {
            player.gold = 0;
        }
    }
}

function save() {
    localStorage.setItem("saveGame", JSON.stringify(player));
    localStorage.setItem("enemy", JSON.stringify(enemy));
}

function load() {
    if(localStorage == null) {
        save();
        console.log("No data found");
        return;
    }
    console.log(JSON.parse(localStorage.getItem("saveGame")));
    player = JSON.parse(localStorage.getItem("saveGame"));
    enemy = JSON.parse(localStorage.getItem("enemy"));
}



function updateGUI() {
    document.getElementById("Ehealth").innerHTML = "Enemy Health: " + enemy.health + "/" + enemy.maxHealth;
    document.getElementById("health").innerHTML = "Health: " + player.health + "/" + player.maxHealth;
    document.getElementById("gold").innerHTML = "Gold: " + player.gold;
    document.getElementById("level").innerHTML = "Level: " + player.level;
    document.getElementById("attack").innerHTML = "Damage: " + player.weapon.attack;
    
}
function generateEnemy() {
    enemy.name = "Goblin";
    enemy.maxHealth = Math.floor((Math.random() * 9) + 1);
    enemy.health = enemy.maxHealth;
    enemy.xpdrop = Math.floor((Math.random() * 9) + 1);
    enemy.golddrop = Math.floor((Math.random() * 9) + 1);
    enemy.attack = Math.floor((Math.random() * 2) + 1);
    console.log("Created a new enemy");
}

function attack() {
    if(!canAttack) return;
    canAttack = false;
    setTimeout(() => {
        canAttack = true;
    }, player.weapon.attack_speed * 1000);
    enemy.health -= player.weapon.attack;
    player.health -= enemy.attack;
}

window.onbeforeunload = function() {
    save();
};

load();