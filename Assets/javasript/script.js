const input = document.querySelector("#input");
const seleccion = document.querySelector("#divisas");
const botonCalcular = document.querySelector("#calcular");
const resultado = document.querySelector("#resultado");

async function getDivisas() {
 try { const res = await fetch("https://mindicador.cl/api/");
  const divisa = await res.json();
  return divisa}

  
  catch(e){
    const errofecht = document.querySelector('#errorCatch');
    errofecht.textContent = `Error : ${e.message}`
  }
}
 
async function renderizarDivisas() {
  const divisas = await getDivisas();
  let htmldivisa = "";

  Object.values(divisas).forEach((divisa) => {
    if (divisa.unidad_medida === "Pesos") {
      htmldivisa += `<option value="${divisa.valor}">${divisa.nombre}</option>`;
    }
  });
  seleccion.innerHTML = htmldivisa;
}

renderizarDivisas();



botonCalcular.addEventListener('click', function(){
  const taza = parseFloat(seleccion.value);
  const clp = parseFloat(input.value);

  if(!isNaN(clp) && !isNaN(taza)){
    const conversion = clp / taza;
    resultado.textContent = `Resultado : ${conversion.toFixed(2)}`;
    rendergrafica();
  }
  else {
    resultado.textContent = "Por favor ingrese un resultado valido";
  }
});


 function prepararrenderizargraficas(divisas){
  const tipografica = "line";
  const divisasFiltradas = Object.values(divisas).filter(divisa => divisa.unidad_medida === "Pesos");
  const tipodivisa = divisasFiltradas.map(divisa => divisa.nombre);
  const titulo = "Tipo de cambio";
  const colordeLinea = "red";
  const peso = divisasFiltradas.map(divisa => divisa.valor

  );
  
  const config = {
    type : tipografica,
    data :{
      labels : tipodivisa,
      datasets : [
        {
          label : titulo,
          backgroundColor : colordeLinea,
          data : peso
        }
      ]
      
    }
  }
  return config;
}

async function rendergrafica(){
  const monedas = await getDivisas();
  const config = prepararrenderizargraficas(monedas);
  const charDom = document.getElementById("grafico");
  new Chart(charDom, config);



}
