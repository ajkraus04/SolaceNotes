'use client'
import SearchBar from "@/components/SearchBar/SearchBar";
import NotesList from "@/components/NotesList/NotesList";
import { useState, useEffect, useRef } from "react";
import { Note, handleAddCardOutput } from "@/types";


export default function NotesContainer() {

 const [notes,setNotes] = useState<Note[]>([]);
 const [searchText, setSearchText] = useState<string>("")
 
 
 
 //Handler Functons

 //Filters the Notes out based on search
const handleFilterNotes = (): Note[] => {
    if (searchText.length >= 1) {
        const filteredNotes = notes.filter((note)=> note.note.toLowerCase().includes(searchText.toLowerCase()));
        return filteredNotes;
    } else {
        return notes;
    }
}

 const handleSearchText = (note: string): void => {
    setSearchText(note)};

//Deleted Note from DB
const handleDeleteNote = async (note: Note):Promise<void> => {
    try{ 
        const deletedNote = await fetch('/api', {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({note})
        })
        const data = await deletedNote.json();
        const remainingNotes = notes.filter((note)=>note.id !== data.deletedNote.id);
        setNotes(remainingNotes);
    } catch(err) {
        console.log(`Error: ${err}`);
    }
}

//Add card to DB and update state
const handleAddCard = async (noteText:String):Promise<handleAddCardOutput> => {
    try{
        console.log(noteText)
        const newCardPromise = await fetch('/api',{
            method:'POST',
            headers:{
                'Content-Type': "application/json", 
            },
            body: JSON.stringify({noteText})
        });

        //Do nothing to state if error
        if (newCardPromise.status === 500){
            return {success: false, error: await newCardPromise.json()};
        }
        const {newNote} : {newNote: Note}= await newCardPromise.json();
        //Newest Note to the front
        setNotes([newNote,...notes]);
        return {success: true};
    }catch (err) {
        console.log(`Error: ${err}`);
        return {success: false};
    }
}

//Sorts Notes based on Order Modified
const handleNoteStateChange = (note: Note) => {
    let indexOfNoteToChange;
    const updatedNotes = notes.map((msg, index)=>{
        if(msg.id === note.id){
            msg.note = note.note;
            msg.date_modified = note.date_modified;
            indexOfNoteToChange = index;
        }
        return msg;
    })
    if (indexOfNoteToChange) {
        const noteToTop = updatedNotes[indexOfNoteToChange];
        updatedNotes.splice(indexOfNoteToChange,1);
        updatedNotes.unshift(noteToTop);
    }
    setNotes(updatedNotes)
}

 //Fetch Notes from DB upon Mount
 useEffect(()=>{
    fetch('/api')
    .then((res)=>res.json())
    .then(({notes})=>{
        setNotes(notes)})
    .catch(err=>console.log(`Error: ${err}`))
},[]);

    return (
        <div className="flex flex-col items-center">
            <SearchBar handleSearchText={handleSearchText} />
            <NotesList  handleNoteStateChange={handleNoteStateChange} handleAddCard={handleAddCard} handleDeleteNote={handleDeleteNote} notes={handleFilterNotes()}/>
        </div>
    )
}
