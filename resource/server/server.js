"use strict";
const shared = globalThis.shared;
RegisterCommand("test", (source) => {
  const src = source;
  emitNet("client:event", src);
}, false);
onNet("server:event", () => {
  console.log("server:event called from client");
  const coords = shared.shared2["test"].coords;
  console.log(coords);
});
