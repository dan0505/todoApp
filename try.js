// boxArray = [Nan, Nan, Nan, Nan, Nan, Nan, Nan, Nan, Nan];
boxArray = ["x", "x", "x", "o", "o", NaN, NaN, NaN, NaN];
boxStrX = "111000000";
boxStrO = "001100000";


// "111000000","000"
let str = {
    "x": "",
    "o":""
};
for (player of ["x", "o"]) {
    for (box in boxArray) {
        if (boxArray[box] === player) {
            str[player] += "1"; 
        } else {
            str[player] += "0";  
        }
    }
}
console.log(str)