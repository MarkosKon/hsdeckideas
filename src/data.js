const cachedData = localStorage.getItem('data');
const cachedVersion = parseInt(localStorage.getItem('version'), 10);
const dataVersion = 33;

if (!cachedData && cachedVersion !== dataVersion) {
  window.cachedData = fetch('/resources/data/data.json')
    .then(res => res.json())
    .then((data) => {
      localStorage.setItem('version', dataVersion);
      localStorage.setItem('data', JSON.stringify(data));
      return data;
    });
} else {
  // eslint-disable-next-line compat/compat
  window.cachedData = Promise.resolve(JSON.parse(cachedData));
}
