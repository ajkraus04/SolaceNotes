'use client'
import { Note, handleAddCardOutput } from "@/types";
import NoteCard from "./NoteCard";
import AddCard from "./AddCard";
import {v4 as uuidv4} from 'uuid'

type NotesListProps = {
    notes: Note[];
    handleAddCard: (note: String) => Promise<handleAddCardOutput>;
    handleDeleteNote: (note: Note) => Promise<void>;
}

export default function NotesList({notes, handleAddCard, handleDeleteNote}: NotesListProps) {
    
    //Create an Array of all Notes
    const noteCards = notes.map(note=>
        <NoteCard key={uuidv4()} handleDeleteNote={handleDeleteNote} note={note} />
    );

    return(
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-10">
          <AddCard  handleAddCard={handleAddCard}/>
          {noteCards}
        </div>
    );
}
