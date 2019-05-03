const hostUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : 'http://localhost:5000';


async function verifyEntry(data) {
    const {address, city, state, zipcode} = data 
    let url = `${hostUrl}/verify?address=${address}&city=${city}&state=${state}&zipcode=${zipcode}`
    url = url.replace(/#/g, '%23');
    const response = await fetch(url, {
        accept: 'application/json',
    });
  const checkedStatus = checkStatus(response);
  const parsedJson = await parseJSON(checkedStatus);
  return parsedJson;
}

async function getCityState(data) {
    const {zipcode} = data
    const response = await fetch(`${hostUrl}/citystate?zipcode=${zipcode}`, {
      accept: 'application/json',
    });
    const checkedStatus = checkStatus(response);
    const parsedJson = await parseJSON(checkedStatus);
    return parsedJson;
  }

  async function getZipCode(data) {
    const {address, city, state, zipcode} = data
    let url = `${hostUrl}/zipcode?address=${address}&city=${city}&state=${state}&zipcode=${zipcode}`
    url = url.replace(/#/g, '%23');
    const response = await fetch(url, {
        accept: 'application/json',
      });
    const checkedStatus = checkStatus(response);
    const parsedJson = await parseJSON(checkedStatus);
    return parsedJson;
  }

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error, 'error'); // eslint-disable-line no-console
  throw error;
}

async function parseJSON(response) {
  return response.json();
}

export {
  getCityState,
  getZipCode,
  verifyEntry
};
