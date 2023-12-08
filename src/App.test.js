import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('Add note and check if it is displayed', () => {
  render(<App />);
  
  const initialNotesCount = screen.getAllByTestId('note').length;

  fireEvent.change(screen.getByPlaceholderText('Type to add a note...'), {
    target: { value: 'This is a new note!' },
  });
  fireEvent.click(screen.getByText('Save'));

  const newNotesCount = screen.getAllByTestId('note').length;
  expect(newNotesCount).toBe(initialNotesCount + 1);
});

test('Delete a note and check if it is removed', () => {
  render(<App />);
  
  const initialNotesCount = screen.getAllByTestId('note').length;

  fireEvent.click(screen.getAllByTestId('delete-icon')[0]);

  const newNotesCount = screen.getAllByTestId('note').length;
  expect(newNotesCount).toBe(initialNotesCount - 1);
});

test('renders added note text on the page', () => {
  render(<App />);

  const addNoteInput = screen.getByPlaceholderText('Type to add a note...');

  fireEvent.change(addNoteInput, { target: { value: 'This is a new note for testing' } });
  fireEvent.click(screen.getByText('Save'));

  const addedNote = screen.getByText('This is a new note for testing');

  expect(addedNote).toBeInTheDocument();
});