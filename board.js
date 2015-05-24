class Board {
    constructor() {
        this.tiles = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    }
    print() {
        this.tiles.map(x => x.join(' ')).map(x => console.log(x));
    }
    addRandom() {
        let empty = [];
        this.tiles.forEach(function(x,i) {
            x.forEach(function(y,j) {
                if(y == 0)
                    empty.push([i,j]);
            });
        });
        const random = empty[Math.floor(Math.random()*empty.length)];
        this.tiles[random[0]][random[1]] = 2
    }
    slideLeft() {
        let w = 0;
        let tiles = [[],[],[],[]];
        this.tiles.forEach(function(x,i){
            let r = x.filter(x => x!=0 );
            for (let j =0; j < r.length; j++) {
                if(!r[j]) {continue;}
                if(r[j]==r[j+1]) {
                    tiles[i].push(2 * r[j]);
                    if(2 * r[j] == 2048)
                        w = true;
                    r[j+1] = false;
                }
                else
                    tiles[i].push(r[j]);
            }
        });
        tiles.forEach(function(x,i) {
            for(let j = x.length; j<4;j++)
                tiles[i].push(0);
        });
        //compare two arrays
        if(JSON.stringify(this.tiles) != JSON.stringify(tiles)) {
            this.tiles = tiles;
            this.addRandom();
        }
        return w;
    }
    rotateLeft() {
        function getCol(arr, col) {
            let column = [];
            for(let i=0; i<arr.length; i++){
                column.push(arr[i][col]);
            }
            return column;
        }
        let tiles = [getCol(this.tiles,3), getCol(this.tiles,2),
            getCol(this.tiles,1),getCol(this.tiles,0)];
        this.tiles = tiles;
    }
    slide(direction) {
        // 0 -> left, 1 -> up, 2 -> right, 3 -> down
        for(let i = 0; i < direction; i++)
            this.rotateLeft();
        this.slideLeft();
        for (var i = direction; i < 4; i++) {
            this.rotateLeft();
        }
    }
    hasLost() {

    }
}
let board = new Board();