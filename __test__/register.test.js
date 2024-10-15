/*
const register = require("../controller/UserController").register;
const login = require("../controller/UserController").login;

jest.mock("../models/UserSchema");

const request = {
    body: {
        name: "Mahesh",
        password: "ansl;llp'alwk1289sd",
        email: "mahesh@gmail.com",
        age: 24,
        gender: "Male",
        subscriptionType: "Paid",
        paymentInfo: {
            cardNumber: 3116120912342132,
            expiryDate: "09/24",
            cvv: 785
        }
    },
};

const response = {
    status: jest.fn((x) =>x),
    //json: jest.fn(),
    send: jest.fn((x)=>x)
};




it("should return 400 status code", async () => {
    UserSchema.findOne.mockImplementationOnce(() =>({
        id:1,
        name: "Mahesh",
        password: "ansl;llp'alwk1289sd",
        email: "mahesh@gmail.com",
        age: 24,
        gender: "Male",
        subscriptionType: "Paid",
        paymentInfo: {
            cardNumber: 3116120912342132,
            expiryDate: "09/24",
            cvv: 785
        }
    }));
    await register(request, response);
    expect(response.status).toHaveBeenCalledWith(400);
    //expect(response.send).toHaveBeenCalledTimes(1);
});*/


// Import the UserSchema model
const UserSchema = require("../models/UserSchema");

const register = require("../controller/UserController").register;
const login = require("../controller/UserController").login;
//const hash = require('bcrypt');
const bcrypt = require("bcrypt");

// Mock the UserSchema
jest.mock("../models/UserSchema");
jest.mock('bcrypt', () => ({
    hash: jest.fn((input, saltRounds) => Promise.resolve(input)) // The input is returned as the "hash"
}));

const request = {
    body: {
        name: "Mahesh",
        password: "ansl;llp'alwk1289sd",
        email: "mahesh@gmail.com",
        age: 24,
        gender: "Male",
        subscriptionType: "Paid",
        paymentInfo: {
            cardNumber: 3116120912342132,
            expiryDate: "09/24",
            cvv: 785
        }
    },
};

const response = {
    status: jest.fn(() => response),  // Chain the status and send methods
    send: jest.fn((x) => x),
    json: jest.fn((x)=>x)
};

it("should return 400 status code", async () => {
    // Mock the findOne method of UserSchema to return a resolved Promise
    UserSchema.findOne.mockResolvedValueOnce({
        id: 1,
        name: "Mahesh",
        password: "ansl;llp'alwk1289sd",
        email: "mahesh@gmail.com",
        age: 24,
        gender: "Male",
        subscriptionType: "Paid",
        paymentInfo: {
            cardNumber: 3116120912342132,
            expiryDate: "09/24",
            cvv: 785
        }
    });

    await register(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
});

it("should send a status code of 200 when new user is created", async () => {
    // Mock the findOne method of UserSchema to return a resolved Promise
    UserSchema.findOne.mockResolvedValueOnce(()=>undefined);

    // Mock the bcrypt.hash method to return a resolved Promise
    bcrypt.hash.mockReturnValueOnce("hashed_password");

    await register(request, response);
});








