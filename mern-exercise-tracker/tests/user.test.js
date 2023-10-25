const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../backend/server");

beforeEach(async()=>{
    await mongoose.connect("mongodb+srv://eman:12345@cluster0.m3rmoqm.mongodb.net/");
},10000)
afterEach(async () => {
    await mongoose.connection.close();
},10000);

describe("POST /users/login", ()=>{
    it("should login the user with given correct username and password", async()=>{
        const response = await request(app).post("/users/login").send({
            username: "eman8",
            password: "123456"
        })
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Login Successful"});
    })
    it("shouldnt login the user with given incorrect username", async()=>{
        const response = await request(app).post("/users/login").send({
            username: "alphaaa",
            password: "123456"
        })
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({message: "User not found."});
    })
    it("shouldnt login the user with given correct username and incorrect password", async()=>{
        const response = await request(app).post("/users/login").send({
            username: "eman1",
            password: "123456789"
        })
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({message: "Incorrect Password"});
    })
})

describe("POST /users/create", ()=>{
    it("should create the user with given correct username and password", async()=>{
        const response = await request(app).post("/users/create").send({
            username: "alpha1",
            password: "123456"
        })
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "User created successfully!"});
    })
    it("shouldnt create the user with given existing username", async()=>{
        const response = await request(app).post("/users/create").send({
            username: "eman1",
            password: "123456"
        })
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({message: "Username already exist"});
    })
})