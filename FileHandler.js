const fs = require('fs');
const csv = require('csv');
const { Node, Edge } = require('./Route');

exports.readRoutes = async (csvFile) => {
    const nodes = []
    const aeroports = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFile)
            .pipe(csv.parse({ delimiter: ',', from_line: 1, columns: false }))
            .on('data', row => {
                if (row.length != 3) {
                    throw Error('Missing value');
                }
                if (!aeroports.includes(row[0])) {
                    aeroports.push(row[0]);
                    const i = nodes.length;
                    nodes.push(new Node(row[0]));
                    nodes[i].edges.push(new Edge(row[0], row[1], row[2]));
                } else {
                    const i = aeroports.indexOf(row[0]);
                    nodes[i].edges.push(new Edge(row[0], row[1], row[2]));
                }
                if (!aeroports.includes(row[1])) {
                    aeroports.push(row[1]);
                    nodes.push(new Node(row[1]));
                }
            })
            .on('error', e => {
                console.error("Error reading the csv file");
                return reject(e);
            })
            .on('finish', () => {
                return resolve(nodes);
            });
    })

}

exports.addRoute = async (route, csvFile) => {
    return new Promise ((resolve, reject) => {
        fs.appendFile(csvFile, route, err => {
            if (err) reject(err);
            resolve();
        });
    })
}
