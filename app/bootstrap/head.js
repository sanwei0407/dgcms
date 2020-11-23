'use strict';
const axios = require('axios');
global.head = function(appCtx) {

  this.tags = [ 'head' ];
  this.parse = function(parser, nodes, lexer) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args);
  };

  this.run = async (context, args, callback) => {
    const key = args.key ? args.key : '';
    const res = await axios.post('http://127.0.0.1:8001' + args.api, args.data);
    // context.ctx[key] =

    return callback(null, '');
  };
};
