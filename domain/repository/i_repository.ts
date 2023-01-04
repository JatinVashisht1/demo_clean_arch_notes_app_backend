import { INotes } from "../../data/database/inotes";

export interface IRepository{
    deleteNoteUsingTitle(title: string): Promise<Boolean>
    createNote(note: INotes): Promise<Boolean>
    readNoteUsingTitle(title: String): Promise<INotes>
    getAllNotes():Promise<INotes[]>
}