'use client'
import { Note } from "@/types"
import {useState} from "react"


type NoteCardProps = {
    note: Note
}


export default function NoteCard({note}: NoteCardProps){
    const [editMode,setEditMode] = useState<boolean>(false);
    const [noteText, setNotetext] = useState<string>(note.note)
    
    //Updates Note and Saves to Database
    const handleSaveEdit = (text: string) => {
       
        setNotetext(text)
        setEditMode(false)
        try {
            fetch('/api', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: note.id, note: text})
            })
        } catch(err) {
            console.log("Error ", err)
        }
    }

    return(
        <div className="card w-96 h-42 bg-primary">
            {editMode ?
            (<div className="card w-96 h-52 shadow-xl p-2 text-primary-content">
              <textarea className="bg-white text-black h-48 p-2 rounded-md" onChange={(e)=> setNotetext(e.target.value)}  maxLength={300} defaultValue={noteText}></textarea>
              <button className="btn btn-accent" onClick={(e)=>handleSaveEdit(noteText)}>Save</button> 
             </div>)
            : 
            (
            <div className="flex justify-between card w-96 h-52 shadow-xl p-2 text-primary-content">
              <div className="break-words wrap">{noteText}</div>
              <div className="flex">
                <button className="btn btn-accent grow" onClick={()=>setEditMode(true)}>Edit</button>
                <button className="btn btn-error grow" >Delete</button>
              </div>
            </div>
            )}
        </div>
    )
}
           
