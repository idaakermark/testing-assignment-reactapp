import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

describe('Header component', () => {

    test('The page has a relevant title and its displayed on the page', () => {
        render(<Header />);
        expect(screen.getByText('Notes')).toBeInTheDocument();
    });
      
    test('toggles dark mode when Toggle Mode button is clicked', () => {
        let darkMode = false;
        const mockToggleDarkMode = jest.fn((prevDarkMode) => {
          darkMode = !prevDarkMode;
        });
        render(<Header handleToggleDarkMode={mockToggleDarkMode} />);
        
        fireEvent.click(screen.getByText('Toggle Mode'));
        expect(darkMode).toBe(false);
    });

    test('toggles dark mode back to light mode on second button click', () => {
        let darkMode = true;
        const handleToggleDarkMode = () => {
          darkMode = !darkMode;
        };
        render(<Header handleToggleDarkMode={handleToggleDarkMode} />);
    
        const toggleModeButton = screen.getByText('Toggle Mode');
        fireEvent.click(toggleModeButton);
    
        expect(darkMode).toBe(false);
      });
      
    test('should have a button with role="button"', () => {
        render(<Header />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });
});
