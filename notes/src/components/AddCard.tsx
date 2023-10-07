'use client'
import {useState} from "react"

type AddCardProps = {
    handleAddCard: (note: string) => void;
}

export default function AddCard({handleAddCard}: AddCardProps){
    const [noteText, setNotetext] = useState<string>('');


    return(
    <div className="card w-96 h-52 bg-primary shadow-xl p-2 text-black">
      <textarea className="bg-white h-48 rounded-md p-2" onChange={(e)=> setNotetext(e.target.value)}  maxLength={300} defaultValue={noteText}></textarea>
      <button className="btn btn-primary" onClick={()=>handleAddCard(noteText)}>Add Card</button>
   </div>)
}
