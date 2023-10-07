'use client'
import SearchBar from "@/components/SearchBar";
import NotesList from "@/components/NotesList";
import { useState, useEffect } from "react"
import { Note } from "@/types";


export default function NotesContainer() {

 const [notes,setNotes] = useState<Note[]>([]);
 const [searchText, setSearchText] = useState<String>("")
 
 //Handler Functons
 const handleSearchText = (note: String): void => {
    setSearchText(note)};

const handleDeleteNote = (note: Note):void =>{
    
}

//Add card to DB and update state
const handleAddCard = async (note:String):Promise<void> => {
    try{
        console.log(note)
        const newCardPromise = await fetch('/api',{
            method:'POST',
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({note})
        });

        const {newNote} : {newNote: Note}= await newCardPromise.json();
        setNotes([newNote,...notes])
        
    }catch (err) {
        console.log(`Error: ${err}`)
    }
}

 //Fetch Notes from DB upon Mount
 useEffect(()=>{
    fetch('/api')
    .then((res)=>res.json())
    .then(({notes})=>{
        setNotes(notes)})
},[])

    return (
        <div className="flex flex-col items-center">
            <SearchBar handleSearchText={handleSearchText} />
            <NotesList handleAddCard={handleAddCard} notes={notes}/>
        </div>
    )
}
