import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Update this with your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
};

// Destination Services
export const destinationService = {
  getAllDestinations: async () => {
    const response = await api.get('/destinations');
    return response.data;
  },

  getDestinationById: async (id: string) => {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  },

  getDestinationsByCategory: async (category: string) => {
    const response = await api.get(`/destinations/category/${category}`);
    return response.data;
  },

  searchDestinations: async (query: string) => {
    const response = await api.get(`/destinations/search?q=${query}`);
    return response.data;
  },
};

// Booking Services
export const bookingService = {
  createBooking: async (bookingData: {
    destinationId: string;
    date: string;
    numberOfGuests: number;
    specialRequests?: string;
  }) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  getUserBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  getBookingById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  cancelBooking: async (id: string) => {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },
};

// Review Services
export const reviewService = {
  createReview: async (reviewData: {
    destinationId: string;
    rating: number;
    title: string;
    content: string;
  }) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },

  getDestinationReviews: async (destinationId: string) => {
    const response = await api.get(`/reviews/destination/${destinationId}`);
    return response.data;
  },

  getUserReviews: async () => {
    const response = await api.get('/reviews/user');
    return response.data;
  },
};

// User Services
export const userService = {
  updateProfile: async (profileData: {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
  }) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  updateSettings: async (settingsData: {
    notifications?: boolean;
    darkMode?: boolean;
    emailUpdates?: boolean;
  }) => {
    const response = await api.put('/users/settings', settingsData);
    return response.data;
  },

  getFavorites: async () => {
    const response = await api.get('/users/favorites');
    return response.data;
  },

  addToFavorites: async (destinationId: string) => {
    const response = await api.post(`/users/favorites/${destinationId}`);
    return response.data;
  },

  removeFromFavorites: async (destinationId: string) => {
    const response = await api.delete(`/users/favorites/${destinationId}`);
    return response.data;
  },
};

export default api; 