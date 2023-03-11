// Import our custom CSS
import '../scss/styles.scss';
import log from 'loglevel';
import Node from './Node.js';
import Edge from './Edge.js';

log.setLevel('info', true);

const selectElement = document.querySelector('#floatingInput');
const result = document.querySelector('#floatingOutput');

selectElement.addEventListener('change', (event) => {
  result.textContent = `You like ${event.target.value}`;
});

class Dag {
  #dag = { nodes: {}, edges: {} };

  constructor(nodes, edges) {
    this.#dag.nodes = nodes || [
      new Node('smdb'),
      new Node('todo'),
      new Node('agenda'),
    ];

    this.#dag.edges = edges || [
      new Edge(this.#dag.nodes[0], this.#dag.nodes[1]),
      new Edge(this.#dag.nodes[0], this.#dag.nodes[2]),
    ];
  }

  getEdge = (edgeInd) => this.#dag.edges[edgeInd];

  getJSON = () => JSON.stringify({
    nodes: this.#dag.nodes.reduce((acc, node) => {
      acc.push({
        descrComp: node.descrComp,
        lenComp: node.lenComp,
      });
      return acc;
    }, []),
    edges: this.#dag.edges.reduce((acc, edge) => {
      acc.push({
        fromNode: this.#dag.nodes.findIndex((node) => node === edge.fromNode),
        toNode: this.#dag.nodes.findIndex((node) => node === edge.toNode),
      });
      return acc;
    }, []),
  }, null, ' ');
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
