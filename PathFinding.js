const MAX_VALUE = 10000000;

// Dijkstra Algorithm
exports.getCost = (nodes, start, end, consoleVersion) => {
    let cost = {};
    let parent = {};
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].x == start) {
            cost[nodes[i].x] = 0;
            parent[nodes[i].x] = -1;
        } else {
            cost[nodes[i].x] = MAX_VALUE;
        }
    }
    let H = {};
    for (let i = 0; i < nodes.length; i++) {
        H[nodes[i].x] = cost[nodes[i].x];
    }
    while (hasPositive(H)) {
        let min_index = extractMin(H, nodes);
        const min = nodes[min_index];
        H[min.x] = -1;
        for (let i = 0; i < min.edges.length; i++) {
            const edge = min.edges[i];
            const dest = Number.parseInt(cost[edge.to]);
            if (dest > Number.parseInt(cost[edge.from]) + Number.parseInt(edge.value)) {
                cost[edge.to] = Number.parseInt(cost[edge.from]) + Number.parseInt(edge.value);
                H[edge.to] = cost[edge.to];
                parent[edge.to] = edge.from;
            }
        }
    }
    const output = getPath(parent, cost[end], end);
    if (consoleVersion) {
        console.log(output);
        return;
    } else {
        return output;
    }
}

const getPath = (parent, totalCost, dest) => {
    let prev = parent[dest];
    let path = [];
    path.push(dest);
    while (prev != -1) {
        path.push(prev);
        prev = parent[prev];
    }
    let output = 'best route: ';
    for (let i = path.length - 1; i >= 0; i--) {
        output += path[i];
        output = i == 0 ? output + ' > ' : output + ' - ';
    }
    output += `$${totalCost}`;
    return output;
}

const hasPositive = obj => {
    for (const it of Object.entries(obj)) {
        if (Number.parseInt(it[1]) > 0) {
            return true;
        }
    }
    return false;
}

const extractMin = (obj, array) => {
    let min = MAX_VALUE;
    let min_index = array.length;
    for (let i = 0; i < array.length; i++) {
        value = obj[array[i].x];
        if (value <= min && value >= 0) {
            min = value;
            min_index = i;
        }
    }
    return min_index;
}
