/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Fragment } from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'already-styled-components';

import { cardProperties, cardExtra, operations } from './select-options';
import parseValue from './parse-value';

const AddRemoveBtn = styled(Button)`
  font-size: 18px;
  padding: 6.75px 13.5px;
  border-radius: 0;
`;

const SaveButton = styled(Button)`
  margin-bottom: 6.75px;
  margin-right: 6.75px;
`;

const FormFields = ({ values }) => (
  <Fragment>
    <label>
      Rating:
      <Field name="rating" as="select">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </Field>
    </label>
    <ErrorMessage name="rating" />
    <label style={{ flexFlow: 'column', alignItems: 'flex-start' }}>
      Extra attributes:
      <FieldArray
        name="extra"
        render={arrayHelpers => (
          <ol style={{ marginTop: '6.75px' }} data-test-id="extras-list">
            {values.extra && values.extra.length > 0 ? (
              values.extra.map((extra, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>
                  <Field name={`extra.${index}`} as="select">
                    {cardExtra.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Field>
                  <AddRemoveBtn
                    bc="#dc3545"
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    -
                  </AddRemoveBtn>
                  <AddRemoveBtn
                    br="0"
                    fs="18px"
                    bc="#28a745"
                    type="button"
                    onClick={() => arrayHelpers.insert(index + 1, 'GENERAL')}
                  >
                    +
                  </AddRemoveBtn>
                </li>
              ))
            ) : (
              <Button
                br="0"
                fs="18px"
                bc="#524B4E"
                type="button"
                onClick={() => arrayHelpers.push('GENERAL')}
              >
                Add an extra
              </Button>
            )}
          </ol>
        )}
      />
    </label>
    <ErrorMessage name="extra" />
    <FieldArray
      name="versions"
      render={arrayHelpers => (
        <Fragment>
          {values.versions && values.versions.length > 0 ? (
            <Fragment>
              <h3>
                Versions &#40;
                {values.versions.length}
                &#41;
              </h3>
              <ol style={{ listStyle: 'upper-latin' }} data-test-id="versions-list">
                {values.versions.map((version, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index} style={{ marginBottom: '81px' }}>
                    <label>
                      Version name:
                      <Field name={`versions.${index}.name`} type="text" />
                      <AddRemoveBtn
                        bc="#dc3545"
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </AddRemoveBtn>
                      <AddRemoveBtn
                        bc="#28a745"
                        type="button"
                        onClick={() => arrayHelpers.insert(index + 1, { name: '', priorities: [] })}
                      >
                        +
                      </AddRemoveBtn>
                    </label>
                    <FieldArray
                      name={`versions.${index}.priorities`}
                      render={priorityHelpers => (
                        <Fragment>
                          {version.priorities && version.priorities.length > 0 ? (
                            <Fragment>
                              <h4>This card needs:</h4>
                              <ol data-test-id="priorities-list">
                                {version.priorities.map((priority, pIndex) => (
                                  // eslint-disable-next-line react/no-array-index-key
                                  <li key={pIndex} style={{ marginBottom: '54px' }}>
                                    {/* <div>
                                      <strong>ID: </strong>
                                      <span>{priority.id}</span>
                                    </div> */}
                                    <label style={{ display: 'inline-block' }}>
                                      {/* <strong>Minimum cards: </strong> */}
                                      <Field
                                        name={`versions.${index}.priorities.${pIndex}.minCards`}
                                        type="number"
                                        min="1"
                                        style={{ maxWidth: '48px' }}
                                      />
                                    </label>
                                    <span> - </span>
                                    <label style={{ display: 'inline-block' }}>
                                      {/* <strong>Maximum cards: </strong> */}
                                      <Field
                                        name={`versions.${index}.priorities.${pIndex}.maxCards`}
                                        type="number"
                                        min="1"
                                        style={{
                                          maxWidth: '48px',
                                          marginLeft: '0!important',
                                        }}
                                      />
                                    </label>
                                    <span> cards </span>
                                    <AddRemoveBtn
                                      bc="#dc3545"
                                      type="button"
                                      onClick={() => priorityHelpers.remove(pIndex)}
                                    >
                                      -
                                    </AddRemoveBtn>
                                    <AddRemoveBtn
                                      bc="#28a745"
                                      type="button"
                                      onClick={() => priorityHelpers.insert(pIndex + 1, {
                                        id: Math.random(),
                                        minCards: 2,
                                        maxCards: 4,
                                        filters: [],
                                      })
                                      }
                                    >
                                      +
                                    </AddRemoveBtn>
                                    <FieldArray
                                      name={`versions.${index}.priorities.${pIndex}.filters`}
                                      render={filterHelpers => (
                                        <Fragment>
                                          {priority.filters && priority.filters.length > 0 ? (
                                            <Fragment>
                                              <h5>Where:</h5>
                                              <ol data-test-id="filters-list">
                                                {priority.filters.map((filter, fIndex) => (
                                                  // lol @ airbnb.
                                                  // eslint-disable-next-line max-len
                                                  // eslint-disable-next-line react/no-array-index-key
                                                  <li key={fIndex}>
                                                    <label style={{ display: 'inline-block' }}>
                                                      {/* <strong>Property: </strong> */}
                                                      <Field
                                                        name={`versions.${index}.priorities.${pIndex}.filters.${fIndex}.property`}
                                                        as="select"
                                                      >
                                                        {cardProperties.map(({ value, label }) => (
                                                          <option key={value} value={value}>
                                                            {label}
                                                          </option>
                                                        ))}
                                                      </Field>
                                                    </label>
                                                    <label style={{ display: 'inline-block' }}>
                                                      {/* <strong>Operation: </strong> */}
                                                      <Field
                                                        name={`versions.${index}.priorities.${pIndex}.filters.${fIndex}.operation`}
                                                        as="select"
                                                      >
                                                        {operations.map(({ value, label }) => (
                                                          <option key={value} value={value}>
                                                            {label}
                                                          </option>
                                                        ))}
                                                      </Field>
                                                    </label>
                                                    <label style={{ display: 'inline-block' }}>
                                                      {/* <strong>Value: </strong> */}
                                                      <Field
                                                        type="text"
                                                        name={`versions.${index}.priorities.${pIndex}.filters.${fIndex}.minValue`}
                                                      >
                                                        {({ field, form: { setFieldValue } }) => (
                                                          <input
                                                            type="text"
                                                            placeholder="Enter a value"
                                                            {...field}
                                                            onChange={e => setFieldValue(
                                                              field.name,
                                                              parseValue(e.target.value),
                                                            )
                                                            }
                                                          />
                                                        )}
                                                      </Field>
                                                    </label>
                                                    <AddRemoveBtn
                                                      bc="#dc3545"
                                                      type="button"
                                                      onClick={() => filterHelpers.remove(fIndex)}
                                                    >
                                                      -
                                                    </AddRemoveBtn>
                                                    <AddRemoveBtn
                                                      bc="#28a745"
                                                      type="button"
                                                      // eslint-disable-next-line max-len
                                                      onClick={() => filterHelpers.insert(fIndex + 1, {
                                                        property: 'cost',
                                                        operation: 'LESS_THAN',
                                                        minValue: '',
                                                      })
                                                      }
                                                    >
                                                      +
                                                    </AddRemoveBtn>
                                                  </li>
                                                ))}
                                              </ol>
                                            </Fragment>
                                          ) : (
                                            <div style={{ margin: '13.5px' }}>
                                              <Button
                                                br="0"
                                                fs="18px"
                                                bc="#524B4E"
                                                type="button"
                                                onClick={() => filterHelpers.push({
                                                  property: 'cost',
                                                  operation: 'LESS_THAN',
                                                  minValue: '',
                                                })
                                                }
                                              >
                                                Add a filter
                                              </Button>
                                            </div>
                                          )}
                                        </Fragment>
                                      )}
                                    />
                                  </li>
                                ))}
                              </ol>
                            </Fragment>
                          ) : (
                            <div style={{ margin: '13.5px' }}>
                              <Button
                                br="0"
                                fs="18px"
                                bc="#524B4E"
                                type="button"
                                onClick={() => {
                                  priorityHelpers.push({
                                    id: Math.random(),
                                    minCards: 2,
                                    maxCards: 4,
                                    filters: [],
                                  });
                                }}
                              >
                                Add a priority
                              </Button>
                            </div>
                          )}
                        </Fragment>
                      )}
                    />
                  </li>
                ))}
              </ol>
            </Fragment>
          ) : (
            <div style={{ margin: '13.5px' }}>
              <Button
                br="0"
                fs="18px"
                bc="#524B4E"
                type="button"
                onClick={() => arrayHelpers.push({ name: '', priorities: [] })}
              >
                Add a version
              </Button>
            </div>
          )}
        </Fragment>
      )}
    />
    <h3 style={{ margin: '54px 0 27px' }}>Card actions</h3>
    <SaveButton br="0" fs="18px" bc="#29a745" type="submit">
      Save card changes
    </SaveButton>
  </Fragment>
);

FormFields.propTypes = {
  values: PropTypes.shape({
    id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    extra: PropTypes.arrayOf(PropTypes.string).isRequired,
    versions: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default FormFields;
