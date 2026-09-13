const API_URL = "https://api.frankfurter.dev/v2";

const form = document.getElementById("form-conversao");
const valorInput = document.getElementById("valor");
const origemSelect = document.getElementById("moeda-origem");
const destinoSelect = document.getElementById("moeda-destino");
const botaoConverter = document.getElementById("botao-converter");
const trocarMoedas = document.getElementById("trocar-moedas");

const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");
const valorConvertido = document.getElementById("valor-convertido");
const infoOrigem = document.getElementById("info-origem");
const infoDestino = document.getElementById("info-destino");
const infoTaxa = document.getElementById("info-taxa");
const infoData = document.getElementById("info-data");

const nomesMoedas = {
  BRL: "Real brasileiro",
  USD: "Dólar americano",
  EUR: "Euro",
  GBP: "Libra esterlina",
  JPY: "Iene japonês",
  CAD: "Dólar canadense",
  AUD: "Dólar australiano",
  CHF: "Franco suíço"
};

const simbolos = {
  BRL: "R$",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "CA$",
  AUD: "A$",
  CHF: "CHF"
};

function formatarValor(valor, moeda) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: moeda
  }).format(valor);
}

function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function mostrarMensagem(texto, tipo = "") {
  mensagem.textContent = texto;
  mensagem.className = `message ${tipo}`;
}

function esconderResultado() {
  resultado.classList.add("hidden");
}

function mostrarResultado(dados, valor, origem, destino) {
  const convertido = valor * dados.rate;

  valorConvertido.textContent = formatarValor(convertido, destino);
 infoOrigem.textContent = `${dados.base} — ${nomesMoedas[dados.base] || dados.base}`;
infoDestino.textContent = `${dados.quote} — ${nomesMoedas[dados.quote] || dados.quote}`;
  infoTaxa.textContent = `1 ${origem} = ${dados.rate.toFixed(6)} ${destino}`;
  infoData.textContent = formatarData(dados.date);

  resultado.classList.remove("hidden");
}

async function converterMoeda() {
  const valor = Number(valorInput.value);
  const origem = origemSelect.value;
  const destino = destinoSelect.value;

  if (!valor || valor <= 0) {
    esconderResultado();
    mostrarMensagem("Digite um valor maior que zero.", "error");
    valorInput.focus();
    return;
  }

  if (origem === destino) {
    const dados = {
      date: new Date().toISOString().slice(0, 10),
      rate: 1
    };

    mostrarResultado(dados, valor, origem, destino);
    mostrarMensagem("As moedas são iguais. A taxa de conversão é 1 para 1.");
    return;
  }

  botaoConverter.disabled = true;
  botaoConverter.textContent = "Consultando...";
  esconderResultado();
  mostrarMensagem("Consultando a cotação...");

  try {
    const resposta = await fetch(
      `${API_URL}/rate/${origem.toLowerCase()}/${destino.toLowerCase()}`
    );

    if (!resposta.ok) {
      throw new Error("Não foi possível obter a cotação.");
    }

    const dados = await resposta.json();

    if (!dados.rate || !dados.date) {
      throw new Error("Resposta inesperada da API.");
    }

    mostrarResultado(dados, valor, origem, destino);
    mostrarMensagem("Cotação consultada com sucesso.");
  } catch (erro) {
    esconderResultado();
    mostrarMensagem(
      "Não foi possível consultar a cotação agora. Verifique sua conexão e tente novamente.",
      "error"
    );
    console.error("Erro na consulta:", erro);
  } finally {
    botaoConverter.disabled = false;
    botaoConverter.textContent = "Converter";
  }
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  converterMoeda();
});

trocarMoedas.addEventListener("click", () => {
  const moedaTemporaria = origemSelect.value;
  origemSelect.value = destinoSelect.value;
  destinoSelect.value = moedaTemporaria;

  converterMoeda();
});

converterMoeda();
