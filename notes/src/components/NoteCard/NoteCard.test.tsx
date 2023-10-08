import {render, screen, fireEvent} from '@testing-library/react'
import NoteCard from './NoteCard'

describe('NoteCard tests', ()=>{
    const handleNoteStateChange = jest.fn();
    const handleDeleteNote = jest.fn();

    const note = {note: "This is a test Note", id:1, created_at: "1232134", date_modified:"1231344"};
    
 
    beforeEach(()=>{
        render(<NoteCard note={note} handleNoteStateChange={handleNoteStateChange} handleDeleteNote={handleDeleteNote} />)
    })
    
    it('NoteCard displays proper note', async ()=>{
        expect(await screen.getAllByText('This is a test Note').length).toBe(1);
    })

    it('NoteCard Switches to Edit Mode', async ()=>{
        fireEvent.click(await screen.getByText('Edit'))
        expect(await screen.getByRole('textbox')).toBeTruthy()
    })

    
});
