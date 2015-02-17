/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create:function(req,res){
    var taskData = {
      //below is where you add the req.body.fields from the form
      // title:req.body.title,
      // body:req.body.body,
      owner:req.session.user.id
    };
    Task.create(taskData).exec(function(err, post){
      if(err) res.send(400,err);
      res.send(post);
    })
  },
  addTask:function(req,res){
    var taskData = {
      //below is where you add the req.body.fields from the form
      // body:req.body.body,
      // post:req.params.postId,
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

