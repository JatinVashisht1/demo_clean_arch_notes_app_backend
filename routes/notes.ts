import express, {Request, Response, Router} from 'express'
import { INotes } from '../data/database/inotes';
import {Repository} from '../data/repository/repository'

export default function NotesRouter(repository: Repository): Router{
    const router = express.Router();

    router.get('/getAll', async (req: Request, res: Response) => {
        try {
            const notes = await repository.getAllNotes()
            console.log(`notes.ts: notes is ${notes}`)
            return res.status(200).json({success: true, message: notes})
        } catch (error) {
            return res.status(500).json({success: false, message: "Internal server error"})
        }
    })

    router.post('/create', async (req: Request, res: Response)=>{
        try
        {
            const title = req.body.title;
            const body = req.body.body;
            const tags = req.body.tags
            const note: INotes = {
                title: title,
                body: body,
                tags: tags
            }
            const result = await repository.createNote(note);
            if(result){
                return res.status(200).json({success: true, message: "note created"})
            }else{
                console.log(`notes.ts: error creating note}`)
                return res.status(500).json({success: false, message: "unable to create note"});
            }
        }catch(error){
            console.log(`notes.ts: unable to create note ${error}`)
            return res.status(501).json({success: false, message:"unable to create note"})
        }
    })

    return router;
}