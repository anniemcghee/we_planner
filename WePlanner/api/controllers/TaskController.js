/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  addTask:function(req,res){
    var taskData = {
      //below is where you add the req.body.fields from the form
      type:req.body.type,
      dt:req.body.dt,
      user1:req.body.user1,
      user2:req.body.user2,
      what:req.body.what,
      tags:req.body.tags,
      owner:req.session.user.id
    };
    Task.create(taskData).then(function(task){
      task.owner=req.session.user;
      res.send(task);
    }).catch(function(err){
      res.send(400,err);
    })
  },
  getTasks:function(req,res){
    Task.find({where:{task:req.params.userId}})
    .populate('owner').then(function(tasks){
      res.send(tasks);
    }).catch(function(err){
      res.send(400, err);
    })
  }

};

