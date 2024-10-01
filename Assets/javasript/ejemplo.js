botonCalcular.addEventListener("click", function () {
    const taza = parseFloat(seleccion.value);
    const clp = parseFloat(input.value);
  
    if (!isNaN(clp) && !isNaN(taza)) {
      const conversion = clp / taza;
      resultado.textContent = `Resultado : ${conversion.toFixed(2)}`;
      
      // Aquí paso la divisa seleccionada (nombre) a la función rendergrafica
      const divisaSeleccionada = seleccion.options[seleccion.selectedIndex].text.toLowerCase();
      rendergrafica(divisaSeleccionada);
    } else {
      resultado.textContent = "Por favor ingrese un valor válido";
    }
  });
  