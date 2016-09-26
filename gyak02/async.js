"use strict";

function waitFor(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}

waitFor(1000).then(function() {
    console.log(1);
});
console.log(2);

function* gen() {
    const a = yield 1;
    const b = yield 2;
    yield a+b;
    return 'sima';
}

var it = gen();

console.log(it.next());
console.log(it.next(30));
console.log(it.next(12));
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());