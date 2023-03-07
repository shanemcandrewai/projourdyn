// Import our custom CSS
import '../scss/styles.scss';
import log from 'loglevel';
import Node from './Node.js';
import Edge from './Edge.js';

const selectElement = document.querySelector('#floatingInput');

selectElement.addEventListener('change', (event) => {
  const result = document.querySelector('#floatingOutput');
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
}

const dag = new Dag();

log.info(
  dag.addNodeEdge('test', 3) === -1,
  "dag.addNodeEdge('test', 3) === -1,",
);
