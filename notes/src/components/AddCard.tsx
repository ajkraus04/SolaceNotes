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
    <div className="card w-96 h-72 bg-primary shadow-xl p-2 text-black">
      <p className="text-red-500">{errorText}</p>
      <textarea className="bg-white h-64 rounded-md p-2 resize-none" placeholder="Write your notes here..." onChange={(e)=> setNoteText(e.target.value)}  maxLength={300} value={noteText} ></textarea>
      <button className={noteText.length < 20 || noteText.length > 300 ? "btn btn-disabled" : "btn btn-accent"}  onClick={handleCards}>
            Save Note
      </button>
   </div>)
}
