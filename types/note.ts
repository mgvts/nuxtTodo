export interface Note {
    id: number
    title: string
    todo: Todo[]
}

export interface NoteMap {
    [key: Note['id']]: Note
}

export interface Todo {
    id: number
    name: string
    solve: boolean
}