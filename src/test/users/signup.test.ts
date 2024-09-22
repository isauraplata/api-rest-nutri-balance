import request from 'supertest';
import app from "../../index";  

describe('POST /signup', () => {

  it('should register a new user successfully with all fields', async () => {
    const response = await request(app)
      .post('/api/v1/users/signup')  
      .send({
        name: 'alexandra alvarez',
        email: 'alexa.alvarez@example.com',
        password: 'StrongP@ssw0rd',
        dateOfBirth: '1990-05-15',
        height: 180,
        weight: 75,
        medicalConditions: ['Diabetes', 'Hypertension'],
        allergies: ['Peanuts', 'Dust'],
        preferredFood: ['Salad', 'Grilled Chicken', 'Pasta'],
        subscriptionType: 'premium'
      });

    expect(response.status).toBe(201);  // Verifica que el estado sea 201 (Created)
    expect(response.body).toHaveProperty('status', 'success');  // Verifica que el status sea 'success'
    expect(response.body.data).toHaveProperty('name', 'alexandra alvarez');  // Verifica que los datos del usuario sean correctos
    expect(response.body.data).toHaveProperty('email', 'alexa.alvarez@example.com');
  });

});
