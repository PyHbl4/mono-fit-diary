const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

async function fetchAPI(url: string, options: RequestInit) {
  const response = await fetch(`${BASE_API_URL}${url}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getRequest(url: string, isAuthorized: boolean = true) {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(isAuthorized && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
    },
  };
  return fetchAPI(url, options);
}

export async function postRequest(url: string, body: object, isAuthorized: boolean = true) {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(isAuthorized && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
    },
    body: JSON.stringify(body),
  };
  return fetchAPI(url, options);
}

export async function putRequest(url: string, body: object, isAuthorized: boolean = true) {
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(isAuthorized && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
    },
    body: JSON.stringify(body),
  };
  return fetchAPI(url, options);
}

export async function patchRequest(url: string, body: object, isAuthorized: boolean = true) {
  const options: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(isAuthorized && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
    },
    body: JSON.stringify(body),
  };
  return fetchAPI(url, options);
}

export async function deleteRequest(url: string, isAuthorized: boolean = true) {
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(isAuthorized && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
    },
  };
  return fetchAPI(url, options);
}
