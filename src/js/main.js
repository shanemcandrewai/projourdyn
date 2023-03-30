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
        descrB64: node.descrB64,
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

  putJSON = (textContent) => {
    const textJSON = JSON.parse(textContent);
    this.#dag.nodes = textJSON.nodes.reduce((acc, node) => {
      if (Object.hasOwn(node, 'descr')) {
        acc.push(new Node(node.descr));
      } else {
        const n = new Node();
        n.loadB64(node.descrB64);
        acc.push(n);
      }
      return acc;
    }, []);
    this.#dag.edges = textJSON.edges.reduce((acc, edge) => {
      acc.push(new Edge(this.#dag.nodes[edge.fromNode], this.#dag.nodes[edge.toNode]));
      return acc;
    }, []);
    return textContent.length;
  };
}

const dag = new Dag();

log.info(
  dag.getEdge(0).fromNode.descr === 'smdb',
  "dag.getEdge(0).fromNode.descr === 'smdb'",
);
result.textContent = dag.getJSON();
log.info(
  result.textContent.length === 221,
  'result.textContent.length === 221',
);
log.info(
  dag.putJSON('{"nodes":[{"descrB64":"dHR0"},{"descrB64":"dG9kbw=="}],"edges":[{"fromNode":0,"toNode":1}]}') === 91,
  "dag.putJSON('{nodes:[{descrB64:c21kYg==},{descrB64:dG9kbw==}],edges:[{fromNode:0,toNode:1}]}') === 95",
);
log.info(
  dag.getEdge(0).fromNode.descr === 'ttt',
  "dag.getEdge(0).fromNode.descr === 'ttt'",
);
log.info(
  dag.putJSON(result.textContent) === 221,
  'dag.putJSON(result.textContent) === 221',
);
