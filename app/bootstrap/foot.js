/*
 * @Author: doramart
 * @Date: 2019-06-18 17:27:24
 * @Last Modified by: doramart
 * @Last Modified time: 2019-10-02 21:50:23
 */

'use strict';

const axios = require('axios');

// // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// // axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
// global.remote = function(appCtx) {

//   this.tags = [ 'remote' ];
//   this.parse = function(parser, nodes, lexer) {
//     const tok = parser.nextToken();
//     const args = parser.parseSignature(null, true);
//     parser.advanceAfterBlockEnd(tok.value);
//     return new nodes.CallExtensionAsync(this, 'run', args);
//   };
//   this.run = async (context, args, callback) => {

//       // axios 获取数据

//       apiData = await appCtx.helper.requestJson(api, payload);
//       context.ctx[key] = apiData;
//       return callback(null, '');
//   };
// };

global.foot = function(appCtx) {

  this.tags = [ 'foot' ];
  this.parse = function(parser, nodes, lexer) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args);
  };

  this.run = async (context, args, callback) => {
    // context.ctx[key] =

    return callback(null, '');
  };
};
