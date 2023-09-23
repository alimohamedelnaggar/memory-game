/*
                                                   memory game
*/
document.querySelector(".control-btn").onclick = function () {
  let yourName = prompt("enter your name");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
    document.querySelector(".control-btn").remove();
  }
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-block");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

// add order
shuffle(orderRange);
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", () => {
    flip(block);
  });
});

function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
}

function flip(select) {
  select.classList.add("is-flipped");
  let allFlipped = blocks.filter((flipped) =>
    flipped.classList.contains("is-flipped")
  );

  if (allFlipped.length === 2) {
    stopped();
    matched(allFlipped[0], allFlipped[1]);
  }
}

function stopped() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function matched(first, second) {
  let triesElement = document.querySelector(".tries span");
  if (first.dataset.tech === second.dataset.tech) {
    first.classList.remove("is-flipped");
    second.classList.remove("is-flipped");
    first.classList.add("matched");
    second.classList.add("matched");
    document.getElementById("success").play();
    Swal.fire({
      icon: "success",
      title: "Successful",
      width: 600,
      padding: "3em",
      color: "green",
      background: "#fff url(/images/trees.png)",
      backdrop: `
      rgba(0,0,123,0.4)
          url("/image/nyan-cat-rainbow.gif")
          left top
          no-repeat
        `,
    });
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      first.classList.remove("is-flipped");
      second.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}
