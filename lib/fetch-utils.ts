export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');
  
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('auth_token');
    throw new Error('Unauthorized access');
  }

  return response;
}

export const api = {
  get: async (url: string) => {
    return fetchWithAuth(url, {
      method: 'GET',
    });
  },

  post: async (url: string, data?: any) => {
    return fetchWithAuth(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  put: async (url: string, data?: any) => {
    return fetchWithAuth(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  delete: async (url: string, data?: any) => {
    return fetchWithAuth(url, {
      method: 'DELETE',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
}; 