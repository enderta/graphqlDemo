function findTypeOfTriangle(a,b,c){
    if(a<=0 || b<=0 || c<=0){
        return "Not a valid triangle";
    }
    if(a+b<=c || b+c<=a || c+a<=b){
        return "Not a valid triangle";
    }
    if(a==b && b==c){
        return "Equilateral Triangle";
    }
    if(a==b || b==c || c==a){
        return "Isosceles Triangle";
    }
    if(a!=b && b!=c && c!=a){
        return "Scalene Triangle";
    }
}

// console.log(findTypeOfTriangle(3,3,3));
// console.log(findTypeOfTriangle(2,3,4));
// console.log(findTypeOfTriangle(1,0,33));
const currentOutput=findTypeOfTriangle(4,4,4);//-->actual value
const targetOutput="Equilateral Triangle";//--> idea
console.assert(currentOutput==targetOutput,
    "current output: %s, target output: %s 1",
    currentOutput,
    targetOutput
);//--> test/check
const currentOutput1=findTypeOfTriangle(3,3,5);
const targetOutput1="Isosceles Triangle";
console.assert(currentOutput1==targetOutput1,
    "current output: %s, target output: %s 2",
    currentOutput1,
    targetOutput1
);//--> test/check
const currentOutput2=findTypeOfTriangle(3,5,3);
const targetOutput2="Isosceles Triangle";
console.assert(currentOutput2==targetOutput2,
    "current output: %s, target output: %s 3",
    currentOutput2,
    targetOutput2
);//--> test/check
const currentOutput3=findTypeOfTriangle(5,3,3);
const targetOutput3="Isosceles Triangle";
console.assert(currentOutput3==targetOutput3,
    "current output: %s, target output: %s 4",
    currentOutput3,
    targetOutput3
);//--> test/check
const currentOutput4=findTypeOfTriangle(3,4,5);
const targetOutput4="Scalene Triangle";
console.assert(currentOutput4==targetOutput4,
    "current output: %s, target output: %s 5",
    currentOutput4,
    targetOutput4
);//--> test/check
const currentOutput5=findTypeOfTriangle(-1,5,4);
const targetOutput5="Not a valid triangle 6";
console.assert(currentOutput5==targetOutput5,
    "current output: %s, target output: %s",
    currentOutput5,
    targetOutput5
);//--> test/check
const currentOutput6=findTypeOfTriangle(0,5,-2);
const targetOutput6="Not a valid triangle 7";
console.assert(currentOutput6==targetOutput6,
    "current output: %s, target output: %s",
    currentOutput6,
    targetOutput6
);//--> test/check
const currentOutput7=findTypeOfTriangle(1,1,5);
const targetOutput7="Not a valid triangle";
console.assert(currentOutput7==targetOutput7,
    "current output: %s, target output: %s 8",
    currentOutput7,
    targetOutput7
);//--> test/check