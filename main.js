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
    weapon: null,
};
var enemy = {
    name: "Goblin",
    health: 5,
    maxHealth: 5,
    xpdrop: 5,
    golddrop: 5,
    Eattack: 1
};

var inventory = {
    materials: {
        wood: {
            name: "Wood",
            amount: 0
        }
    },
    food: {
        apple: {
            name: "Apple",
            health: 2,
            amount: 0
        }
    }
};
var defaultinv = inventory;
var canAttack = true;
//Make a inventory with selling system
//Add a THE OLDE SHOPPE

var gameLoop = setInterval("update()", 100);
var gui = setInterval("updateGUI()", 100);
var autoSave = setInterval("save()", 30000);
var log = document.getElementById("log");

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
        logText("You Died!");
        player.health = player.maxHealth;
        player.gold -= 5;
        if(player.gold < 0 ) {
            player.gold = 0;
        }
    }
}

function reset() {
    player = {
        health: 10,
        maxHealth: 10,
        gold: 0,
        level: 1,
        xp: 0,
        xpNeeded: 10,
        multiplier: 1.20,
        weapon: items.wooden_sword,
    }
    inventory = defaultinv;
    generateEnemy();
    save();
}

function save() {
    localStorage.setItem("saveGame", JSON.stringify(player));
    localStorage.setItem("enemy", JSON.stringify(enemy));
    localStorage.setItem("inventory", JSON.stringify(inventory))
}
function load() {
    if(localStorage == null) {
        save();
        console.log("No data found or outdated data found");
        return;
    }
    console.log(JSON.parse(localStorage.getItem("saveGame")));
    player = JSON.parse(localStorage.getItem("saveGame"));
    enemy = JSON.parse(localStorage.getItem("enemy"));
    inventory = JSON.parse(localStorage.getItem("inventory"))
}

function eat(itemtoeat) {
    if(itemtoeat.health == undefined) return;
    if(itemtoeat.amount <= 0) return;
    if(player.health + itemtoeat.health > player.maxHealth) {
        return;
    }
    player.health += itemtoeat.health;
    itemtoeat.amount -= 1;
    if(player.health > player.maxHealth) player.health = player.maxHealth;
}

function updateGUI() {
    document.getElementById("Ehealth").innerHTML = "Enemy Health: " + enemy.health + "/" + enemy.maxHealth;
    document.getElementById("health").innerHTML = "Health: " + player.health + "/" + player.maxHealth;
    document.getElementById("gold").innerHTML = "Gold: " + player.gold;
    document.getElementById("level").innerHTML = "Level: " + player.level;
    document.getElementById("attack").innerHTML = "Damage: " + player.weapon.attack;
    document.getElementById("attackspeed").innerHTML = "Attack Speed: " + player.weapon.attack_speed;
    document.getElementById("apples").innerHTML = "Apples: " + inventory.food.apple.amount;
    document.getElementById("wood").innerHTML = "Wood: " + inventory.materials.wood.amount;
}
function generateEnemy() {
    enemy.name = "Goblin";
    enemy.maxHealth = Math.floor((Math.random() * 9) + 1);
    enemy.health = enemy.maxHealth;
    enemy.xpdrop = Math.floor((Math.random() * 9) + 1);
    enemy.golddrop = Math.floor((Math.random() * 9) + 1);
    enemy.Eattack = Math.floor((Math.random() * 2) + 1);
    logText("A new enemy has spawned");
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

function logText(message) {
    if(log.childNodes.length >= 9) {
        log.children[0].innerHTML = message;
        return;
    }
    element = document.createElement("div");
    element.innerHTML = message;
    
    log.appendChild(element);
}
function changeWeapon(weapontochange) {
    player.weapon = weapontochange;
    player.weapon = weapontochange;
}

function gatherForest() {
    var found_apples;
    var found_wood;
    found_apples = Math.floor(Math.random() * 4);
    found_wood = Math.floor(Math.random() * 5);
    logText("You gathered in the forest and found " + found_wood + " wood and " + found_apples + " apples");
    inventory.food.apple.amount += found_apples;
    inventory.materials.wood.amount += found_wood;
}

window.onbeforeunload = function() {
    save();
};

changeWeapon(items.wooden_sword);

load();