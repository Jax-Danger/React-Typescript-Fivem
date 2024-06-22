"use strict";

// config/config.ts
var config = {};
var config_default = config;
config.shops = {
  name: "Shop",
  coords: [
    [25.6466, -1347.3689, 29.497],
    [-3038.71, 585.9, 7.9089]
  ],
  items: [
    {
      name: "sandwich",
      label: "Turkey Sandwich",
      price: 3.5
    },
    {
      name: "beer",
      label: "Bottle of beer",
      price: 1.99
    },
    {
      name: "water",
      label: "Water Bottle",
      price: 1.25
    }
  ]
};

// resource/server/index.ts
var ox = global.exports["ox_lib"];
var inv = global.exports["ox_inventory"];
onNet("purchaseItems:success", (method, item, quantity, price) => {
  const source = global.source;
  const findItemName = config_default.shops.items.find((i) => i.label === item);
  if (findItemName) {
    console.log(findItemName.name + " WO");
    console.log("purchasing " + quantity + " " + item + " for $" + price + " each using " + method);
  } else
    return console.log("Item not found");
  if (method === "cash") {
    console.log("removing cash");
    global.exports["MP-Base"].changeMoney(source, "cash", price, "del");
    emit("Inventory:AddItem", source, findItemName.name, quantity);
  } else if (method === "bank") {
    global.exports["MP-Base"].changeMoney(source, "bank", price, "del");
    emit("Inventory:AddItem", source, findItemName.name, quantity);
    console.log("removing $" + price + " from bank and adding " + quantity + " " + item);
  }
});
