var items = {
    wooden_sword: {
        name: "Wooden Sword",
        attack: 1,
        attack_speed: 0.6
    },
    stone_sword: {
        name: "Stone Sword",
        attack: 2,
        attack_speed: 0.8
    },
    op_sword: {
        name: "OP SWORD",
        attack: 999,
        attack_speed: 0.0001
    }
};
var player = {
    health: 10,
    maxHealth: 10,
    gold: 0,
    level: 1,
    xp: 0,
    xpNeeded: 10,
    multiplier: 1.20,
    weapon: null
};
var enemy = {
    name: "Goblin",
    health: 5,
    maxHealth: 5,
    xpdrop: 5,
    golddrop: 5,
    Eattack: 1
};
var canAttack = true;
//Make a inventory with selling system
//Add a THE OLDE SHOPPE

var gameLoop = setInterval("update()", 100);
var gui = setInterval("updateGUI()", 10);
var autoSave = setInterval("save()", 30000);

function levelUp() {
    player.xp = 0;
    player.xpNeeded = Math.round(player.xpNeeded * player.multiplier);
    player.level += 1;
    player.maxHealth += 2;
    player.health = player.maxHealth;
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

function reset() {
    confirm("Are you sure you want to reset?");
    player.level = 1;
    player.gold = 0;
    player.weapon = items.wooden_sword;
    player.xp = 0;
    player.xpNeeded = 10;
    player.health = 10;
    player.maxHealth = 10;
    generateEnemy();
    save();
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
    document.getElementById("attackspeed").innerHTML = "Attack Speed: " + player.weapon.attack_speed;
}
function generateEnemy() {
    enemy.name = "Goblin";
    enemy.maxHealth = Math.floor((Math.random() * 9) + 1);
    enemy.health = enemy.maxHealth;
    enemy.xpdrop = Math.floor((Math.random() * 9) + 1);
    enemy.golddrop = Math.floor((Math.random() * 9) + 1);
    enemy.Eattack = Math.floor((Math.random() * 2) + 1);
    console.log("Created a new enemy");
}

function attack() {
    if(!canAttack) return;
    canAttack = false;
    setTimeout(() => {
        canAttack = true;
    }, player.weapon.attack_speed * 1000);
    enemy.health -= player.weapon.attack;
    player.health -= enemy.Eattack;
}

function changeWeapon(weapontochange) {
    player.weapon = weapontochange;
    player.weapon = weapontochange;
}

window.onbeforeunload = function() {
    save();
};

changeWeapon(items.wooden_sword);

load();