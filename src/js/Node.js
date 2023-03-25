import { Base64 } from 'js-base64';

export default class Node {
  constructor(descr) {
    this.descr = descr;
    this.descrB64 = Base64.encode(descr);
  }

  loadB64(descrB64) {
    this.descrB64 = descrB64;
    this.descr = Base64.decode(descrB64);
  }
}
