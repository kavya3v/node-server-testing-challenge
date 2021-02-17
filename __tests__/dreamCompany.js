const supertest=require('supertest');
const server=require('../api/server');
const db=require('../api/dbConfig');

afterAll(async ()=>{
    //close db connection after all tests
    await db.destroy()
})

beforeEach(async ()=>{
   await db.seed.run()
})
 
describe("integration test for dreamsRouter /dreams",()=>{
    test("GET /dreams",async ()=>{
        const res= await supertest(server).get('/dreams');
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(3);
        expect(res.body[0].dreams_name).toBe("NeuraLink")
      })
      test("DELETE /dreams",async ()=>{
        const deleteId=2
        const res= await supertest(server).delete(`/dreams/${deleteId}`);
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        console.log(res.body)
        expect(res.body.message).toBe("delete successful");
      })
      //delete with invalid id
      test("DELETE /dreams",async ()=>{
        const deleteId=5
        const res= await supertest(server).delete(`/dreams/${deleteId}`);
        expect(res.statusCode).toBe(400)
        console.log('res.body in delete',res.body)
        expect(res.type).toBe("application/json")
        expect(res.body).toBe("Invalid dreams ID");
      })
      //create new dream
      test("Post /dreams",async ()=>{
        const newDream={dreams_name:"Instagram",domain_id:2}
        const res= await supertest(server).post('/dreams').send(newDream);
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.dreams_name).toBe("Instagram");
      })
      //test for missing property
      test("Post /dreams",async ()=>{
        const newDream={domain_id:2}
        const res= await supertest(server).post('/dreams').send(newDream);
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
      })
      //test Update dreams
      test("Put /dreams",async ()=>{
        const id=1
        const newDream={dreams_name:"TESLA",domain_id:2}
    const res= await supertest(server).put(`/dreams/${id}`).send(newDream);
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.dreams_name).toBe("TESLA")
      })
       //test Update dreams with invalid id
       test("Put /dreams",async ()=>{
        const id=15
        const newDream={dreams_name:"TESLA",domain_id:2}
    const res= await supertest(server).put(`/dreams/${id}`).send(newDream);
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        // expect(res.body).toBe("Invalid dreams ID")
      })
}) 
