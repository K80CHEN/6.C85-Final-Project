import * as d3 from "d3";
import { remittance_use } from "../../data/remit_per_migrant.js";
import {ForceEdgeBundling} from "../helpers/d3-ForceEdgeBundling.js";
import * as fs from "fs";

const width = 750;
const height = 750;
const defaultOpacity = 0.3;
const radius = 300;

const onCircle = function(index) {
    const angleDeg = (360 - 60) / 4899;
    const angleRad = angleDeg * Math.PI / 180;
    const x = radius*Math.cos(Math.PI/6 + 5*Math.PI/180 + index*angleRad);
    const y = radius*Math.sin(Math.PI/6 + 5*Math.PI/180 + index*angleRad);
    return {x: x, y: y};
};

const list_label = [
    'Food purchase',
    'Health expenses',
    'Education expenses',
    'Housing',
    'Purchase of agricultural inputs',
    'Saving',
    'Payment of commitments abroad',
    'Payment of the sender\'s travel debt',
    'Other'
];

const labelOnCircle = function(index) {
    const angleDeg = 50 / list_label.length;
    const angleRad = angleDeg * Math.PI / 180;
    const x = radius*Math.cos(Math.PI/6 - index*angleRad);
    const y = radius*Math.sin(Math.PI/6 - index*angleRad);
    return {x: x, y: y}
};

const nodes = new Object();
for (let i=4990; i < list_label.length + 4990; i++) {
    const circ = labelOnCircle(i - 4990);
    nodes[i + ''] = {'x': circ.x, 'y': circ.y};
}

const edges = new Array();
for (const person of remittance_use.data) {
    const locationOnCircle = onCircle(person.index);
    nodes[person.index + ''] = {'x': locationOnCircle.x, 'y': locationOnCircle.y};
    for (const u of person.values) { edges.push({'source': person.index + '', 'target':  '' + (list_label.indexOf(u) + 4990)}); }
}

const fBundling = ForceEdgeBundling().nodes(nodes).edges(edges);
const results = fBundling();

const jsonContent = JSON.stringify({data: results}, 4);

fs.writeFile("./results.json", jsonContent, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 