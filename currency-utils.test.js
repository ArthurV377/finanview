
import {
  validarValor,
  calcularConversao,
  formatarData
} from "./currency-utils.js";

describe("validarValor", () => {
  test("aceita valores positivos", () => {
expect(validarValor(10)).toBe(true);  });

  test("rejeita zero e valores negativos", () => {
    expect(validarValor(0)).toBe(false);
    expect(validarValor(-5)).toBe(false);
  });

  test("rejeita textos não numéricos", () => {
    expect(validarValor("abc")).toBe(false);
  });
});

describe("calcularConversao", () => {
  test("multiplica o valor pela taxa de câmbio", () => {
    expect(calcularConversao(10, 5.2)).toBeCloseTo(52);
  });
});

describe("formatarData", () => {
  test("converte a data para o formato brasileiro", () => {
    expect(formatarData("2026-10-24")).toBe("24/10/2026");
  });
});
