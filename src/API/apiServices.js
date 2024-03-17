const BASE_URL = 'https://crudcrud.com/api/4d2756ab7171445f8ead5d981391f07a';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Network response was not ok: ${errorText}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return await response.json();
  } else {
    return null;
  }
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    console.error('API call failed:', url, options, error);
    throw error;
  }
};

export const fetchEndpoint = (endpoint) => {
  let url = `${BASE_URL}/${endpoint}`;
  return fetchData(url);
};

export const fetchWithID = (endpoint, id) => {
  let url = `${BASE_URL}/${endpoint}/${id}`;
  return fetchData(url);
};

export const POSTRequest = async (obj, endpoint) => {
  const response = await fetchData(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return response;
};

export const PUTRequest = async (obj, endpoint, id) => {
  const response = await fetchData(`${BASE_URL}/${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return response;
};

export const DELETERequest = (id, endpoint) => {
  return fetchData(`${BASE_URL}/${endpoint}/${id}`, { method: 'DELETE' });
};
