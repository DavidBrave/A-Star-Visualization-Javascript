var jp = jp || {};

$(document).ready(function () {
    var _private = {
        outOfBounds: function (x, y) {
            return x < 0 || x >= jp.map.data[0].length ||
                y < 0 || y >= jp.map.data.length;
        }
    };

    jp.map = {
        // Current map
        data: null,

        setData: function (map) {
            this.data = map;
            return this;
        },

        getWidthInTiles: function () {
            return this.data[0].length;
        },

        getHeightInTiles: function () {
            return this.data.length;
        },

        blocked: function (x, y) {
            if (_private.outOfBounds(x, y)) {
                return true;
            }

            if (this.data[y][x] === 0) {
                return true;
            }

            return false;
        },

        getNeighbors: function (x, y) {
            var neighbors = [];



            // // Top
            // if (!this.blocked(x, y - 1)) neighbors.push(new jp.Tile(x, y - 1));

            // // Top Right
            // if (
            //     !this.blocked(x + 1, y - 1) &&
            //     !this.blocked(x + 1, y) &&
            //     !this.blocked(x, y - 1)
            // ) {
            //     neighbors.push(new jp.Tile(x + 1, y - 1));
            // }

            // // Right
            // if (!this.blocked(x - 1, y)) neighbors.push(new jp.Tile(x - 1, y));

            // // Bottom Right
            // if (
            //     !this.blocked(x + 1, y + 1) &&
            //     !this.blocked(x + 1, y) &&
            //     !this.blocked(x, y + 1)
            // ) {
            //     neighbors.push(new jp.Tile(x + 1, y + 1));
            // }

            // // Bottom
            // if (!this.blocked(x, y + 1)) neighbors.push(new jp.Tile(x, y + 1));

            // // Bottom Left
            // if (
            //     !this.blocked(x - 1, y + 1) &&
            //     !this.blocked(x - 1, y) &&
            //     !this.blocked(x, y + 1)
            // ) {
            //     neighbors.push(new jp.Tile(x - 1, y + 1));
            // }

            // // Left
            // if (!this.blocked(x + 1, y)) neighbors.push(new jp.Tile(x + 1, y));

            // // Top Left
            // if (
            //     !this.blocked(x - 1, y - 1) &&
            //     !this.blocked(x - 1, y) &&
            //     !this.blocked(x, y - 1)
            // ) {
            //     neighbors.push(new jp.Tile(x - 1, y - 1));
            // }


            // Check left, right, top, bottom
            if (!this.blocked(x + 1, y)) neighbors.push(new jp.Tile(x + 1, y));
            if (!this.blocked(x - 1, y)) neighbors.push(new jp.Tile(x - 1, y));
            if (!this.blocked(x, y + 1)) neighbors.push(new jp.Tile(x, y + 1));
            if (!this.blocked(x, y - 1)) neighbors.push(new jp.Tile(x, y - 1));

            
            if (
                !this.blocked(x + 1, y + 1) &&
                !this.blocked(x + 1, y) &&
                !this.blocked(x, y + 1)
            ) {
                neighbors.push(new jp.Tile(x + 1, y + 1)); // down-right
            }

            if (
                !this.blocked(x - 1, y + 1) &&
                !this.blocked(x - 1, y) &&
                !this.blocked(x, y + 1)
            ) {
                neighbors.push(new jp.Tile(x - 1, y + 1)); // down-left
            }

            if (
                !this.blocked(x + 1, y - 1) &&
                !this.blocked(x + 1, y) &&
                !this.blocked(x, y - 1)
            ) {
                neighbors.push(new jp.Tile(x + 1, y - 1)); // up-right
            }

            if (
                !this.blocked(x - 1, y - 1) &&
                !this.blocked(x - 1, y) &&
                !this.blocked(x, y - 1)
            ) {
                neighbors.push(new jp.Tile(x - 1, y - 1)); // up-left
            }
            



            return neighbors;
        },


        // Only works when moving to adjacent levels
        getCost: function (xC, yC, xT, yT) {
            return this.data[yT][xT];
        }


    };
});