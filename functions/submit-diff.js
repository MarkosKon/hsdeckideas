const faunadb = require('faunadb');
const objectHash = require('object-hash');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = (event) => {
  const data = JSON.parse(event.body);
  const hash = objectHash(data);
  const diff = {
    ...data,
    hash,
  };
  console.log("Function 'submit-diff' invoked");
  return client
    .query(q.Create(q.Collection('diffs'), { data: diff }))
    .then((response) => {
      console.log('success', { response });
      return {
        statusCode: 200,
        body: 'Successful submission',
      };
    })
    .catch((error) => {
      console.log('error', { error });
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message }),
      };
    });
};
