import 'babel-polyfill'
import * as supertest from 'supertest'

const request = supertest('http://localhost:3000')

test("if jest is working", () => {
    expect(true).toBe(true);
  });

describe('GET /lojas',() =>{
    it('deve retornar um array de objetos', () => {
        jest.setTimeout(5000)
        return request.get('/lojas')
                .set('Accept', 'application/json')
                .expect(200)
        })

    it('deve retornar um GET com dados de loja', () => {
        jest.setTimeout(5000)
        return request.get('/lojas/1')
                .set('Accept', 'application/json')
                .expect(200)
        })
})


describe('POST /lojas/',() =>{
    let loja = {
        name: "Loja A",
        address: "Rua Abc, 000",
        phone: "(00) 0000-0000",
        cnpj: "00.000.000/0000-00",
        workingHour: "Diariamente das 11hs às 23hs",
        city: "Cidade ABC",
        state: "A"
    }

    it('inserindo uma loja no banco...', () => {
        jest.setTimeout(5000)
        return request.post('/lojas')
                .set('Accept', 'application/json')
                .send(loja)
                .expect(201)
        })
})