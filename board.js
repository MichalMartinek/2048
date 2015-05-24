class Board {
    constructor() {
        this.tiles = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        this.addRandom();
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
        let w = false;
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
        this.tiles = [getCol(this.tiles,3), getCol(this.tiles,2),
            getCol(this.tiles,1),getCol(this.tiles,0)];
    }
    slide(direction) {
        /*  1
          0   2
            3   */
        for(let i = 0; i < direction; i++)
            this.rotateLeft();
        let w = this.slideLeft();
        for (let i = direction; i < 4; i++) {
            this.rotateLeft();
        }
        return w;
    }
    hasLost () {
        let canMove = false;
        let deltaX = [-1, 0, 1, 0];
        let deltaY = [0, -1, 0, 1];
        for (let i = 0; i < 4; i++) {
            for (let j =0; j < 4; j++) {
                canMove |= (this.tiles[i][j] == 0);
                for (let k = 0; k < 4; k++) {
                    var newRow = i + deltaX[k];
                    var newColumn = j + deltaY[k];
                    if (newRow < 0 || newRow >= 4 || newColumn < 0
                        || newColumn >= 4) {
                        continue;
                    }
                    canMove|= (this.tiles[i][j]==this.tiles[newRow][newColumn]);
                }
            }
        }
        return !canMove;
    }
}
class Game {
    constructor() {
        this.board = new Board();
    }
    slide(direction) {
        if(this.board.slide(direction)) {
            //TODO: Výhra
            alert("Výhra");
        }
        else if(this.board.hasLost()) {
            //TODO: Prohra
            alert("Prohra");
        }
        this.board.print();
    }
    restart() {
        this.board = new Board();
    }
}
let g = new Game();