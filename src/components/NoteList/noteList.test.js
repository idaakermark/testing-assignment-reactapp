import { render, screen, fireEvent } from '@testing-library/react';
import NotesList from '../NoteList';

const mockNotes = [
    { id: 1, text: 'Note 1', date: '2023-01-01' },
    { id: 2, text: 'Note 2', date: '2023-01-02' },
  ];
 
describe('NoteList component', () => {
  
    test('does not render AddNote component if there are no notes', () => {
        render(<NotesList notes={[]} handleAddNote={() => {}} handleDeleteNote={() => {}} />);
    
        const addNoteComponent = screen.queryByRole('form');
        expect(addNoteComponent).toBeNull();
    });

    const mockHandleAddNote = jest.fn();
    test('Save button is enabled after adding text to the note', () => {
        render(<NotesList notes={[]} handleAddNote={mockHandleAddNote} handleDeleteNote={() => {}} />);

        const noteTextarea = screen.getByPlaceholderText('Type to add a note...');
        fireEvent.change(noteTextarea, { target: { value: 'New note text' } });

        const saveButton = screen.getByText('Save');
        expect(saveButton).not.toHaveAttribute('disabled');
    });

    test('calls handleDeleteNote when Note is deleted', () => {
        const mockHandleDeleteNote = jest.fn();
        render(<NotesList notes={mockNotes} handleAddNote={() => {
            }} handleDeleteNote={mockHandleDeleteNote} />);
        
            const deleteButtons = screen.getAllByTestId('delete-icon');
        deleteButtons.forEach((button, index) => {
            fireEvent.click(button);
            expect(mockHandleDeleteNote).toHaveBeenCalledWith(mockNotes[index].id);
        });
    });
});

