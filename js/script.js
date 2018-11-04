/* LootTable = [] array of objects

    Funtions:
        Add item
        Remove item
        Display Table


    Items
        user can create new item

        are objects with properties:
        Name
        Drop Weight

*/

/* Button events */
var event1 = document.getElementById("buttonAdd");
event1.addEventListener('click', addItem, false);


var event1 = document.getElementById("buttonRemove");
event1.addEventListener('click', removeItem, false);


var event1 = document.getElementById("dropLoot");
event1.addEventListener('click', dropItem, false);

/* Loot Table Constructor */
var LootTable = function(table) {
    this.table = [];

}

LootTable.prototype.constructor = LootTable;

LootTable.prototype.display = function() {

    var tableDiv = document.getElementById("dropTable"); 

    tableDiv.innerHTML = "";
    var table = document.createElement('TABLE');
    var tbody= document.createElement('TBODY');  
    var tr = document.createElement('TR');

    table.appendChild(tbody);

    //create header
    tbody.appendChild(tr);

    var heading = ["Positiion #", "Item", "Weight", "Icon"];

    for (var col = 0; col<heading.length; col++)
    {
        var th = document.createElement('TH');
        th.width = '200';
        th.appendChild(document.createTextNode(heading[col]));
        tr.appendChild(th);
    }

    // Create rows

    for (var f=0; f<this.table.length; f++)
    {
        var tr = document.createElement('TR'); 
        var td1 = document.createElement('TD');
        var td2 = document.createElement('TD');
        var td3 = document.createElement('TD');
        var td4 = document.createElement('img');
      
        
        td1.appendChild(document.createTextNode(f));
        td2.appendChild(document.createTextNode(this.table[f].name));
        td3.appendChild(document.createTextNode(this.table[f].weight));
  
        td4.src = "../img/icons/" + this.table[f].icon + ".png";
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody.appendChild(tr);
    }

    tableDiv.appendChild(table);

}

LootTable.prototype.add = function(item) {

    if (item.weight < 0)
        item.weight = 1;

    this.table.push(item);
}

/* Items */
var item = function(name, weight, icon)
{
    this.name = name;
    this.weight = weight;
    this.icon = icon;

}

function addItem()
{
    var input1 = document.getElementById("input1").value;
    var input2 = parseInt(document.getElementById("input2").value);
//    var input3 = document.getElementById("input3").value;
    var input3 = $('.selectpicker').val()
    

    if (input1 == "" || input2 == "") {
        alert("Please enter a name and weight");

        return;
    }
    
    input2 = Math.max(1, Math.min(input2, 999));
    
    newItem = new item(input1, input2, input3);
    BasicLootTable.add(newItem);
    BasicLootTable.display();
}

function removeItem()
{
    //get the removal position from the user input
    var removalPosition = parseInt((document.getElementById("input3").value));

    //check that the removal position is valid and warn the user if it isn't
    if ((removalPosition >= 0) && (removalPosition < BasicLootTable.table.length))
    {
        BasicLootTable.table.splice(removalPosition, 1);
        BasicLootTable.display();
    }
    else
    {
        alert("Please enter a number between 0 and " + BasicLootTable.table.length);
    }
}


function dropItem()
{
    var dice, sumWeight = 0, weight = 0, i, result;

    for (i = 0; i < BasicLootTable.table.length; i++)
        sumWeight += BasicLootTable.table[i].weight;

    dice = Math.floor(Math.random() * sumWeight);

    for (i = 0; i < BasicLootTable.table.length; i++)
    {
        weight += BasicLootTable.table[i].weight;

        if (dice <= weight) {
            result = i;
            break;
        }

    }

    var item = BasicLootTable.table[result].name;
    document.getElementById("result").innerHTML = "Item: " +item + " Total Weight: " + sumWeight + " Dice: " + dice;
}


/* Create the loot table */
BasicLootTable = new LootTable();

/* Add some loot! */
var defaultitem = new item("Sword", 20, "isword1");
BasicLootTable.add(defaultitem);

var defaultitem2 = new item("Shield", 10, "shield1");
BasicLootTable.add(defaultitem2);

var defaultitem3 = new item("Potion", 5, "potion1");
BasicLootTable.add(defaultitem3);

/* Display the table */
BasicLootTable.display();

