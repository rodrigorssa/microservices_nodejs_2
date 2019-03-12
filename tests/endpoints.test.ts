import app from '../config/custom-express'
const request = require('supertest')(app);


test("if jest is working", () => {
    expect(true).toBe(true);
  });

describe('GET /lojas',() =>{
  
    it('deve retornar um array de objetos', () => {
        return request('/lojas')
                .expect(200)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }else{
                        console.log(res.body);
                    }          
                })
    })
})