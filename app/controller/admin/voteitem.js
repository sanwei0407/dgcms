'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;


class VoteitemController extends Controller {

  //@author Martin
  //@last update 2020年11月12日9:43:56
  //@发起投票
  //title-标题 cover-封面 desc-内容说明 sTime-开始时间 eTime-结束时间 author-作者 perLimit-每个人投票限制 addTime-发布时间
    async addVoteitem(){
      const {
        ctx
      } = this;
      const {
        title,
        desc,
        berif,
        cover,
        ticketCount,
        state,
        vid,
      } = ctx.request.body;
      if(!title) return ctx.body = {success:false,msg:'请输入标题!'}
      if(!desc) return ctx.body = {success:false,msg:'请输入内容说明!'}
      if(!berif) return ctx.body = {success:false,msg:'请输入简介!'}
      if(!cover) return ctx.body = {success:false,msg:'请输入封面地址'}
      if(!ticketCount) return ctx.body = {success:false,msg:'请输入投票总数'}
      if(!vid) return ctx.body = {success:false,msg:'请输入投票归属id'}
      try{
        await ctx.model.Voteitem.create({
          title,
          desc,
          berif,
          cover,
          ticketCount,
          state,
          vid,
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
  //@last update 2020年11月12日10:20:27
  //@删除投票
  //id-投票id  isDelete-是否删除 
    async delVoteitem(){
      const {
        ctx,
      } = this;
      const {
        id,
      } = ctx.request.body;
      try{
        await ctx.model.Voteitem.update({
          state:-1
        },
        {
          where:{
              id,
              }
        })
        ctx.body = {
          success:true,
          msg:'删除成功'
        }
      }catch(e){
        console.log(e)
      }
      

    }

  //@author Martin
  //@last update 2020年11月18日08:53:59
  //@查找投票
  //isDelete-是否删除  title-标题 desc-内容说明 author-作者  page:分页 limit:每页限制的条数
    async findVoteitemList() {
      const { ctx,app } = this;
      let { 
        title,
        desc,
        berif,
        vid,
        limit,
        page
      } = ctx.request.body;
      const { Op } = app.Sequelize;
      const where = {state:1};
      if(title) where.title = {[Op.like]:title+'%'};
      if(desc) where.desc = {[Op.like]:desc+'%'};
      if(berif) where.berif = {[Op.like]:berif+'%'};
      if(vid) where.vid = {[Op.like]:vid+'%'};



      limit = limit ? limit*1 : 20;
      page = page ? page : 1;
      const offset = (page - 1) * limit;
      try {
          const res = await ctx.model.Voteitem.findAndCountAll({
              where,
              limit,
              offset,
              attributes: {
                exclude: [ 'state' ],
              },
          });
          ctx.body = { success: true, data: res };
      } catch (e) {
          ctx.body = { success: false, info: '查询失败' };
          console.log(e)
      }
  }

  //@author Martin
  //@last update 2020年11月18日08:59:18
  //@查找文章(对单个文章进行编辑时使用)
  //aid-文章id
  async findOneVoteitem() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: '该投票选项不存在' };
    try {
        const res = await ctx.model.Voteitem.findByPk(id, { raw: true });
        if (res) {
            return ctx.body = { success: true, data: res };
        }
        ctx.body = { success: false, info: '该投票选项不存在' };

    } catch (e) {
        ctx.body = { success: false, info: '查询出错 ' };
        console.log(e)
    }
}

  //@author Martin
  //@last update 2020年11月18日08:59:24
  //@查找文章(对单个文章进行编辑时使用)
  //aid-文章id title-标题 content-内容 author-作者 from-来源 cid-分栏id top-是否置顶
async reviceVoteitem(){
  const { ctx } = this;
  let { 
    id,
    title,
    desc,
    berif,
    cover,
    ticketCount,
    state,
    vid, 
} = ctx.request.body;
  const update = {};
  if(title) update.title = title
  if(desc) update.desc = desc
  if(berif) update.berif = berif
  if(cover) update.cover = cover
  if(ticketCount) update.ticketCount = ticketCount
  if(state) update.state = state
  if(vid) update.vid = vid
  if(!id) return ctx.body={success:false,msg:'该投票列表不存在'}
  try{
    const res = await ctx.model.Voteitem.update(
      update,
      {
        where:{
          id,
        }
      }
    )
    ctx.body = {success:true,msg:'修改成功',data:res};

  }catch(e){
    console.log(e)
    ctx.body={
      success:false,
      msg:'修改失败'
    }
  }
}


}

module.exports = VoteitemController;
