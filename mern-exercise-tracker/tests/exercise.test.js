const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../backend/server");

beforeEach(async()=>{
    await mongoose.connect("mongodb+srv://eman:12345@cluster0.m3rmoqm.mongodb.net/");
},10000)
afterEach(async () => {
    await mongoose.connection.close();
},10000);

describe("POST /exercises/create", ()=>{
    it("should create exercise with given correct parameters", async()=>{
        const response = await request(app).post("/exercises/create").send({
            username: "eman7",
            description: "jogging",
            duration: 1,
            date: "2023-10-12T17:15:12.000+00:00"
        })
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Exercise created successfully!"});
    })
    it("shouldnt create exercise without username given", async()=>{
        const response = await request(app).post("/exercises/create").send({
            description: "jogging",
            duration: 1,
            date: "2023-10-12T17:15:12.000+00:00"
        })
        expect(response.statusCode).toBe(400);
    })
    it("shouldnt create exercise without description given", async()=>{
        const response = await request(app).post("/exercises/create").send({
            username: "eman7",
            duration: 1,
            date: "2023-10-12T17:15:12.000+00:00"
        })
        expect(response.statusCode).toBe(400);
    })
    it("shouldnt create exercise without duration given", async()=>{
        const response = await request(app).post("/exercises/create").send({
            username: "eman7",
            description: "jogging",
            date: "2023-10-12T17:15:12.000+00:00"
        })
        expect(response.statusCode).toBe(400);
    })
    it("shouldnt create exercise without date given", async()=>{
        const response = await request(app).post("/exercises/create").send({
            username: "eman7",
            description: "jogging",
            duration: 1,
        })
        expect(response.statusCode).toBe(400);
    })
    it("shouldnt create exercise with invalid duration given", async()=>{
        const response = await request(app).post("/exercises/create").send({
            username: "eman7",
            description: "jogging",
            duration: "abccc",
            date: "2023-10-12T17:15:12.000+00:00"
        })
        expect(response.statusCode).toBe(400);
    })
    it("shouldnt create exercise with invalid date given", async()=>{
        const response = await request(app).post("/exercises/create").send({
            username: "eman7",
            description: "jogging",
            duration: 1,
            date: "abccccc"
        })
        expect(response.statusCode).toBe(400);
    })
})

describe("GET /exercises/user/:username", ()=>{
    it("should return no exercise found for given username", async()=>{
        const response = await request(app).get("/exercises/user/eman6")
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({message: "No exercises found for the specified username"});
    })
    it("should return all exercises found for given username", async()=>{
        const response = await request(app).get("/exercises/user/eman8")
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            [
                {
                    "_id": "6536957647008bd5ebf4762e",
                    "username": "eman8",
                    "description": "sim8",
                    "duration": 1,
                    "date": "2023-10-04T00:00:00.000Z",
                    "createdAt": "2023-10-23T15:47:02.078Z",
                    "updatedAt": "2023-10-23T15:47:02.078Z",
                    "__v": 0
                },
                {
                    "_id": "65369b9847008bd5ebf47643",
                    "username": "eman8",
                    "description": "jogging updated",
                    "duration": 2,
                    "date": "2023-10-12T17:15:12.000Z",
                    "createdAt": "2023-10-23T16:13:12.431Z",
                    "updatedAt": "2023-10-25T14:59:01.732Z",
                    "__v": 0
                }
            ]
        );
    })
})

describe("GET /:id", ()=>{
    it("should delete exercise of given id", async()=>{
        const response = await request(app).delete("/exercises/65315fd0cce675f0a2c8fd9a")
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Exercise deleted successfully!"});
    })
    it("shouldnt delete exercise given incorrect id", async()=>{
        const response = await request(app).delete("/exercises/6537daa6cb06c000000000")
        expect(response.statusCode).toBe(400);
    })
    
})

describe("GET /update/:id", ()=>{
    
    it("it should update exercise given correct id", async()=>{
        const response = await request(app).post("/exercises/update/65316123a514a4c9751d0701").send({
            username: "eman1",
            description: "lifting updated",
            duration: 2,
            date: "2023-10-12T17:15:12.000+00:00"
        })
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Exercise updated successfully!"});

    })
    it("it shouldnt update exercise given incorrect id", async()=>{
        const response = await request(app).post("/exercises/update/6537daa6cb06c2d6608f000").send({
            username: "eman1",
            description: "push ups updated",
            duration: 2,
            date: "2023-10-12T17:15:12.000+00:00"
        })
        expect(response.statusCode).toBe(400);

    })
    it("it shouldnt update exercise when username is not given", async()=>{
        const response = await request(app).post("/exercises/update/65316123a514a4c9751d0701").send({
            description: "lifting updated",
            duration: 2,
            date: "2023-10-12T17:15:12.000+00:00"
        })
        expect(response.statusCode).toBe(400);
    })
    it("it shouldnt update exercise when description is not given", async()=>{
        const response = await request(app).post("/exercises/update/65316123a514a4c9751d0701").send({
            username: "eman1",
            duration: 2,
            date: "2023-10-12T17:15:12.000+00:00"
        })
        expect(response.statusCode).toBe(400);
    })
    
    it("it shouldnt update exercise when duration is not given", async()=>{
        const response = await request(app).post("/exercises/update/65316123a514a4c9751d0701").send({
            username: "eman1",
            description: "lifting updated",
            date: "2023-10-12T17:15:12.000+00:00"
        })
        expect(response.statusCode).toBe(400);
    })
    it("it shouldnt update exercise when date is not given", async()=>{
        const response = await request(app).post("/exercises/update/65316123a514a4c9751d0701").send({
            username: "eman1",
            description: "lifting updated",
            duration: 2,
        })
        expect(response.statusCode).toBe(400);
    })
})