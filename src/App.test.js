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

test('Toggle dark mode', () => {
  render(<App />);
  
  const darkModeToggleButton = screen.getByText('Toggle Mode');

  fireEvent.click(darkModeToggleButton);

  expect(document.body.classList.contains('dark-mode')).toBe(false);

  fireEvent.click(darkModeToggleButton);

  expect(document.body.classList.contains('dark-mode')).toBe(false);
});