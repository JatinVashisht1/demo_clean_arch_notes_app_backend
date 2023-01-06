import mongoose, { Document, Model, model, Schema } from 'mongoose';
import { INotes } from './inotes';

const notesSchema: Schema = new Schema<INotes>({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    body:{
        type: String,
        required: true
    },
    tags:{
        type: [String],
        required: false
    },
    category:{
        type: String,
        required: false,
        default: "default"
    }
})

notesSchema.methods.getContact = function getContact(){
    const title: String = this.title;
    const body: String = this.body;
    console.log(`Title: ${title} Body: ${body}`)
}

export const notesModel = model('notesSchema', notesSchema)
