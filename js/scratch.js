function weightedRandom(min, max) {
    return Math.round(max / (Math.random() * max + min));
}
let draws = [];
for(let r = 0; r < 100; r++){
    let draw = weightedRandom(1,100);
    if(draws[draw]){
        draws[draw] = draws[draw] + 1;
    }
    else{
        draws[draw] = 1;
    }
}
console.log(draws);