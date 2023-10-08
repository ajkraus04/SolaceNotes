import {render, screen} from '@testing-library/react'
import AddCard from './AddCard'

describe('AddCard initial state tests', ()=>{
    const handleAddCard = jest.fn();
    beforeEach(()=>{
        render(<AddCard handleAddCard={handleAddCard} />)
    });

    it('Button Renders on Page', async ()=>{
        
        expect(await screen.getByRole('button')).toHaveTextContent("Save Note");
    })
    
    it('TextArea starts out empty', async ()=>{
        expect(await screen.getByRole('textbox')).toHaveTextContent("");
    })
});


