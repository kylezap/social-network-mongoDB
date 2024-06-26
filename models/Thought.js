const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },

    createdAt: {
      type: Date,
      default: Date.now
    },

    username: {
      type: String,
      required: true,
    },
    // Array of nested documents created with the reactionSchema
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    
  }
);
    // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });



const Thought = model('thought', thoughtSchema);

module.exports = Thought;
