function insert(num) {
  var num2 = document.getElementById("numerosDisplay").innerHTML;
  document.getElementById("numerosDisplay").innerHTML = num2 + num;
}

function clearDisplay() {
  document.getElementById("numerosDisplay").innerHTML = "";
}
