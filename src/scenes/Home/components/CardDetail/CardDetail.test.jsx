import React from "react";
import ReactDOM from "react-dom";
import CardDetail from "./CardDetail";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const effigy = {
    name: "Flame Lance",
    artist: "Nutthapon Petchthai",
    cardClass: ["MAGE"],
    collectible: true,
    cost: 5,
    dbfId: 2539,
    flavor:
      "It's on the rack next to ice lance, acid lance, and English muffin lance.",
    id: "AT_001",
    playRequirements: { REQ_MINION_TARGET: 0, REQ_TARGET_TO_PLAY: 0 },
    rarity: "COMMON",
    set: 3,
    rating: 2,
    text: "Deal $8 damage to a minion.",
    type: "SPELL",
    extra: ["HARD_REMOVAL"],
    imageUrl: "/resources/images/22302.png",
    tile: "AT_001.png"
  };

  ReactDOM.render(<CardDetail card={effigy}/>, div);
});
