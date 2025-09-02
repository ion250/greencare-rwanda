// Debug function to check authentication state
export const debugAuth = () => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  
  console.log('Authentication Debug:');
  console.log('Token exists:', !!token);
  console.log('User exists:', !!user);
  console.log('Token value:', token);
  console.log('User value:', user);
  
  if (token) {
    try {
      const tokenString = token.replace('Bearer ', '');
      const payload = tokenString.split('.')[1];
      if (payload) {
        const decoded = JSON.parse(atob(payload));
        console.log('Decoded token:', decoded);
      }
    } catch (error) {
      console.error('Token decoding error:', error);
    }
  }
};