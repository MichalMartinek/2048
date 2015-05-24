"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = (function () {
    function Board() {
        _classCallCheck(this, Board);

        this.tiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        this.addRandom();
    }

    _createClass(Board, [{
        key: "print",
        value: function print() {
            this.tiles.map(function (x) {
                return x.join(" ");
            }).map(function (x) {
                return console.log(x);
            });
        }
    }, {
        key: "addRandom",
        value: function addRandom() {
            var empty = [];
            this.tiles.forEach(function (x, i) {
                x.forEach(function (y, j) {
                    if (y == 0) empty.push([i, j]);
                });
            });
            var random = empty[Math.floor(Math.random() * empty.length)];
            this.tiles[random[0]][random[1]] = 2;
        }
    }, {
        key: "slideLeft",
        value: function slideLeft() {
            var w = false;
            var tiles = [[], [], [], []];
            this.tiles.forEach(function (x, i) {
                var r = x.filter(function (x) {
                    return x != 0;
                });
                for (var j = 0; j < r.length; j++) {
                    if (!r[j]) {
                        continue;
                    }
                    if (r[j] == r[j + 1]) {
                        tiles[i].push(2 * r[j]);
                        if (2 * r[j] == 2048) w = true;
                        r[j + 1] = false;
                    } else tiles[i].push(r[j]);
                }
            });
            tiles.forEach(function (x, i) {
                for (var j = x.length; j < 4; j++) {
                    tiles[i].push(0);
                }
            });
            //compare two arrays
            if (JSON.stringify(this.tiles) != JSON.stringify(tiles)) {
                this.tiles = tiles;
                this.addRandom();
            }
            return w;
        }
    }, {
        key: "rotateLeft",
        value: function rotateLeft() {
            function getCol(arr, col) {
                var column = [];
                for (var i = 0; i < arr.length; i++) {
                    column.push(arr[i][col]);
                }
                return column;
            }
            this.tiles = [getCol(this.tiles, 3), getCol(this.tiles, 2), getCol(this.tiles, 1), getCol(this.tiles, 0)];
        }
    }, {
        key: "slide",
        value: function slide(direction) {
            /*  1
              0   2
                3   */
            for (var i = 0; i < direction; i++) {
                this.rotateLeft();
            }var w = this.slideLeft();
            for (var i = direction; i < 4; i++) {
                this.rotateLeft();
            }
            return w;
        }
    }, {
        key: "hasLost",
        value: function hasLost() {
            var canMove = false;
            var deltaX = [-1, 0, 1, 0];
            var deltaY = [0, -1, 0, 1];
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    canMove |= this.tiles[i][j] == 0;
                    for (var k = 0; k < 4; k++) {
                        var newRow = i + deltaX[k];
                        var newColumn = j + deltaY[k];
                        if (newRow < 0 || newRow >= 4 || newColumn < 0 || newColumn >= 4) {
                            continue;
                        }
                        canMove |= this.tiles[i][j] == this.tiles[newRow][newColumn];
                    }
                }
            }
            return !canMove;
        }
    }]);

    return Board;
})();

var Game = (function () {
    function Game() {
        _classCallCheck(this, Game);

        this.board = new Board();
    }

    _createClass(Game, [{
        key: "slide",
        value: function slide(direction) {
            if (this.board.slide(direction)) {
                //TODO: Výhra
                alert("Výhra");
            } else if (this.board.hasLost()) {
                //TODO: Prohra
                alert("Prohra");
            }
            this.board.print();
        }
    }, {
        key: "restart",
        value: function restart() {
            this.board = new Board();
        }
    }]);

    return Game;
})();

var g = new Game();

//# sourceMappingURL=board-compiled.js.map