function f1() {
    return "Rodando f1...";
}

const f2 = function () {
    return "Rodando f2...";
}

const f3 = () => {
    return "Rodando f3..."
}

console.log(`${f1()} ${f2()} ${f3()}`);