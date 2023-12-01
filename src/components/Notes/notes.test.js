import { render, fireEvent, screen } from '@testing-library/react';
import Note from '../Notes';

const mockNote = { id: 1, text: 'Test Note', date: '2023-01-01' };

describe('NoteList component', () => {

    test('renders note text', () => {
        render(<Note {...mockNote} handleDeleteNote={() => {}} />);

        const noteTextElement = screen.getByText(mockNote.text);
        expect(noteTextElement).toBeInTheDocument();
    });

    test('renders note date', () => {
        render(<Note {...mockNote} handleDeleteNote={() => {}} />);

        const noteDateElement = screen.getByText(mockNote.date);
        expect(noteDateElement).toBeInTheDocument();
    });

    test('renders delete button', () => {
        render(<Note {...mockNote} handleDeleteNote={() => {}} />);

        const deleteButton = screen.getByTestId('delete-icon');
        expect(deleteButton).toBeInTheDocument();
    });

    test('calls handleDeleteNote when delete button is clicked', () => {
        const mockHandleDeleteNote = jest.fn();
        render(<Note {...mockNote} handleDeleteNote={mockHandleDeleteNote} />);

        const deleteButton = screen.getByTestId('delete-icon');
        fireEvent.click(deleteButton);

        expect(mockHandleDeleteNote).toHaveBeenCalledWith(mockNote.id);
    });

    test('does not render note footer if date is not provided', () => {
        const noteWithoutDate = { ...mockNote, date: undefined };
        render(<Note {...noteWithoutDate} handleDeleteNote={() => {}} />);

        const noteFooter = screen.queryByRole('note-footer');
        expect(noteFooter).toBeNull();
    });
});