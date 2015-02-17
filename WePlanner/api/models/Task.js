/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    date: {
      type: 'string',
      required:true
    },
    type: {
      type:'string',
      enum:['Milestone','Appointment','Deadline'],
      required:true
    },
    body: {
      type:'text',
      required:true
    },
    //associations
    owner: {
      model:'User'
    }
  }
};

