import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

describe('Header component', () => {

    test('renders without crashing', () => {
      render(<Header />);
    });

    test('renders the correct title', () => {
        render(<Header />);
        expect(screen.getByText('Notes')).toBeInTheDocument();
    });
      
    test('calls handleToggleDarkMode when Toggle Mode button is clicked', () => {
        const mockToggleDarkMode = jest.fn();
        render(<Header handleToggleDarkMode={mockToggleDarkMode} />);
      
        fireEvent.click(screen.getByText('Toggle Mode'));
        expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
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
      
    test('should have a button with role="button"', () => {
        render(<Header />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });
});
