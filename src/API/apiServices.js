const BASE_URL = "https://crudcrud.com/api/4d2756ab7171445f8ead5d981391f07a";

export const makeAPIRequest = async (
  endpoint,
  { method, obj = null, id = "" } = {}
) => {
  const url = `${BASE_URL}/${endpoint}${id ? `/${id}` : ""}`;
  const options = {
    method,
    headers: {},
  };

  if (obj && (method === "POST" || method === "PUT")) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(obj);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error(`API call failed: ${url}`, error);
    throw error;
  }
};

/* const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Network response was not ok: ${errorText}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
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
    console.error("API call failed:", url, options, error);
    throw error;
  }
}; */
