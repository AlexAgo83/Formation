"use strict";
var a = "test";
var aa = "test";
var b = 3;
var c = true;
var d = null;
var e = ["a", "b"];
var f = { fName: "Toto", lName: "Tata" };
var g = { test1: "Test 1", test2: "Test 2" };
var h = new Date();
var ia = function (e) { };
function printCode(code) {
    console.log(code.toString());
}
var compteur = document.querySelector('#compteur');
var i = 0;
var increment = function (e) {
    i++;
    var span = compteur === null || compteur === void 0 ? void 0 : compteur.querySelector('span');
    if (span) {
        span.innerText = i.toString();
    }
};
compteur === null || compteur === void 0 ? void 0 : compteur.addEventListener('click', increment);
