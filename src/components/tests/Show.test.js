import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const testShow = {
    name: "test show",
    summary: "a summary",
    seasons: [
      { id: 0, name: "Season 1", episodes: [] },
      { id: 1, name: "Season 2", episodes: [] },
      { id: 2, name: "Season 3", episodes: [] },
      { id: 3, name: "Season 4", episodes: [] },
      { id: 4, name: "Season 5", episodes: [] },
    ],
  };
  
  test("renders without errors", async () => {
    render(<Show show={testShow} selectedSeason={"none"} />);
  });
  
  test("renders Loading component when prop show is null", async () => {
    render(<Show show={null} selectedSeason={"none"} />);
    const loading = await screen.findByText("Fetching data...", { exact: false });
    expect(loading).toBeInTheDocument();
  });
  
  test("renders same number of options seasons are passed in", async () => {
    render(<Show show={testShow} selectedSeason={"none"} />);
  
    const seasonOptions = screen.queryAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(5);
  });
  
  test("handleSelect is called when an season is selected", () => {
    const handleSelect = jest.fn();
    render(
      <Show show={testShow} selectedSeason={"none"} handleSelect={handleSelect} />
    );
    const select = screen.getByLabelText(/Select a Season/i);
    userEvent.selectOptions(select, ["1"]);
  
    expect(handleSelect).toBeCalled();
  });
  

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const {rerender} = render(<Show show={testShow} selectedSeason={"none"}/>)
   let episodes = screen.queryByTestId("episodes-container")
   expect(episodes).not.toBeInTheDocument()

   rerender(<Show show={testShow} selectedSeason={1}/>)
   episodes = screen.queryByTestId("episodes-container")
   expect(episodes).toBeInTheDocument()
});
