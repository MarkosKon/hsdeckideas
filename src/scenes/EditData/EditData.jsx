import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import sortBy from 'lodash.sortby';
import partition from 'lodash.partition';
import { Button } from 'already-styled-components';
import { diff, create, formatters } from 'jsondiffpatch';
import { Formik, Form } from 'formik';
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

const StyledButton = styled(Button)`
  margin-bottom: 6.75px;
  margin-right: 6.75px;
  border-radius: 0px;
  font-size: 18px;
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
  const [newCards, setNewCards] = useState();
  const [changedCards, setChangedCards] = useState();
  const submitButtonRef = useRef();
  const diffRef = useRef();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    diffRef.current.innerHTML = '';
  }, [selectedCard]);

  const byName = card => card.name === selectedCard.name;

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
                You can also submit the changes, and if they make a little sense—not much—I will
                gladly add them to the default data!
              </span>
            </p>
          </HeaderContent>
        )}
      >
        <Navbar />
      </Header>
      <ContainerCard id="edit-data" title="Edit data">
        <Select cards={userCards} callback={setSelectedCard} />
        {selectedCard && (
          <div>
            <h2 style={{ lineHeight: 1.1, margin: '27px 0' }}>{selectedCard.name}</h2>
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
                if (process.env.NODE_ENV === 'production') {
                  ReactGA.event({
                    category: 'User',
                    action: 'Saved changes',
                  });
                }
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
              {({ values }) => (
                <Form>
                  <FormFields values={values} />
                  <StyledButton
                    type="button"
                    bc="#DC3545"
                    onClick={() => {
                      if (process.env.NODE_ENV === 'production') {
                        ReactGA.event({
                          category: 'User',
                          action: 'Discard card changes',
                        });
                      }
                      const originalCard = cards.find(byName);
                      const [, otherCards] = partition(userCards, ['id', selectedCard.id]);
                      setUserCards(sortBy([...otherCards, originalCard], 'name'));
                      setSelectedCard(originalCard);
                      toast.success(`Removed changes for ${originalCard.name}.`, {
                        autoClose: 1500,
                        toastId: 'card-discard-changes-success',
                      });
                    }}
                  >
                    Discard card changes
                  </StyledButton>
                  <StyledButton
                    type="button"
                    bc="#663399"
                    onClick={() => {
                      if (process.env.NODE_ENV === 'production') {
                        ReactGA.event({
                          category: 'User',
                          action: 'Show card diff',
                        });
                      }
                      const originalCard = cards.find(byName);
                      const delta = diff(originalCard, userCards.find(byName));
                      const diffEl = diffRef.current;
                      if (delta) diffEl.innerHTML = formatters.html.format(delta, originalCard);
                      else diffEl.innerText = "You didn't change this card.";
                    }}
                  >
                    Show diff
                  </StyledButton>
                  <StyledButton
                    type="button"
                    bc="#524B4E"
                    ref={submitButtonRef}
                    onClick={() => {
                      if (process.env.NODE_ENV === 'production') {
                        ReactGA.event({
                          category: 'User',
                          action: 'Suggest changes',
                        });
                      }

                      submitButtonRef.current.setAttribute('disabled', 'disabled');
                      const delta = diff(cards.find(byName), userCards.find(byName));

                      if (delta) {
                        fetch('/.netlify/functions/submit-diff', {
                          method: 'POST',
                          body: JSON.stringify({ [selectedCard.name]: delta }),
                        })
                          .then((res) => {
                            if (res.ok) return res;
                            throw Error(res.statusText);
                          })
                          .then(() => {
                            toast.success('Thanks for your submission!', {
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
                        toast.success(
                          'There is no difference between your data and the default data.',
                          {
                            autoClose: 3000,
                            toastId: 'sub-same',
                          },
                        );
                        submitButtonRef.current.removeAttribute('disabled');
                      }
                    }}
                  >
                    Suggest changes
                  </StyledButton>
                </Form>
              )}
            </Formik>
            <div
              ref={diffRef}
              style={{ padding: '6.75px', marginTop: '27px' }}
              data-test-id="single-card-diff"
            />
            <div style={{ marginBottom: '6.75px' }}>
              <h3 style={{ margin: '27px 0' }}>Collection actions</h3>
              <StyledButton
                bc="#DC3545"
                onClick={() => {
                  if (process.env.NODE_ENV === 'production') {
                    ReactGA.event({
                      category: 'User',
                      action: 'Discard changes',
                    });
                  }
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
              </StyledButton>
              <StyledButton
                bc="#663399"
                onClick={() => {
                  if (process.env.NODE_ENV === 'production') {
                    ReactGA.event({
                      category: 'User',
                      action: 'Show changed cards',
                    });
                  }
                  const delta = create({
                    objectHash(obj, index) {
                      return obj.name || `$$index:${index}`;
                    },
                  }).diff(cards, userCards);
                  if (delta) {
                    const keys = Object.keys(delta);
                    const newCardsKeys = keys.filter(key => /_\d/.test(key));
                    const changedCardsKeys = keys.filter(key => !/_/.test(key));
                    setNewCards(
                      cards
                        .filter((card, index) => newCardsKeys.includes(`_${index}`))
                        .map(card => card.name),
                    );
                    setChangedCards(
                      userCards
                        .filter((card, index) => changedCardsKeys.includes(JSON.stringify(index)))
                        .map(card => card.name),
                    );
                  } else {
                    setNewCards([]);
                    setChangedCards([]);
                  }
                }}
              >
                Show changed cards
              </StyledButton>
            </div>
            {newCards && changedCards && newCards.length === 0 && changedCards.length === 0 && (
              <p>You haven&apos;t made any changes.</p>
            )}
            {changedCards && changedCards.length > 0 && (
              <div>
                <h3 style={{ margin: '54px 0 27px' }}>You changed the following cards:</h3>
                <Button
                  br="0"
                  fs="18px"
                  bc="#524B4E"
                  onClick={() => {
                    setNewCards(null);
                    setChangedCards(null);
                  }}
                >
                  Hide changed cards
                </Button>
                <p style={{ maxWidth: '540px' }}>
                  If you want to see what changes you&apos;ve made, select a card from the dropdown
                  and press the &quot;Show diff&quot; button.
                </p>
                <ul>
                  {changedCards.map(changedCard => (
                    <li key={changedCard}>{changedCard}</li>
                  ))}
                </ul>
              </div>
            )}
            {newCards && newCards.length > 0 && (
              <div>
                <h3 style={{ margin: '54px 0 27px' }}>
                  The following cards are in the default data but not in your data:
                  {' '}
                </h3>
                <p style={{ maxWidth: '540px' }}>
                  Probably there was a new expansion, and I added the new cards. If you want to get
                  the new cards, you&apos;ll have to discard any changes you&apos;ve made, and sync
                  your data to the default data.
                </p>
                <ul>
                  {newCards.map(newCard => (
                    <li key={newCard}>{newCard}</li>
                  ))}
                </ul>
              </div>
            )}
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
