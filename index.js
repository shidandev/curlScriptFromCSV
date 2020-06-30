const csv = require("csv-parser");
const fs = require("fs");
const exec = require('child_process').exec;

const results = [];
var options = {
    host: "www.google.com",
    port: 80,
    path: "/upload",
    method: "POST",
};

fs.createReadStream("starterpack.csv") // <--- letak nama file csv, pastikan ade column Emel
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {


        for (let i = 0; i < results.length; i++) {
            batch(results[i].Emel + ' ' + i + ' ');
        }
    });

function batch(emel) {


    let myShellScript = exec('echo ' + emel); //<- esok tanya script ke firebase, replace dlam exec() ni
    myShellScript.stdout.on('data', (data) => {
        console.log('result', data);

    });
    myShellScript.stderr.on('data', (data) => {
        console.error(data);
    });
}