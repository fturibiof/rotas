const express = require('express');
const bodyParser = require('body-parser');
const { getCost } = require('./PathFinding');
const { readRoutes, addRoute } = require('./FileHandler');

class Server {

    constructor() {
        const port = 3000;
        this.app = express();
        this.app.use(bodyParser.json());
        const filename = process.argv[2] || 'input-routes.csv';

        this.app.get('/', async (req, res) => {
            const routes = await readRoutes(filename);
            const { from, to } = req.query;
            res.send(getCost(routes, from.toUpperCase(), to.toUpperCase(), false));
        });

        this.app.post('/', async (req, res) => {
            const body = req.body;
            addRoute(this.json2csv(body), filename);
            res.send('New route added')
        })

        this.app.listen(port);

    }

    json2csv(json) {
        return `\r\n${(json.from).toUpperCase()},${(json.to).toUpperCase()},${json.value}`;
    }

}

module.exports = { Server };