import { render, fireEvent, screen } from '@testing-library/react';
import Search from '../Search';

describe('Search component', () => {

    test('renders search input', () => {
        render(<Search handleSearchNote={() => {}} />);

        const searchInput = screen.getByRole('textbox');
        expect(searchInput).toBeInTheDocument();
    });

    test('calls the handleSearchNote when the input value changes', () => {
        const mockHandleSearchNote = jest.fn();
        render(<Search handleSearchNote={mockHandleSearchNote} />);

        const searchInput = screen.getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'test' } });

        expect(mockHandleSearchNote).toHaveBeenCalledWith('test');
    });

    test('does not render the search icon if not provided', () => {
        render(<Search handleSearchNote={() => {}} />);

        const searchIcon = screen.queryByTestId('search-icon');
        expect(searchIcon).toBeNull();
    });
});
