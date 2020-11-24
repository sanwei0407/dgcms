'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;


class VoteController extends Controller {

  //@author Martin
  //@last update 2020年11月12日9:43:56
  //@发起投票
  //title-标题 cover-封面 desc-内容说明 sTime-开始时间 eTime-结束时间 author-作者 perLimit-每个人投票限制 addTime-发布时间
    async addVoteLog(){
      const {
        ctx
      } = this;
      const {
        uid,
        vid,
        vitemId,
        ip,
      } = ctx.request.body;
      if(!uid) return ctx.body = {success:false,msg:'请输入标题!'}
      if(!vitemId) return ctx.body = {success:false,msg:'请输入内容说明!'}
      if(!ip) return ctx.body = {success:false,msg:'请输入简介!'}
      if(!perlimit) return ctx.body = {success:false,msg:'请输入封面地址'}
      if(!vid) return ctx.body = {success:false,msg:'请输入投票归属id'}
      try{
        await ctx.model.VoteLog.create({
          uid,
          vid,
          vitemId,
          ip,
          addTime:Date.now()
        })
        ctx.body = {
          success:true,
          msg:'发布投票选项成功!'
        }
      }catch(e){
        console.log(e)
        ctx.body={success:false,msg:'发起投票选项失败'}
      }
     
    }

  //@author Martin
  //@last update 2020年11月18日08:53:59
  //@查找投票
  //isDelete-是否删除  title-标题 desc-内容说明 author-作者  page:分页 limit:每页限制的条数
    async findVoteLogList() {
      const { ctx,app } = this;
      let { 
          uid,
          vid,
          vitemId,
          ip,
      } = ctx.request.body;
      const { Op } = app.Sequelize;
      const where = {};
      if(uid) where.uid = {[Op.like]:uid+'%'};
      if(vitemId) where.vitemId = {[Op.like]:vitemId+'%'};
      if(ip) where.berif = {[Op.like]:ip+'%'};
      if(vid) where.vid = {[Op.like]:vid+'%'};
      limit = limit ? limit*1 : 20;
      page = page ? page : 1;
      const offset = (page - 1) * limit;
      try {
          const res = await ctx.model.VoteLog.findAndCountAll({
              where,
              limit,
              offset,
          });
          ctx.body = { success: true, data: res };
      } catch (e) {
          ctx.body = { success: false, info: '查询失败' };
          console.log(e)
      }
  }


}

module.exports = VoteController;
