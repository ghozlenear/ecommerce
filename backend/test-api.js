const axios = require('axios');

const BASE_URL = 'http://localhost:8081/api';

// Test data
const testUser = {
  email: 'test@example.com',
  password: 'password123',
  fullName: 'Test User',
  phoneNumber: '+1234567890'
};

let authToken = '';

// Test functions
async function testHealthCheck() {
  try {
    console.log(' Testing health check...');
    const response = await axios.get('http://localhost:8081/health');
    console.log(' Health check passed:', response.data);
  } catch (error) {
    console.error(' Health check failed:', error.message);
  }
}

async function testSignup() {
  try {
    console.log('\n Testing user signup...');
    const response = await axios.post(`${BASE_URL}/auth/signup`, testUser);
    console.log('Signup successful:', response.data.message);
    authToken = response.data.token;
    console.log(' Token received:', authToken.substring(0, 20) + '...');
  } catch (error) {
    console.error(' Signup failed:', error.response?.data?.message || error.message);
  }
}

async function testLogin() {
  try {
    console.log('\n Testing user login...');
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log(' Login successful:', response.data.message);
    authToken = response.data.token;
    console.log(' Token received:', authToken.substring(0, 20) + '...');
  } catch (error) {
    console.error(' Login failed:', error.response?.data?.message || error.message);
  }
}

async function testGetProfile() {
  if (!authToken) {
    console.log('\n  Skipping profile test - no auth token');
    return;
  }

  try {
    console.log('\n Testing get profile...');
    const response = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(' Get profile successful:', response.data.user.fullName);
  } catch (error) {
    console.error(' Get profile failed:', error.response?.data?.message || error.message);
  }
}

async function testUpdateProfile() {
  if (!authToken) {
    console.log('\n  Skipping profile update test - no auth token');
    return;
  }

  try {
    console.log('\n Testing profile update...');
    const response = await axios.put(`${BASE_URL}/auth/profile`, {
      fullName: 'Updated Test User',
      phoneNumber: '+0987654321'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(' Profile update successful:', response.data.message);
  } catch (error) {
    console.error('Profile update failed:', error.response?.data?.message || error.message);
  }
}

// Run all tests
async function runTests() {
  console.log(' Starting API tests...\n');
  
  await testHealthCheck();
  await testSignup();
  await testLogin();
  await testGetProfile();
  await testUpdateProfile();
  
  console.log('\n All tests completed!');
}

// Check if server is running before testing
async function checkServer() {
  try {
    await axios.get('http://localhost:5000/health');
    console.log(' Server is running, starting tests...\n');
    await runTests();
  } catch (error) {
    console.error(' Server is not running. Please start the backend server first:');
    console.error('   cd backend && npm run dev');
  }
}

checkServer();
