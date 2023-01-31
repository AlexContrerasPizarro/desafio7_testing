const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("Obteniendo cafes, code 200", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
        const body = response.body;
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeGreaterThan(0);
    });

    it("Eliminar cafe con id erroneo, code 404", async () => {
        const jwt = "token";
        const idCafeEliminar = "5";
        const response = await request(server)
            .delete(`/cafes/${idCafeEliminar}`)
            .set("Authorization", jwt)
            .send(idCafeEliminar);
        const status = response.statusCode;
        expect(status).toBe(404);
    });

    it("Agregar nuevo cafe, code 201", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: "Cafe con Leche" };
        const response = await request(server)
          .post("/cafes")
          .send(cafe);
        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(cafe);
      });

      it("Actualizar cafe con id erroneo, code 400", async () => {
        const id = "6";
        const cafe= { id };
        const response = await request(server).put("/cafes/1").send(cafe);
        const status = response.statusCode;
        expect(status).toBe(400);
      });

});
