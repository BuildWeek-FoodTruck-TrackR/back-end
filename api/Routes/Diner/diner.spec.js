
const supertest = require("supertest");
const server = require("../../server");
const db = require("../../../database/dbConfig");

afterEach(async () => {
  await db("diners").truncate();
});

// Diner Register

describe("diner register", () => {
  it("POST /auth/diner/register", async () => {
    const data = { username: "jesusE_test", password: "password" };
    supertest(server)
      .post("/auth/diner/register")
      .send(data)
      .then((res) => expect(res.statusCode).toBe(201))
      .catch((err) => console.log(err));
  });
});


// Diner Log in
describe("diner register then login", () => {
    it("POST /auth/diner/login", async () => {
      const data = { username: "jesusE_test", password: "password" };

          supertest(server)
            .post("/auth/diner/register")
            .send(data)
            .then(async (res) => {
              
              await expect(res.statusCode).toBe(201);
            })
            .catch((err) => console.log(err));

    });
});


