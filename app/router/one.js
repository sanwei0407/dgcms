'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 首页

  router.post('/one/api/getBookList', controller.one.getBookList);
  router.post('/one/api/getOneIndex', controller.one.getOneIndex);

};
