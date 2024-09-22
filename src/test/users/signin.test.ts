import request from 'supertest';
import app from "../../index";  

describe('POST /signin', () => {
  
  it('should log in a user successfully with valid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/users/signin')  
      .send({
        email: 'z@example.com',
        password: 'StrongP@ssw0rd'
      });

    expect(response.status).toBe(200);  // Verifica que el estado sea 200 (OK)
    expect(response.body).toHaveProperty('error', false);  // Verifica que error sea false
    expect(response.body).toHaveProperty('message', 'Logged in successfully');  // Verifica el mensaje de éxito
    expect(response.body).toHaveProperty('accessToken');  // Verifica que se devuelva un accessToken

  });

});
