const bcrypt = require('bcrypt');
const UserSchema = require('../models/UserSchema');
const { login } = require('../controller/UserController');

// Mock UserSchema and bcrypt
jest.mock('../models/UserSchema');
jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

const request = {
    body: {
        email: 'mahesh@gmail.com',
        password: 'ansl;llp\'alwk1289sd',
    },
};

const response = {
    status: jest.fn(() => response),
    json: jest.fn(() => response),
    setHeader: jest.fn(),  // Ensure setHeader is properly mocked
};

beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
});

describe('Login Feature', () => {

    beforeAll(() => {
        // Ensure SECRET_KEY is defined
        process.env.SECRET_KEY = 'your_secret_key_for_testing';
    });

    it('should login successfully with valid credentials', async () => {
        // Mock the user find and bcrypt compare functions
        UserSchema.findOne.mockResolvedValueOnce({
            id: 1,
            email: 'mahesh@gmail.com',
            password: 'hashed_password',
            subscriptionType: 'premium'
        });

        bcrypt.compare.mockImplementation((password, hash, callback) => callback(null, true)); // Simulate password match

        await login(request, response);

        // Expectations
        expect(UserSchema.findOne).toHaveBeenCalledWith({ email: 'mahesh@gmail.com' });
        expect(bcrypt.compare).toHaveBeenCalledWith('ansl;llp\'alwk1289sd', 'hashed_password', expect.any(Function));
        expect(response.setHeader).toHaveBeenCalledWith('Authorization', expect.stringContaining('Bearer '));
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Login successful' }));
    });

    it('should return 403 if password is incorrect', async () => {
        // Mock user lookup
        UserSchema.findOne.mockResolvedValueOnce({
            id: 1,
            email: 'mahesh@gmail.com',
            password: 'hashed_password',
        });

        bcrypt.compare.mockImplementation((password, hash, callback) => callback(null, false));  // Simulate password mismatch

        await login(request, response);

        // Expectations
        expect(response.status).toHaveBeenCalledWith(403); // Match your controller's response
        expect(response.json).toHaveBeenCalledWith({ message: 'Incorrect password' });
    });

    it('should return 404 if user is not found', async () => {
        // Mock user not found
        UserSchema.findOne.mockResolvedValueOnce(null);

        await login(request, response);

        // Expectations
        expect(UserSchema.findOne).toHaveBeenCalledWith({ email: 'mahesh@gmail.com' });
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    /*it('should return 500 if there is a server error', async () => {
        // Mock an error during user lookup
        UserSchema.findOne.mockRejectedValueOnce(new Error('Database error').status(500)); // Simulate a DB error

        await login(request, response);  // Call the login function

        // Expectations
        expect(response.status).toHaveBeenCalledWith(500); // Expect the 500 status code
/!*        expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
            error: 'Error finding user',
            details: expect.any(Error)  // Ensuring the error is returned correctly
        }));*!/
    });
*/

    /*it('should return 500 if there is a server error', async () => {
        // Mock the user lookup to simulate a server error
        UserSchema.findOne.mockImplementationOnce(() => Promise.reject(new Error('Database error'))); // Simulate error

        await login(request, response);  // Call the login function
        console.log(response.status(500));

        // Expectations
        expect(response.status).toHaveBeenCalledWith(500); // Ensure status 500 is called
        expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
            error: 'Error finding user',
            details: expect.any(Error)  // Ensure error object is included in response
        }));
    });*/


});

