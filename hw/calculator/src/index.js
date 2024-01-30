window.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".keys");
  const display = document.querySelector(".display > input");

  btn.addEventListener("click", function (e) {
    if (validate(/^\d$/, e.target.value)) {
      calc.value1 += e.target.value;
      // відображаєм введене перше значення
      show(calc.value1, display);
    } else if (validate(/^[*+-/]$/, e.target.value)) {
      // робимо перевірку, якщо перше значення вже є то ми його збережемо в другому значенні а перше значення очистимо
      if (calc.value1 !== "") {
        calc.value2 = calc.value1;
        calc.value1 = "";
        // записуємо в памʼять введене значеня і вибраний оператор це дасть нам змогу ввести друге значення і не затерти перше і вибрану математичну операцію
        calc.his = calc.value2 + e.target.value;
      }
    } else if (validate(/^=$/, e.target.value)) {
      if (calc.value1 !== "" && calc.value2 !== "" && calc.his !== "") {
        // робимо вичеслення двух значень і збережемо його в rez
        calc.rez = eval(calc.his + calc.value1);
        show(calc.rez, display);
        // перезапишем результат вичеслення в змінну his щоб можна було потім використати це знаяення з пямʼяті
        calc.his = calc.rez;
        // очистимо всі інші змінні
        calc.value2 = "";
        calc.rez = "";
        calc.value1 = "";
      }
    } else if (validate(/^m[\+\-]$/, e.target.value)) {
      calc.value2 = "m";
      show(calc.value2, display);
    } else if (validate(/^[a-z]+$/, e.target.value)) {
      // при натиску кнопка mrc виводить те що збережено в his
      show(calc.his, display);
      // при наступному натиску данні з his видаляються
      if (calc.his !== "") {
        calc.his = "";
      }
    } else if (validate(/^[C]$/, e.target.value)) {
      calc.value1 = "";
      calc.value2 = "";
      calc.rez = "";
      calc.his = "";
      show("", display);
    }
  });
});

function validate(pattern, value) {
  return pattern.test(value);
}

const calc = {
  value1: "",
  value2: "",
  rez: "",
  his: "",
};

function show(value, el) {
  el.value = value;
}
