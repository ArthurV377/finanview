
export function validarValor(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) && numero > 0;
}

export function calcularConversao(valor, taxa) {
  return Number(valor) * Number(taxa);
}

export function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}
