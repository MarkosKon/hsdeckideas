/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Fragment } from 'react';
import {
  Field, FieldArray, Form, ErrorMessage,
} from 'formik';
import PropTypes from 'prop-types';
import { Button } from 'already-styled-components';

import { cardProperties, cardExtra, operations } from './select-options';
import parseValue from './parse-value';

const FormFields = ({ values }) => (
  <Form>
    <label sx={{ variant: 'label' }}>
      Rating:
      <Field name="rating" as="select">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </Field>
    </label>
    <ErrorMessage name="rating" />
    <label sx={{ variant: 'label', flexFlow: 'column' }}>
      Extra attributes:
      <FieldArray
        name="extra"
        render={arrayHelpers => (
          <ol sx={{ mt: 2 }}>
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
                  <Button
                    sx={{
                      py: 2,
                      px: 3,
                      ml: 2,
                      color: 'white',
                      bg: 'red',
                    }}
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    -
                  </Button>
                  <Button
                    sx={{
                      py: 2,
                      px: 3,
                      color: 'white',
                      bg: 'green',
                    }}
                    type="button"
                    onClick={() => arrayHelpers.insert(index + 1, 'GENERAL')}
                  >
                    +
                  </Button>
                </li>
              ))
            ) : (
              <Button
                sx={{ py: 2, px: 3, color: 'white' }}
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
              <h3 sx={{ fontSize: 3, m: 0, mb: 2 }}>
                Versions &#40;
                {values.versions.length}
                &#41;
              </h3>
              <ol>
                {values.versions.map((version, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index}>
                    <label sx={{ variant: 'label' }}>
                      Version name:
                      <Field name={`versions.${index}.name`} type="text" />
                      <Button
                        sx={{
                          py: 2,
                          px: 3,
                          ml: 2,
                          color: 'white',
                          bg: 'red',
                        }}
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </Button>
                      <Button
                        sx={{
                          py: 2,
                          px: 3,
                          color: 'white',
                          bg: 'green',
                        }}
                        type="button"
                        onClick={() => arrayHelpers.insert(index + 1, {})}
                      >
                        +
                      </Button>
                    </label>
                    <FieldArray
                      name={`versions.${index}.priorities`}
                      render={priorityHelpers => (
                        <Fragment>
                          {version.priorities && version.priorities.length > 0 ? (
                            <Fragment>
                              <h4 sx={{ m: 0, mb: 2 }}>This card needs:</h4>
                              <ol>
                                {version.priorities.map((priority, pIndex) => (
                                  <li key={priority.id}>
                                    {/* <div>
                                      <strong>ID: </strong>
                                      <span>{priority.id}</span>
                                    </div> */}
                                    <label
                                      sx={{
                                        variant: 'label',
                                        display: 'inline-block',
                                      }}
                                    >
                                      {/* <strong>Minimum cards: </strong> */}
                                      <Field
                                        name={`versions.${index}.priorities.${pIndex}.minCards`}
                                        type="number"
                                        sx={{ maxWidth: '48px' }}
                                      />
                                    </label>
                                    <span> - </span>
                                    <label
                                      sx={{
                                        variant: 'label',
                                        display: 'inline-block',
                                      }}
                                    >
                                      {/* <strong>Maximum cards: </strong> */}
                                      <Field
                                        name={`versions.${index}.priorities.${pIndex}.maxCards`}
                                        type="number"
                                        sx={{
                                          maxWidth: '48px',
                                          ml: '0!important',
                                        }}
                                      />
                                    </label>
                                    <span> cards</span>
                                    <Button
                                      sx={{
                                        py: 2,
                                        px: 3,
                                        color: 'white',
                                        bg: 'red',
                                        ml: 2,
                                      }}
                                      type="button"
                                      onClick={() => priorityHelpers.remove(index)}
                                    >
                                      -
                                    </Button>
                                    <Button
                                      sx={{
                                        py: 2,
                                        px: 3,
                                        color: 'white',
                                        bg: 'green',
                                      }}
                                      type="button"
                                      onClick={() => priorityHelpers.insert(index + 1, {
                                        id: Math.random(),
                                        minCards: 2,
                                        maxCards: 4,
                                        filters: [],
                                      })
                                      }
                                    >
                                      +
                                    </Button>
                                    <FieldArray
                                      name={`versions.${index}.priorities.${pIndex}.filters`}
                                      render={filterHelpers => (
                                        <Fragment>
                                          {priority.filters && priority.filters.length > 0 ? (
                                            <Fragment>
                                              <h5 sx={{ mt: 0, mb: 2 }}>Where:</h5>
                                              <ol>
                                                {priority.filters.map((filter, fIndex) => (
                                                  // lol @ airbnb.
                                                  // eslint-disable-next-line max-len
                                                  // eslint-disable-next-line react/no-array-index-key
                                                  <li key={fIndex}>
                                                    <label
                                                      sx={{
                                                        mr: 2,
                                                        variant: 'label',
                                                        display: 'inline-block',
                                                      }}
                                                    >
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
                                                    <label
                                                      sx={{
                                                        mr: 2,
                                                        variant: 'label',
                                                        display: 'inline-block',
                                                      }}
                                                    >
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
                                                    <label
                                                      sx={{
                                                        variant: 'label',
                                                        display: 'inline-block',
                                                      }}
                                                    >
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
                                                    <Button
                                                      sx={{
                                                        py: 2,
                                                        px: 3,
                                                        ml: 2,
                                                        color: 'white',
                                                        bg: 'red',
                                                      }}
                                                      type="button"
                                                      onClick={() => filterHelpers.remove(index)}
                                                    >
                                                      -
                                                    </Button>
                                                    <Button
                                                      sx={{
                                                        py: 2,
                                                        px: 3,
                                                        color: 'white',
                                                        bg: 'green',
                                                      }}
                                                      type="button"
                                                      // eslint-disable-next-line max-len
                                                      onClick={() => filterHelpers.insert(index + 1, {
                                                        property: 'cost',
                                                        operation: 'LESS_THAN',
                                                        minValue: '',
                                                      })
                                                      }
                                                    >
                                                      +
                                                    </Button>
                                                  </li>
                                                ))}
                                              </ol>
                                            </Fragment>
                                          ) : (
                                            <Button
                                              sx={{
                                                py: 2,
                                                px: 3,
                                                color: 'white',
                                                display: 'block',
                                              }}
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
                                          )}
                                        </Fragment>
                                      )}
                                    />
                                  </li>
                                ))}
                              </ol>
                            </Fragment>
                          ) : (
                            <Button
                              sx={{ py: 2, px: 3, color: 'white' }}
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
                          )}
                        </Fragment>
                      )}
                    />
                  </li>
                ))}
              </ol>
            </Fragment>
          ) : (
            <Button
              sx={{ py: 2, px: 3, color: 'white' }}
              type="button"
              onClick={() => arrayHelpers.push({})}
            >
              Add a version
            </Button>
          )}
        </Fragment>
      )}
    />
    {/* <code>{JSON.stringify(values.versions, null, 2)}</code> */}
    <div sx={{ mt: 2 }}>
      <Button sx={{ color: 'background' }} type="submit">
        Save card changes
      </Button>
    </div>
  </Form>
);

FormFields.propTypes = {
  values: PropTypes.shape({
    id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    extra: PropTypes.arrayOf(PropTypes.string).isRequired,
    versions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default FormFields;
