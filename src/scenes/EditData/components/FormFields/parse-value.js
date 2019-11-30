export default (value) => {
  const float = parseFloat(value, 10);
  // eslint-disable-next-line compat/compat
  if (Number.isNaN(float)) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  }
  return float;
};
