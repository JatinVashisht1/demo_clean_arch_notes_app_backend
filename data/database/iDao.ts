import { INotes } from "./inotes"

export interface iDAO{
    deleteNoteUsingTitle(title: string): Promise<Boolean>
    createNote(note: INotes): Promise<Boolean>
    readNoteUsingTitle(title: String): Promise<INotes>
    getAllNotes():Promise<INotes[]>
}