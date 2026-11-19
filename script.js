const valorEntrada = document.getElementById("valor-entrada");
const unidadeOrigem = document.getElementById("unidade-origem");
const unidadeDestino = document.getElementById("unidade-destino");
const btnInverter = document.getElementById("btn-inverter");
const resultadoBox = document.getElementById("resultado-box");
const valorResultado = document.getElementById("valor-resultado");
const formulaTexto = document.getElementById("formula-texto");
const presetButtons = document.querySelectorAll(".preset-btn");

const CATEGORIAS = {
  c: "temperatura",
  f: "temperatura",
  m: "distancia",
  km: "distancia",
  mi: "distancia",
};

const SIMBOLOS = {
  c: "°C",
  f: "°F",
  m: "m",
  km: "km",
  mi: "mi",
};

const PARA_METROS = {
  m: 1,
  km: 1000,
  mi: 1609.344,
};

const FORMULAS = {
  "c->f": "Fórmula: (°C × 9/5) + 32",
  "f->c": "Fórmula: (°F − 32) × 5/9",
  "m->km": "Fórmula: m ÷ 1.000",
  "km->m": "Fórmula: km × 1.000",
  "m->mi": "Fórmula: m ÷ 1.609,344",
  "mi->m": "Fórmula: mi × 1.609,344",
  "km->mi": "Fórmula: km ÷ 1,609344",
  "mi->km": "Fórmula: mi × 1,609344",
};

function formatarNumero(num) {
  if (!Number.isFinite(num)) return "—";
  const arredondado = Math.round(num * 1e6) / 1e6;
  return arredondado.toLocaleString("pt-BR", {
    maximumFractionDigits: 6,
  });
}

function converter(valor, origem, destino) {
  if (origem === destino) {
    return {
      ok: true,
      valorConvertido: valor,
      formula: "Mesma unidade: valor mantido",
    };
  }

  if (CATEGORIAS[origem] !== CATEGORIAS[destino]) {
    return {
      ok: false,
      mensagem: "Não é possível converter temperatura diretamente para distância.",
      formula: "Escolha duas unidades de temperatura ou duas de distância.",
    };
  }

  if (CATEGORIAS[origem] === "temperatura") {
    const convertido =
      origem === "c" ? (valor * 9) / 5 + 32 : ((valor - 32) * 5) / 9;

    return {
      ok: true,
      valorConvertido: convertido,
      formula: FORMULAS[`${origem}->${destino}`],
    };
  }

  const emMetros = valor * PARA_METROS[origem];
  const convertido = emMetros / PARA_METROS[destino];

  return {
    ok: true,
    valorConvertido: convertido,
    formula: FORMULAS[`${origem}->${destino}`],
  };
}

function atualizarTela() {
  const raw = valorEntrada.value.trim();
  const origem = unidadeOrigem.value;
  const destino = unidadeDestino.value;

  if (raw === "" || Number.isNaN(Number(raw))) {
    resultadoBox.classList.remove("is-error");
    valorResultado.textContent = `— ${SIMBOLOS[destino]}`;
    formulaTexto.textContent = "Digite um valor numérico para converter.";
    return;
  }

  const numero = Number(raw);
  const res = converter(numero, origem, destino);

  if (!res.ok) {
    resultadoBox.classList.add("is-error");
    valorResultado.textContent = res.mensagem;
    formulaTexto.textContent = res.formula;
    return;
  }

  resultadoBox.classList.remove("is-error");
  valorResultado.textContent = `${formatarNumero(res.valorConvertido)} ${SIMBOLOS[destino]}`;
  formulaTexto.textContent = res.formula;
}

btnInverter.addEventListener("click", () => {
  const temp = unidadeOrigem.value;
  unidadeOrigem.value = unidadeDestino.value;
  unidadeDestino.value = temp;
  atualizarTela();
});

presetButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    valorEntrada.value = btn.dataset.val;
    unidadeOrigem.value = btn.dataset.from;
    unidadeDestino.value = btn.dataset.to;
    atualizarTela();
  });
});

valorEntrada.addEventListener("input", atualizarTela);
unidadeOrigem.addEventListener("change", atualizarTela);
unidadeDestino.addEventListener("change", atualizarTela);

atualizarTela();