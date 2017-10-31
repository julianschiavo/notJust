function toBraille(dots){
    /*
    14
    25
    36
    78
    */
    var off=dots[0][0]<<0|dots[1][0]<<1|dots[2][0]<<2|dots[0][1]<<3|dots[1][1]<<4|dots[2][1]<<5|dots[3][0]<<6|dots[3][1]<<7;
    return String.fromCharCode(0x2800+off);
}
function makePad(){
    return [[0,0],[0,0],[0,0],[0,0]];
}
function makeGrid(x,y){
    var world=[];
    for(var i=0;i<y;i++){
        world.push([]);
        for(var j=0;j<x;j++){
            world[i].push(makePad());
        }
    }
    return world;
}
function splitGrid(arr){
    var grid=makeGrid(Math.ceil(arr[0].length/2),Math.ceil(arr.length/4));
    for (var y=0;y<arr.length;y++){
        for(var x=0;x<arr[0].length;x++){
            grid[Math.floor(y/4)][Math.floor(x/2)][y%4][x%2]=arr[y][x];
        }
    }
    return grid;
}
function mapGrid(arr){
    return arr.map(a=>a.map(toBraille).join("")).join("\n");
}
function split(img){
    return img.split("\n").map(a=>a.split("").map(a=>parseInt(a,2)))
}
module.exports=(data)=>mapGrid(splitGrid(split(data)));
