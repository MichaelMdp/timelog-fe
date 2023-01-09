import { render, screen } from '@testing-library/react';
import Entry from "../Entry"
import mockWorkEntries from "../../../data/mockedEntries";


describe('Entry', () => {
  it('renders an Entry', () => {
    const entryMock = mockWorkEntries()[0]
    render(<Entry entry={entryMock} height={100} ypos={0} />);

    //screen.debug();
    expect(screen.getByText('client 1')).toBeInTheDocument()
    expect(screen.getByText('1.5h')).toBeInTheDocument()
    expect(screen.getByText('hard work')).toBeInTheDocument()
  });
});
