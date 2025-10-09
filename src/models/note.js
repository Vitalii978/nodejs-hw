import { Schema, model } from "mongoose";


const noteSchema = new Schema(
  {
    title: {type: String, trim: true, required: true},
    content: {type: String, required: false, default: '', trim: true},
    tag: {
      type: String,
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo'
      ],
      default: 'Todo'
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

noteSchema.index({title: "text", content: "text"});

export const Note = model('Note', noteSchema);
