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
      htmldivisa += `<option value="${divisa.valor}">${divisa.codigo}</option>`;
    }
  });
  seleccion.innerHTML = htmldivisa;
}

renderizarDivisas();

botonCalcular.addEventListener("click", function () {
  let taza = parseFloat(seleccion.value);
  const clp = parseFloat(input.value);

  if (!isNaN(clp) && !isNaN(taza)) {
    const conversion = clp / taza;
    resultado.textContent = `Resultado : ${conversion.toFixed(2)}`;
  
     
  }

  else {
    resultado.textContent = "Por favor ingrese un resultado valido";
  }


});


function preparacionGrafica(coins) {
  const fechas = coins.map((coin) => coin.fecha.slice(0, 10)); 
  const valores = coins.map((coin) => coin.valor); 

  const config = {
      type: "line",
      data: {
          labels: fechas,
          datasets: [{
              label: "Historial de valores",
              backgroundColor: "red",
              data: valores,
              fill: false,
          }],
      },
  };
  return config;
}





async function renderizarGrafica(codigoDivisa) {
  try {
      const res = await fetch(`https://mindicador.cl/api/${codigoDivisa}`);
      const data = await res.json();
      graficoDivisa.clearRect(0, 0, graficoDivisa.canvas.width, graficoDivisa.canvas.height); 
      const config = preparacionGrafica(data.serie);
      new Chart(graficoDivisa, config);
      console.log("Gráfica creada");
  } catch (e) {
      console.error("Error al obtener datos para la gráfica:", e);
  }
}


renderizarGrafica("dolar");
