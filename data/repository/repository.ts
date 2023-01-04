import { IRepository } from "../../domain/repository/i_repository";
import { iDAO } from "../database/iDao";
import { INotes } from "../database/inotes";
export class Repository implements IRepository{

    dao: iDAO

    constructor(dbDao: iDAO){
        this.dao = dbDao
    }
    async getAllNotes(): Promise<INotes[]> {
        const notes = await this.dao.getAllNotes()
        return notes
    }

    async deleteNoteUsingTitle(title: string): Promise<Boolean> {
        const note = await this.dao.deleteNoteUsingTitle(title)
        return note !== null;
    }
    async createNote(note: INotes): Promise<Boolean> {
        const result = await this.dao.createNote(note)
        return result !== null;
    }
    async readNoteUsingTitle(title: String): Promise<INotes> {
        const result = await this.dao.readNoteUsingTitle(title)
        return result;
    }

}