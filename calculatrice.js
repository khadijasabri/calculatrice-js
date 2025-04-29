function initialiser_calc(calcId) {
  var display = document.getElementById(calcId + "_resultat");
  if (display) {
    display.value = "";
  }
}

function add_calc(calcId, value) {
  var display = document.getElementById(calcId + "_resultat");
  if (display) {
    if (display.value === "Erreur") {
      display.value = "";
    }
    display.value += value;
  }
}

function f_calc(calcId, op) {
  var display = document.getElementById(calcId + "_resultat");
  if (!display) return;

  if (op === "ce") {
    display.value = "";
  } else if (op === "nbs") {
    display.value = display.value.slice(0, -1);
  } else if (op === "=") {
    try {
      let expression = display.value;
      expression = expression.replace(/,/g, ".");
      expression = expression.replace(/(\d+)%/g, "($1*0.01)");
      let result = eval(expression);
      display.value = result;
    } catch (error) {
      display.value = "Erreur";
    }
  } else if (op === "+-") {
    if (display.value !== "") {
      let number = parseFloat(display.value);
      if (!isNaN(number)) {
        display.value = (-number).toString();
      }
    }
  } else {
    if (display.value === "Erreur") {
      display.value = "";
    }
    display.value += op;
  }
}

function key_detect_calc(calcId, event) {
  var key = event.key;
  if ((key >= "0" && key <= "9") || key === "." || key === ",") {
    add_calc(calcId, key);
  } else if (key === "Enter") {
    f_calc(calcId, "=");
  } else if (key === "Backspace") {
    f_calc(calcId, "nbs");
  } else if (key === "Escape") {
    f_calc(calcId, "ce");
  } else if (["+", "-", "*", "/", "%"].indexOf(key) !== -1) {
    f_calc(calcId, key);
  } else {
    return true;
  }
  event.preventDefault();
  return false;
}
