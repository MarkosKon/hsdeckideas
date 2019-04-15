// Wow.

import React from 'react';
import ReactDOM from 'react-dom';
import Filters from './Filters';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Filters
      isCompetitive
      selectHero={3}
      format="Standard"
      archetype="Random"
      heroes={[]}
      selectInterestingCards={[]}
      selectNonInterestingCards={[]}
      selectExtraDeckWideFilters={[]}
      interestingCards={[]}
      nonInterestingCards={[]}
      extraDeckWideFilters={[]}
      archetypes={[]}
      handleSelectFormat={() => {}}
      handleSelectHero={() => {}}
      handleSelectArchetype={() => {}}
      handleSelectInterestingCards={() => {}}
      handleSelectNonInterestingCards={() => {}}
      handleCompetitiveCheckbox={() => {}}
      handleSelectVersion={() => {}}
      handleSelectExtraDeckWideFilters={() => {}}
      handleOpenCardDetailsModal={() => {}}
    />,
    div,
  );
});
