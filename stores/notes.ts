import {defineStore} from 'pinia';
import type {Note, NoteMap} from "~/types/note";

export const useNotesStore = defineStore('notes', {
    state: (): { notes: NoteMap } => ({
        notes: {} as NoteMap,
    }),
    actions: {
        loadNote(id: Note['id']): Note | null {
            if (Object.keys(this.notes).length === 0) this.loadAll()
            return this.notes[id] || null
        },
        loadAll(): NoteMap {
            if (localStorage) {
                this.notes = JSON.parse(localStorage.getItem('notes') || '{}')
            }
            return this.notes
        },
        addNote(note: Note) {
            const {id} = note
            this.notes[id] = note
            this.saveNotes();
        },
        updateNote(note: Note): Note | null {
            if (!this.notes[note.id]) {
                return null
            }
            this.notes[note.id] = note
            this.saveNotes();
            return note
        },
        deleteNote(id: Note['id']) {
            delete this.notes[id]
            this.saveNotes()
        },
        saveNotes() {
            if (localStorage) {
                localStorage.setItem('notes', JSON.stringify(this.notes))
            }
        },
    },
});
