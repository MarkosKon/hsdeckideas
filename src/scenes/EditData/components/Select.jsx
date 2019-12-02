import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

const Container = styled.div`
  padding: 3.375px;
  align-items: center;
  display: flex;
  flex-wrap: 'wrap';
`;

const SelectEl = styled.select`
  padding: 3.375px;
  margin-bottom: 6.75px;
  margin-left: 6.75px;
`;

const Label = styled.label`
  margin-bottom: 6.75px;
  margin-right: 6.75px;
`;

const Select = ({ cards, callback }) => {
  const debounced = debounce(({ target: { value } }) => {
    const card = cards.find(c => c.name === value);
    callback(card);
  }, 80);
  return (
    <Container>
      <Label htmlFor="card-select">
        Choose a card:
        <SelectEl
          id="card-select"
          onChange={(e) => {
            e.persist();
            debounced(e);
          }}
        >
          {cards.map(card => (
            <option key={card.id} value={card.name}>
              {card.name}
            </option>
          ))}
        </SelectEl>
      </Label>
    </Container>
  );
};

Select.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  callback: PropTypes.func.isRequired,
};

export default Select;
