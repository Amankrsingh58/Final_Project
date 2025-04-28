import axios from 'axios';

// Mock Data
const mockProfile = {
  name: 'John Doe',
  bio: 'Experienced Math Tutor',
  experience: 5,
};

const mockEarnings = [
  { month: 'January', amount: 300 },
  { month: 'February', amount: 400 },
  { month: 'March', amount: 500 },
];

const mockReviews = [
  { studentName: 'Alice', feedback: 'Great tutor!' },
  { studentName: 'Bob', feedback: 'Very helpful!' },
];

const mockAvailability = ['Mon 10-12', 'Wed 2-4'];

// Mock Endpoints
axios.get = jest.fn((url) => {
  switch (url) {
    case '/api/tutor/profile':
      return Promise.resolve({ data: mockProfile });
    case '/api/tutor/earnings':
      return Promise.resolve({ data: mockEarnings });
    case '/api/tutor/reviews':
      return Promise.resolve({ data: mockReviews });
    case '/api/tutor/availability':
      return Promise.resolve({ data: mockAvailability });
    default:
      return Promise.reject(new Error('Endpoint not found'));
  }
});

axios.post = jest.fn((url, data) => {
  if (url === '/api/tutor/availability') {
    return Promise.resolve({ data: 'Availability updated' });
  }
  return Promise.reject(new Error('Endpoint not found'));
});
