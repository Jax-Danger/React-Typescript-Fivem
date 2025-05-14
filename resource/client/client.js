"use strict";
onNet("client:event", () => {
  console.log("triggered client event from server. Now triggering server event.");
  emitNet("server:event");
});
