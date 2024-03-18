const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false, 
        trim: true
      },
      status: {
        type: Boolean,
        required: true,
        default: false // Default status for new to-do items is 'not completed'
      },
      // userId: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   required: true,
      //   ref: 'User' 
      // }
    },
      {
        timestamps: true 
      }
)

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;