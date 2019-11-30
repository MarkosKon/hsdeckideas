import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ReactGA from 'react-ga';
import sortBy from 'lodash.sortby';
import partition from 'lodash.partition';
import { Button } from 'already-styled-components';
import { diff, formatters } from 'jsondiffpatch';
import { Formik } from 'formik';

import 'jsondiffpatch/dist/formatters-styles/html.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import UICard from '../../components/UICard/UICard';
import SEO from '../../components/SEO/SEO';
import Select from './components/Select';
import { FormFields, validationSchema, parseValue } from './components/FormFields';

formatters.html.hideUnchanged();

const NewFeatures = ({ cards, userCards, setUserCards }) => {
  const [selectedCard, setSelectedCard] = useState(userCards[0]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  });

  return (
    <React.Fragment>
      <SEO
        lang="en"
        title="Edit Data | Hearthstone Deck Ideas"
        description="Edit card data"
        image="https://hsdeckideas.netlify.com/app-preview.jpg"
        url="https://hsdeckideas.netlify.com/edit-data/"
        keywords="hearthstone random deck generator"
      />
      <Header title="Edit card data" paragraphs={['Edit card data (experimental).']}>
        <Navbar />
      </Header>
      <UICard id="edit-data" title="Edit data">
        <Select cards={userCards} callback={setSelectedCard} />
        {/* Controls */}
        <div sx={{ mb: 2 }}>
          <Button
            sx={{
              color: 'background',
              bg: 'secondary',
              fontFamily: 'body',
              mr: 2,
            }}
            onClick={() => {
              // Update the UI, this could be an effect.
              const newSelectCard = cards.find(c => c.id === selectedCard.id);
              setSelectedCard(newSelectCard);

              setUserCards(cards);
            }}
          >
            Discard all changes
          </Button>
          <Button
            onClick={() => {
              const delta = diff(cards, userCards);
              const diffEl = document.querySelector('.diff');
              if (delta) diffEl.innerHTML = formatters.html.format(delta, cards);
              else diffEl.innerText = 'No changes to data.';
            }}
            sx={{
              color: 'background',
              bg: 'primary',
              fontFamily: 'body',
              mr: 2,
            }}
          >
            Show diff
          </Button>
          <Button
            onClick={() => {
              const delta = diff(cards, userCards);
              // eslint-disable-next-line no-console
              console.log({ delta });
            }}
            sx={{
              color: 'background',
              bg: 'accent',
              fontFamily: 'body',
            }}
          >
            Suggest changes
          </Button>
        </div>
        <div className="diff" sx={{ bg: 'mute', p: 2 }} />
        {selectedCard && (
          <div sx={{}}>
            <h2>Selected card</h2>
            <img
              sx={{ minHeight: '395px', width: '286px' }}
              src={`/resources/images/${selectedCard.imageUrl}`}
              alt={selectedCard.name}
            />
            <div>
              <strong sx={{ mb: 1, mr: 1 }}>Name: </strong>
              <span>{selectedCard.name}</span>
            </div>
            <Formik
              enableReinitialize
              initialValues={{
                id: selectedCard.id,
                rating: selectedCard.rating,
                extra: selectedCard.extra,
                versions: selectedCard.versions,
              }}
              validationSchema={validationSchema}
              onSubmit={({
                id, rating, extra, versions,
              }, { setSubmitting }) => {
                const [cardToEdit, otherCards] = partition(userCards, ['id', id]);
                const newCard = {
                  ...cardToEdit[0],
                  id,
                  rating: parseValue(rating),
                  extra,
                  versions,
                };
                if (versions) newCard.activeVersion = 0;
                setUserCards(sortBy([...otherCards, newCard], 'name'));
                setSelectedCard(newCard);
                setSubmitting(false);
              }}
            >
              {FormFields}
            </Formik>
          </div>
        )}
      </UICard>
      <Footer />
    </React.Fragment>
  );
};

NewFeatures.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  userCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  setUserCards: PropTypes.func.isRequired,
};

export default NewFeatures;