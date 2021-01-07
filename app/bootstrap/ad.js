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

global.ad = function(appCtx) {

  this.tags = [ 'ad' ];
  this.parse = function(parser, nodes, lexer) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args);
  };

  this.run = async (context, args, callback) => {
    const key = args.key ? args.key : '';
    console.log('args',args)
    const _url = '/findOneAd';
    const methods = 'POST';
    if (methods === 'POST') {
      const res = await axios.post('http://127.0.0.1:8001' + _url, { aid: args.id });
      if (res.data.data.type === 'pic') {
        context.ctx[key] = `<a href="${res.data.data.goto}"> <img src="${res.data.data.adUrl}" style="width : ${res.data.data.width};height:${res.data.data.height} "></a>`;
      }
      if (res.data.data.type === 'select') {
        console.log('...............', res.data.data.adUrl.split(','));
        const aa = [];
        for (let i = 0; i < res.data.data.adUrl.split(',').length; i++) {
          const a = res.data.data.adUrl.split(',')[i];
          const jj = ` <div class="swiper-slide"><img src='${a}' style="width:100%;height:100%;object-fit:cover;"></div>`;
          aa.push(jj);

        }
        const bb = aa.join();
        console.log(res.data.data.adUrl);
        context.ctx[key] = `<a href="${res.data.data.goto}"> <div class="swiper-container" style="width:${res.data.data.width};height:${res.data.data.height} ">
          <div class="swiper-wrapper" style="width:100%;height:100%">
              ${bb}
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
          
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          
          <!-- 如果需要滚动条 -->
          
      </div></a>`;
      }
      if (res.data.data.type === 'video') {
        context.ctx[key] = `<a href="${res.data.data.goto}"> <video src="${res.data.data.adUrl}" muted  autoplay loop style="width : ${res.data.data.width};height:${res.data.data.height} "></video></a>`;
      }

    }
    if (methods === 'get') {
      const res = await axios.get('http://127.0.0.1:8001' + args.api, { params: { ...args.data } });

      context.ctx[key] = res.data.data;
    }

    return callback(null, '');
  };
};
