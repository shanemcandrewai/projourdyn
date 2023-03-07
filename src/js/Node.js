import * as usx from 'unishox2.siara.cc';

export default class Node {
  constructor(descr) {
    if (descr != null) {
      this.descr = descr;
      const outBuffer = new Uint8Array(1000);
      this.lenComp = usx.unishox2_compress_simple(
        this.descr,
        this.descr.length,
        outBuffer,
      );
      this.descrComp = Buffer.from(outBuffer.slice(0, this.lenComp)).toString('base64');
    }
  }

  load(descrComp, lenComp) {
    this.descrComp = descrComp;
    this.lenComp = lenComp;
    this.descr = usx.unishox2_decompress_simple(new Uint8Array(Buffer.from(descrComp, 'base64')), lenComp);
  }
}
