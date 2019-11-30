import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const Select = ({ cards, callback }) => {
  const debounced = debounce(({ target: { value } }) => {
    const card = cards.find(c => c.name === value);
    callback(card);
  }, 80);
  return (
    <div sx={{ p: 1, alignItems: 'center', flexWrap: 'wrap' }}>
      <label htmlFor="card-select" sx={{ mb: 2, mr: 2 }}>
        Choose a card:
        <select
          id="card-select"
          sx={{ p: 1, fontSize: 2, mb: 2 }}
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
        </select>
      </label>
    </div>
  );
};

Select.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  callback: PropTypes.func.isRequired,
};

export default Select;
