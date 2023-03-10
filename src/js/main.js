// Import our custom CSS
import '../scss/styles.scss';
import log from 'loglevel';
import Node from './Node.js';
import Edge from './Edge.js';

log.setLevel('info', true);

const input = document.querySelector('#floatingInput');
const result = document.querySelector('#floatingOutput');

input.addEventListener('change', (event) => {
  result.textContent = `You like ${event.target.value}`;
});

class Dag {
  #nodes;

  #edges;

  constructor(nodes, edges) {
    this.#nodes = nodes || [
      new Node('smdb'),
      new Node('todo'),
      new Node('agenda'),
    ];

    this.#edges = edges || [
      new Edge(this.#nodes[0], this.#nodes[1]),
      new Edge(this.#nodes[0], this.#nodes[2]),
    ];
  }

  getEdge = (edgeInd) => this.#edges[edgeInd];

  getJSON = () => JSON.stringify({
    nodes: this.#nodes.reduce((acc, node) => {
      acc.push({
        descrComp: node.descrComp,
        lenComp: node.lenComp,
      });
      return acc;
    }, []),
    edges: this.#edges.reduce((acc, edge) => {
      acc.push({
        fromNode: this.#nodes.findIndex((node) => node === edge.fromNode),
        toNode: this.#nodes.findIndex((node) => node === edge.toNode),
      });
      return acc;
    }, []),
  }, null, ' ');
  
  loadText = (input) => {
    const inp = JSON.parse(input);
    this.#nodes = inp.nodes.reduce((acc, node) => {
      const n = new Node();
      n.load(node.descrComp, node.lenComp);
      acc.push(n);
    }, []);
  };  
}

const dag = new Dag();

log.info(
  dag.getEdge(0).fromNode.descr === 'smdb',
  "dag.getEdge(0).fromNode.descr === 'smdb'",
);

result.textContent = dag.getJSON();
log.info(
  result.textContent.length === 282,
  'result.textContent.length === 282',
);

input.textContent = dag.getJSON();
dag.loadText(input.textContent);
log.info("dag.loadText(input.textContent)");
log.info(  
  dag.getEdge(0).fromNode.descr === 'smdb',
  "dag.getEdge(0).fromNode.descr === 'smdb'",
);
