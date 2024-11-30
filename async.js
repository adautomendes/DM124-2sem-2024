const print = value => console.log(`${value}`);

print("1");
setTimeout(() => print("2"), 5000); //sleep
setTimeout(() => print("3"), 4000); //sleep
setTimeout(() => print("4"), 2000); //sleep