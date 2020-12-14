const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const { Server } = require('./Server');
const { getCost } = require('./PathFinding');
const { readRoutes } = require('./FileHandler');

const startServer = () => {
    new Server();
}

const getUserInput = () => {
    return new Promise(resolve => {
        rl.question('please enter the route: ', route => {
            resolve(route.toUpperCase());
        })
    });
}

(async function main() {
    startServer();
    const filename = process.argv[2] || 'input-routes.csv';
    while (true) {
        const input = await getUserInput();
        const routes = await readRoutes(filename);
        const [from, to] = input.split('-');
        await getCost(routes, from, to, true);
    }
})();
