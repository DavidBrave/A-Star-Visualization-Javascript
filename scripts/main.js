var jp = jp || {};

$(document).ready(function () {
    var $BTN_PATH = $('#calculate'),
        $BTN_VISUAL = $('#visualize'),
        $BTN_ERASE = $('#erase');

    var _event = {
        findPath: function () {
            var begin = jp.visual.getBegin(),
                end = jp.visual.getEnd();

            jp.map.setData(jp.visual.getMap());
            var path = jp.pathFinder.findPath(begin.x, begin.y, end.x, end.y);
            jp.pathFinder.setVisual();
            jp.visual.setTileGroup(path, 'path')
        },

        findPathVisualized: async function () {
            var begin = jp.visual.getBegin(),
                end = jp.visual.getEnd();

            // Load current map state into pathfinder
            jp.map.setData(jp.visual.getMap());
            jp.pathFinder.reset();

            // Add the starting node to open list
            jp.pathFinder.addOpen(new jp.Step(begin.x, begin.y, end.x, end.y, 0, false));

            // Disable buttons during visualization to prevent double-clicks
            $('#visualize, #calculate, #set-begin, #set-end, #erase').prop('disabled', true);

            while (jp.pathFinder.open.length > 0) {
                // Pick the best node from the open list
                let current = jp.pathFinder.getBestOpen();

                // Update map visuals for open/closed sets
                jp.pathFinder.setVisual();

                // Highlight the current node being expanded
                jp.visual.setTile(current, 'current');

                // Wait so user can see the current node
                await new Promise(r => setTimeout(r, 20));

                // Check if this is the goal node
                if (current.x === end.x && current.y === end.y) {
                    let path = jp.pathFinder.buildPath(current, []);
                    jp.visual.setTileGroup(path, 'path');
                    $('#visualize, #calculate, #set-begin, #set-end, #erase').prop('disabled', false);
                    return;
                }

                // Move this node to the closed list
                jp.pathFinder.removeOpen(current).addClosed(current);

                // Explore all its valid neighbors
                let neighbors = jp.map.getNeighbors(current.x, current.y);
                for (let i = 0; i < neighbors.length; i++) {
                    let n = neighbors[i];

                    // 🔹 Highlight the neighbor being checked
                    jp.visual.setTile(n, 'neighbor-check');
                    await new Promise(r => setTimeout(r, 10)); // short delay to show highlight

                    // Cost calculations
                    let dx = n.x - current.x;
                    let dy = n.y - current.y;
                    let moveCost = Math.sqrt(dx * dx + dy * dy);

                    moveCost = Math.floor(moveCost * 10) // / 10;
                    // moveCost = Math.ceil(moveCost * 10) // / 10;

                    let stepCost = current.g + moveCost;

                    // Skip if neighbor is in closed set with a better path
                    let neighborRecord = jp.pathFinder.inClosed(n);
                    if (neighborRecord && stepCost >= neighborRecord.g) continue;

                    // Add or update neighbor in open set
                    neighborRecord = jp.pathFinder.inOpen(n);
                    if (!neighborRecord || stepCost < neighborRecord.g) {
                        if (!neighborRecord) {
                            jp.pathFinder.addOpen(new jp.Step(n.x, n.y, end.x, end.y, stepCost, current));
                        } else {
                            neighborRecord.parent = current;
                            neighborRecord.g = stepCost;
                            neighborRecord.f = stepCost + neighborRecord.h;
                        }
                    }

                    // Reset the grid visuals after checking each neighbor
                    jp.pathFinder.setVisual();
                    jp.visual.setTile(current, 'current'); // re-highlight current node
                }

                // Wait briefly before expanding the next node
                await new Promise(r => setTimeout(r, 10));
            }

            // If no path found
            alert('No path found!');
            $('#visualize, #calculate, #set-begin, #set-end, #erase').prop('disabled', false);
        }

    };

    var main = {
        init: function () {
            jp.visual.init();
            this.bind();
        },

        bind: function () {
            $BTN_PATH.click(_event.findPath);
            $BTN_VISUAL.click(_event.findPathVisualized);
            $BTN_ERASE.click(jp.visual.erase);
        }
    };

    main.init();
});