'use strict';

let k = 10;
let j = 0;

while (j <= k) {
    console.log('J en el While es ' );
    j++;
}

let l = 0;
let cumple = false;
while (cumple == false) {
    if(l > k){
        cumple = true;
    }
    l++;
    console.log('cumple es ' + cumple);
}

let m = 110;
do {    
    console.log('m en el do while es ');
    m++;
} while (m <= k);

for (let i = 0; i <= k; i++) {
  console.log('i en el for es ');
}


let notas = new Array(80, 75, 90, 85, 75, 94, 88, 45, 100, 50);

console.log(notas);
console.log(notas[4]);
console.log(notas.length);
notas[9] = 70;

console.log(notas);
notas.push(15);
console.log(notas);

for (let i = 0; i < notas.length; i++) {
    console.log('la nota es ' + notas[i]);    
}
