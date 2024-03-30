let Buttons1 = document.querySelectorAll(".first-part .Buttons label");
let Buttons2 = document.querySelectorAll(".second-part .Buttons label");
let input1 = document.querySelector(".input1");
let input2 = document.querySelector(".input2");
let textTo = document.querySelector(".textTo");
let textFrom = document.querySelector(".textFrom");
let Based;
let Ratess;

Buttons1.forEach((select) => {
  select.addEventListener("click", () => {
    Based = select.innerText;
    input1Change();
  });
});
Buttons2.forEach((select) => {
  select.addEventListener("click", () => {
    Ratess = select.innerText;
    input2Change();
  });
});

async function input1Change() {
  let res = await fetch(
    `https://api.exchangerate.host/latest?base=${Based}&symbols=${Ratess}`
  );
  let data = await res.json();
  input2.value = (input1.value * Object.values(data.rates)[0]).toFixed(3);

  if (Based && Ratess) {
    textTo.innerHTML = `1${Based} = ${Object.values(data.rates)[0].toFixed(
      3
    )} ${Ratess}`;
    textFrom.innerHTML = `1${Ratess}= ${(
      1 / Object.values(data.rates)[0]
    ).toFixed(3)} ${Based}`;
  }
}

async function input2Change() {
  let res = await fetch(
    `https://api.exchangerate.host/latest?base=${Based}&symbols=${Ratess}`
  );
  let data = await res.json();
  input1.value = (input2.value / Object.values(data.rates)[0]).toFixed(2);
}
input1.addEventListener("keyup", input1Change);
input2.addEventListener("keyup", input2Change);
