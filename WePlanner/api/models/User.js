/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt')

module.exports = {

  attributes: {
    lastName:{
      type:'string',
      required:true
    },
    email:{
      type:'email',
      required:true,
      unique:true
    },
    password:{
      type:'string',
      required:true
    },
    userOne:{
      type:'string',
      required:true
    },
    userTwo:{
      type:'string',
      required:true
    },
    wedding:{
      type:'date',
      required:true
    },
    //associations
    tasks: {
      collection:'Task',
      via:'owner'
    },


//below is what we're doing to prevent the encrypted PW from sending through/able to be accessed to/by angular
  toJson: function(){
    var userObj = this.toObject();
      delete userObj.password;
      return userObj;
    }
  },
  beforeCreate:function(values, cb){
    bcrypt.hash(values.password,10,function(err,hash){
      if(err) return cb(err); //sending error to the cb param and then stops the code
      values.password=hash;
      cb();
    })
  }
};

