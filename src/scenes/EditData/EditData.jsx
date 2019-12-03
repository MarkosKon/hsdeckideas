import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import sortBy from 'lodash.sortby';
import partition from 'lodash.partition';
import { Button } from 'already-styled-components';
import { diff, formatters } from 'jsondiffpatch';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

import 'jsondiffpatch/dist/formatters-styles/html.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar';
import UICard from '../../components/UICard/UICard';
import SEO from '../../components/SEO/SEO';
import Select from './components/Select';
import { FormFields, validationSchema, parseValue } from './components/FormFields';

formatters.html.hideUnchanged();

const ContainerCard = styled(UICard)`
  padding-bottom: 12px;
  p {
    margin-bottom: 27px;
  }

  label {
    font-weight: 700;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 520px;
    margin-bottom: 6.75px;
    input,
    select {
      line-height: normal;
      margin-left: 6.75px;
      margin-right: 6.75px;
      padding: 3.375px;
    }
  }
  ol,
  ul {
    margin-bottom: 27px;
    padding-left: 27px;
  }
  ul ul,
  ul ol {
    margin: 0;
  }
  h4,
  h5 {
    margin: 13.5px 0;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 6.75px;
  & > button {
    margin-bottom: 6.75px;
    margin-right: 6.75px;
  }
  & > button:last-child() {
    margin-right: 0px;
  }
`;

const HeaderContent = styled.div`
  max-width: 540px;
  margin: auto;
  text-align: left;
  span {
    font-size: 16px !important;
  }
`;

const NewFeatures = ({ cards, userCards, setUserCards }) => {
  const [selectedCard, setSelectedCard] = useState(userCards[0]);
  const submitButtonRef = useRef();

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
        description="Edit card data."
        image="https://hsdeckideas.netlify.com/app-preview.jpg"
        url="https://hsdeckideas.netlify.com/edit-data/"
        keywords="hearthstone random deck generator"
      />
      <Header
        title="Edit card data"
        render={() => (
          <HeaderContent>
            <p>
              <span>
                Edit the card data to create interesting card combinations and correct errors!
              </span>
            </p>
            <p>
              <span>
                Right now, the changes are saved in your browser, but in the short future you will
                be able to submit your changes to me. If they make little sense—not much—I will
                gladly add them to the default data, and even create a contributors page with your
                name.
              </span>
            </p>
            <p>
              <span>
                <strong>Don&apos;t invest too much</strong>
                {' '}
with the changes—until you can submit
                them at least—because there is a chance to lose them.
              </span>
            </p>
          </HeaderContent>
        )}
      >
        <Navbar />
      </Header>
      <ContainerCard id="edit-data" title="Edit data">
        <p>
          <span role="img" aria-label="bullet point emoji">
            &#x2728;
          </span>
          This is an
          <strong> experimental </strong>
          and
          <strong> incomplete </strong>
          feature!
        </p>
        <Select cards={userCards} callback={setSelectedCard} />
        {/* Controls */}
        <ButtonContainer>
          <Button
            br="0"
            fs="18px"
            bc="#FF4500"
            onClick={() => {
              // Update the UI, this could be an effect.
              const newSelectCard = cards.find(c => c.id === selectedCard.id);
              setSelectedCard(newSelectCard);
              setUserCards(cards);
              toast.success('Changes gone, your data are in-sync with the official data.', {
                autoClose: 3000,
                toastId: 'sub-success',
              });
            }}
          >
            Discard all changes
          </Button>
          <Button
            br="0"
            fs="18px"
            bc="#663399"
            onClick={() => {
              const delta = diff(cards, userCards);
              const diffEl = document.querySelector('.diff');
              if (delta) diffEl.innerHTML = formatters.html.format(delta, cards);
              else diffEl.innerText = 'No changes to data.';
            }}
          >
            Show diff
          </Button>
          <Button
            br="0"
            fs="18px"
            bc="#524B4E"
            ref={submitButtonRef}
            onClick={() => {
              submitButtonRef.current.setAttribute('disabled', 'disabled');
              const delta = diff(cards, userCards);
              // eslint-disable-next-line compat/compat
              const fakePost = new Promise((resolve) => {
                setTimeout(() => resolve('ok'), 1000);
              });
              if (delta) {
                fakePost
                  .then((res) => {
                    toast.success(`Thanks for your submission! ${res}`, {
                      autoClose: 3000,
                      toastId: 'sub-success',
                    });
                    submitButtonRef.current.removeAttribute('disabled');
                  })
                  .catch((err) => {
                    toast.error(`Something went wrong. Here's the error: ${err}`, {
                      toastId: 'sub-error',
                    });
                    submitButtonRef.current.removeAttribute('disabled');
                  });
              } else {
                toast.success('There is not difference between your data and the default data.', {
                  autoClose: 3000,
                  toastId: 'sub-same',
                });
                submitButtonRef.current.removeAttribute('disabled');
              }
            }}
          >
            Suggest changes
          </Button>
        </ButtonContainer>
        <div className="diff" style={{ padding: '6.75px' }} />
        {selectedCard && (
          <div>
            <h2 style={{ lineHeight: 1.1, margin: '54px 0 27px' }}>{selectedCard.name}</h2>
            <img
              style={{ minHeight: '395px', width: '286px' }}
              src={`/resources/images/${selectedCard.imageUrl}`}
              alt={selectedCard.name}
            />
            <div>
              <strong>Name: </strong>
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
                toast.success(`Saved changes for ${newCard.name}!`, {
                  autoClose: 1500,
                  toastId: 'card-save-success',
                });
              }}
            >
              {FormFields}
            </Formik>
          </div>
        )}
      </ContainerCard>
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
