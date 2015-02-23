/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    dt: {
      type:'date',
      required:true
    },
    user1: {
      type:'boolean',
    },
    user2: {
      type:'boolean',
    },
    type: {
      type:'string',
      enum:['Milestone','Appointment','Deadline'],
      required:true
    },
    what: {
      type:'text',
      required:true
    },
    tags: {
      type:'array'
    },
    //associations
    owner: {
      model:'User'
    }
  }
};

