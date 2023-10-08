'use client'
import { Note } from "@/types"
import { useState} from "react"


type NoteCardProps = {
    note: Note;
    handleDeleteNote: (note: Note) => Promise<void>;
    handleNoteStateChange: (note: Note) => void;
}


export default function NoteCard({note, handleDeleteNote, handleNoteStateChange}: NoteCardProps){
    const [editMode,setEditMode] = useState<boolean>(false);
    const [noteText, setNotetext] = useState<string>(note.note)
    const [errorText, setErrorText] = useState<string>("")

    const date = new Date(note.date_modified);
    //Updates Note and Saves to Database
    const handleSaveEdit = async (text: string) => {
        try {
            const data = await fetch('/api', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: note.id, note: text})
            });

            //Error handling for length of note
            if (data.status === 500){
                const error = await data.json();
                setErrorText(error.error);
            } else {
                const {updatedNote} = await data.json();
                handleNoteStateChange({note: text, id: note.id, created_at: updatedNote.created_at, date_modified: updatedNote.date_modified});
                setEditMode(false);
                setNotetext(text);
                setErrorText("");
            }
            
        } catch(err) {
            console.log("Error ", err);
        }
       
    }

    return(
        <div className="card w-96 h-42 bg-primary" id="edit-card">
            {editMode ?
            (<div className="card w-96 h-72 shadow-xl p-2 text-primary-content">
              <textarea className="bg-white text-black h-64 p-2 rounded-md resize-none" onChange={(e)=> setNotetext(e.target.value)}  maxLength={300} defaultValue={noteText}></textarea>
              <div className="flex">
                <button className="btn btn-accent w-1/2 grow" onClick={(e)=>handleSaveEdit(noteText)}>Save</button> 
                <button className="btn btn-neutral w-1/2 grow" onClick={(e)=>{setEditMode(false); setNotetext(note.note); setErrorText("")}}>Cancel</button> 
              </div>
              <p className="text-red-400">{errorText}</p>

             </div>)
            : 
            (
            <>
            <p className="date-modified-p p-2 text-white">{date.toLocaleString()}</p>
            <hr></hr>
            <div className="flex justify-between card w-96 h-72 shadow-xl p-2 text-primary-content" id="note-card">
              <div className="break-words wrap p-2">{noteText}</div>
              <div className="flex">
                <button className="btn w-3/4 btn-accent grow " onClick={()=>setEditMode(true)}>Edit</button>
                <button className="btn btn-error grow" onClick={()=>handleDeleteNote(note)}>Delete</button>
              </div>
            </div>
            </>
            )}
        </div>
    )
}
           
