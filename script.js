let numcartas = prompt(
  "Quantas cartas você deseja jogar? (Números pares de 4 a 14)"
);
let numvalido = false;
let numjogadas = 0;

escolhernumcartas();
function escolhernumcartas() {
  while (numvalido === false) {
    if (numcartas < 4 || numcartas > 14) {
      numcartas = prompt(
        "Quantas cartas você deseja jogar? (Números pares de 4 a 14)"
      );
      numvalido = false;
    } else if (numcartas % 2 !== 0) {
      numcartas = prompt(
        "Quantas cartas você deseja jogar? (Números pares de 4 a 14)"
      );
      numvalido = false;
    } else {
      numvalido = true;
    }
  }
}

const figuras = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot",
];

let baralho = [];

baralhoaleatorio();

function baralhoaleatorio() {
  for (let i = 0; i < numcartas / 2; i++) {
    const carta = criarcarta(i);
    baralho.push(carta);
    baralho.push(carta);
  }
  baralho.sort(comparador);
}

function comparador() {
  return Math.random() - 0.5;
}

function criarcarta(indicecarta) {
  const figura = figuras[indicecarta];
  const cartafigura = `
      <div class="cartas" onclick="selecionarcarta(this)">
        <div class="carta frente">
        <img src="img/front.png">
        </div>
        <div class="carta verso">
        <img src="img/${figura}.gif">
        </div>
      </div> 
`;
  return cartafigura;
}

let primeiracarta = null;
let segundacarta = null;

function selecionarcarta(divcarta) {
  if (divcarta.classList.contains("selecionada") || segundacarta !== null) {
    return;
  }
  numjogadas++;
  divcarta.classList.add("selecionada");

  if (primeiracarta === null) {
    primeiracarta = divcarta;
  } else {
    segundacarta = divcarta;
    validarcartas();
  }
}

function validarcartas() {
  if (primeiracarta.innerHTML === segundacarta.innerHTML) {
    primeiracarta.classList.add("finalizada");
    segundacarta.classList.add("finalizada");
    primeiracarta = null;
    segundacarta = null;
    setTimeout(verificarfinaljogo, 500);
  } else {
    setTimeout(desvirarcartas, 1000);
  }
}

function desvirarcartas() {
  primeiracarta.classList.remove("selecionada");
  segundacarta.classList.remove("selecionada");
  primeiracarta = null;
  segundacarta = null;
}

function inserircartas() {
  const conteudo = document.querySelector(".conteudo");

  for (let i = 0; i < baralho.length; i++) {
    const carta = baralho[i];
    conteudo.innerHTML = conteudo.innerHTML + carta;
  }
}
inserircartas();

function verificarfinaljogo() {
  const cartasfinalizadas = document.querySelectorAll(".finalizada");
  if (cartasfinalizadas.length == numcartas) {
    alert(`"Você Ganhou em ${numjogadas} jogadas!"`);
  }
}
