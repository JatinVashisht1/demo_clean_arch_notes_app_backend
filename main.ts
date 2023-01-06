import {MongoClient} from "mongodb"
import { iDAO } from "./data/database/iDao"
import { INotes } from "./data/database/inotes"
import mongoose, { ConnectOptions, MongooseError } from 'mongoose';
import { notesModel } from "./data/database/notesDb";
import app from './src/index'
import { Repository } from "./data/repository/repository";
import NotesRouter from "./routes/notes";

( async()=>{
    const dbName = "notes"

    mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }as (ConnectOptions) , (err)=>{
        if(err){
            console.log("unable to connect to db")
        }else{
            console.log('successfully connected to database')
        }
    })
    

    const dao: iDAO = {
        deleteNoteUsingTitle: async (title: string): Promise<Boolean> => {
            const result = await notesModel.deleteOne({ title: title }).exec();
            return result.acknowledged;
        },
        createNote: async (note: INotes): Promise<Boolean> => {
            try {

                const mNoteModel = new notesModel(note);
                const result = await mNoteModel.save();
                return true;
            } catch (error) {
                throw (`unable to create note ${error}`);
            }

        },
        readNoteUsingTitle: async (title: String): Promise<INotes> => {
            const note = await notesModel.findOne({ title: title }).exec();
            console.log(`note is ${note}`);
            const n: INotes = {
                title: "",
                body: "",
                tags: [],
                category: "default"
            };

            console.log(`main.ts: redNoteUsingTitle: \nnote is ${note}`)

            return n;
        },
        getAllNotes: async (): Promise<INotes[]> =>{
            const notesDB = await notesModel.find({}).exec()
            // console.log(`main.ts: notes are ${notes}`)
            const notes: INotes[] = [];

        notesDB.forEach((noteDB)=>{
            // console.log(`note title is ${noteDB.title}`)
            const title1 = noteDB.title as string
            const body1 = noteDB.body
            const tags1 = noteDB.tags
            const category = noteDB.category
            
            const note: INotes = {
                title: title1,
                body: body1,
                tags: tags1,
                category: category
            }
            notes.push(note);

        })

            return notes;
        }
    }

    const repository: Repository = new Repository(dao)

    const notesMiddleWare = NotesRouter(repository)
    app.use('/notes', notesMiddleWare)

    app.listen(3000, ()=>{
        console.log(`server up on http://localhost:3000/`)
    })    

} )()
