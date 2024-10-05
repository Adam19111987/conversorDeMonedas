const input = document.querySelector("#input");
const seleccion = document.querySelector("#divisas");
const botonCalcular = document.querySelector("#calcular");
const resultado = document.querySelector("#resultado");

async function getDivisas() {
  try {
    const res = await fetch("https://mindicador.cl/api/");
    const divisa = await res.json();
    return divisa;
  } catch (e) {
    const errofecht = document.querySelector("#errorCatch");
    errofecht.textContent = `Error : ${e.message}`;
  }
}

async function renderizarDivisas() {
  const divisas = await getDivisas();
  let htmldivisa = "";

  Object.values(divisas).forEach((divisa) => {
    if (divisa.unidad_medida === "Pesos") {
      htmldivisa += `<option value="${divisa.codigo}">${divisa.codigo}</option>`;
    }
  });
  seleccion.innerHTML = htmldivisa;
}

renderizarDivisas();

botonCalcular.addEventListener("click", function () {
  let codigoDivisa = seleccion.value;
  const clp = parseFloat(input.value);

  if (!isNaN(clp) && codigoDivisa) {
    rendergrafica(codigoDivisa);
  } else {
    resultado.textContent = "Por favor ingrese un valor válido";
  }
});

function prepararrenderizargraficas(fechas, valores) {
  const tipografica = "line";
  const titulo = "Relación de precio versus los últimos 10 días";
  const colordeLinea = "red";

  const config = {
    type: tipografica,
    data: {
      labels: fechas,
      datasets: [
        {
          label: titulo,
          backgroundColor: colordeLinea,
          borderColor: colordeLinea,
          data: valores,
        },
      ],
    },
  };
  return config;
}

async function rendergrafica(codigoDivisa) {
  const monedas = await getDivisas();
  const divisaSeleccionada = monedas[codigoDivisa];
  
  if (divisaSeleccionada && divisaSeleccionada.serie) {
    const ultimasFechas = divisaSeleccionada.serie
      .slice(0, 10)
      .map((entrada) => new Date(entrada.fecha).toLocaleDateString());
    
    const ultimosValores = divisaSeleccionada.serie
      .slice(0, 10)
      .map((entrada) => entrada.valor);

    const config = prepararrenderizargraficas(
      ultimasFechas.reverse(),
      ultimosValores.reverse()
    );

    const charDom = document.getElementById("grafico");
    new Chart(charDom, config);
  }
}
 