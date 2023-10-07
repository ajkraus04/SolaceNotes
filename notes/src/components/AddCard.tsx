'use client'
import {useState} from "react";

type AddCardProps = {
    handleAddCard: (note: string) => Promise<boolean>;
}

export default function AddCard({ handleAddCard  } : AddCardProps){
    
    const [noteText, setNoteText] = useState<string>("")

    //AddCard Handler
    const handleCards = async () => {
        const isSuccess: boolean = await handleAddCard(noteText);
        if (isSuccess) {
            setNoteText("")
        } else {
            console.log("An error has occured")
        }
    }

   
    return(
    <div className="card w-96 h-52 bg-primary shadow-xl p-2 text-black">
      <textarea className="bg-white h-48 rounded-md p-2" onChange={(e)=> setNoteText(e.target.value)}  maxLength={300} value={noteText} ></textarea>
      <button className="btn btn-accent" onClick={handleCards}>
            Add Card
      </button>
   </div>)
}
