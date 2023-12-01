import { render, fireEvent, screen } from '@testing-library/react';
import AddNote from '../AddNote';

describe('AddNote component', () => {

    test('it should have a textarea with role="textbox"', () => {
        render(<AddNote />);
        const textarea = screen.getByRole('textbox');
        expect(textarea).toBeInTheDocument();
    });

    test('it should have a textarea with placeholder text', () => {
        render(<AddNote />);
        const textarea = screen.getByPlaceholderText('Type to add a note...');
        expect(textarea).toBeInTheDocument();
    });

    test('it should display character limit information', () => {
        render(<AddNote />);
        const characterLimitInfo = screen.getByText('200 Remaining');
        expect(characterLimitInfo).toBeInTheDocument();
    });

    test('that it should call handleAddNote when Save button is clicked', () => {
        const mockHandleAddNote = jest.fn();
        render(<AddNote handleAddNote={mockHandleAddNote} />);
    
        const textarea = screen.getByRole('textbox');
        fireEvent.change(textarea, { target: { value: 'Test note text' } });
    
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
    
        expect(mockHandleAddNote).toHaveBeenCalledTimes(1);
        expect(mockHandleAddNote).toHaveBeenCalledWith('Test note text');
    });

    test('testing that handleAddNote is not called when Save button is clicked with empty noteText', () => {
        const mockHandleAddNote = jest.fn();
        render(<AddNote handleAddNote={mockHandleAddNote} />);
    
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
    
        expect(mockHandleAddNote).not.toHaveBeenCalled();
    });
});
    
    
