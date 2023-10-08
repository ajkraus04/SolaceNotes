'use client'
import {useState} from "react";
import { handleAddCardOutput } from "@/types";

type AddCardProps = {
    handleAddCard: (note: string) => Promise<handleAddCardOutput>;
}



export default function AddCard({ handleAddCard  } : AddCardProps){
    
    const [noteText, setNoteText] = useState<string>("")
    const [errorText, setErrorText] = useState<string>("")

    //AddCard Handler
    const handleCards = async () => {
        const isSuccess: handleAddCardOutput  = await handleAddCard(noteText);
        if (isSuccess.success) {
            setNoteText("")
            setErrorText("")
        } else {
            if (isSuccess.error) setErrorText(isSuccess.error.error)
        }
    }

   
    return(
    <div id="add-card" className="card w-96 h-84 bg-primary shadow-xl p-2 text-black">
      <textarea className="bg-white h-64 rounded-md p-2 resize-none mb-2" placeholder="Write your notes here..." onChange={(e)=> setNoteText(e.target.value)}  maxLength={300} value={noteText} ></textarea>
      <button className="btn btn-accent"  onClick={handleCards}>
            Save Note
      </button>
      <p className="text-red-400">{errorText}</p>
   </div>)
}
