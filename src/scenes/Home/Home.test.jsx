// https://github.com/webpack-contrib/worker-loader/issues/10

import React from 'react';
import {
  render, cleanup, fireEvent, wait,
} from 'react-testing-library';
import { MemoryRouter as Router } from 'react-router-dom';
import sortBy from 'lodash.sortby';
import 'jest-dom/extend-expect';

import Home from './Home';
import data from '../../../public/resources/data/data';

const heroes = data[2].content;
const archetypes = sortBy(data[1].content, 'name');
const heroPowers = data[3].content;
const heroCodes = [274, 31, 637, 671, 813, 930, 1066, 893, 7];
const cards = data[0].content;
const extraDeckWideFilters = sortBy(data[4].content, ['group']);

afterEach(cleanup);

test('renders without crashing', () => {
  render(
    <Router initialEntries={['/']}>
      <Home
        heroes={heroes}
        archetypes={archetypes}
        heroPowers={heroPowers}
        heroCodes={heroCodes}
        cards={cards}
        extraDeckWideFilters={extraDeckWideFilters}
      />
    </Router>,
  );
});

test('generate a deck and verify that it outputs things', async () => {
  const { getByLabelText, getByText } = render(
    <Router initialEntries={['/']}>
      <Home
        heroes={heroes}
        archetypes={archetypes}
        heroPowers={heroPowers}
        heroCodes={heroCodes}
        cards={cards}
        extraDeckWideFilters={extraDeckWideFilters}
      />
    </Router>,
  );
  fireEvent.click(getByLabelText(/generate idea/i));

  // await because of react-loadable.
  await wait(() => {
    expect(getByText(/deck diagram/i)).toBeTruthy();
    expect(getByText(/deck history/i)).toBeTruthy();
    expect(getByText(/copy code/i)).toBeTruthy();

    expect(getByText(/decklist/i)).toBeTruthy();
    expect(getByText(/basic info/i)).toBeTruthy();
    expect(getByText(/mana curve/i)).toBeTruthy();
    expect(getByText(/statistics/i)).toBeTruthy();

    // expect(getByText(/size: 30/i)).toBeTruthy();
    expect(getByText(/^size:$/i)).toBeTruthy();
    expect(getByText(/^30$/i)).toBeTruthy();
  });
});

// see cypress tests.
// test('generate a deck and verify that the deck buttons work', async () => {
//   const { getByLabelText, getByText, debug } = render(
//     <div id="root">
//       <Router initialEntries={['/']}>
//         <Home
//           heroes={heroes}
//           archetypes={archetypes}
//           heroPowers={heroPowers}
//           heroCodes={heroCodes}
//           cards={cards}
//           extraDeckWideFilters={extraDeckWideFilters}
//         />
//       </Router>
//     </div>,
//   );
//   fireEvent.click(getByLabelText(/generate idea/i));

//   await wait(() => {
//     fireEvent.click(getByText(/deck diagram/i));
//     getByText(/zoom-in/i);
//     fireEvent.click(getByLabelText(/close modal/i));
//   });

//   await wait(() => {
//     fireEvent.click(getByText(/deck diagram/i));
//     getByText(/zoom-in/i);
//   });
// });
