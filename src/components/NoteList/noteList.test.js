import { render, screen, fireEvent } from '@testing-library/react';
import NotesList from '../NoteList';

const mockNotes = [
    { id: 1, text: 'Note 1', date: '2023-01-01' },
    { id: 2, text: 'Note 2', date: '2023-01-02' },
  ];
 
describe('NoteList component', () => {

    test('renders without crashing', () => {
        render(<NotesList notes={[]} handleAddNote={() => {}} handleDeleteNote={() => {}} />);
    });
  
    test('does not render AddNote component if there are no notes', () => {
        render(<NotesList notes={[]} handleAddNote={() => {}} handleDeleteNote={() => {}} />);
    
        const addNoteComponent = screen.queryByRole('form');
        expect(addNoteComponent).toBeNull();
    });

    test('calls handleDeleteNote when Note is deleted', () => {
        const mockHandleDeleteNote = jest.fn();
        render(<NotesList notes={mockNotes} handleAddNote={() => {}} handleDeleteNote={mockHandleDeleteNote} />);
    
        const deleteButtons = screen.getAllByTestId('delete-icon'); // using testId to select the delete icon
        deleteButtons.forEach((button, index) => {
        fireEvent.click(button);
        expect(mockHandleDeleteNote).toHaveBeenCalledWith(mockNotes[index].id);
        });
    });
});

