// apiHelper.js
export const api = (
  path,
  method = "GET",
  body = null,
  credentials = null,
) => {
  const url = "https://full-stack-app.up.railway.app/api" + path;

  // Set options
  const options = {
    method: method,
    headers: {},
  };

  // If body is provided, set options.body and Content-Type header
  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  }

  // If credentials are provided, set Authorization header
  if (credentials) {
    const encodedCredentials = btoa(
      `${credentials.email}:${credentials.password}`
    );
    options.headers.Authorization = `Basic ${encodedCredentials}`;
  }

  return fetch(url, options);
};
