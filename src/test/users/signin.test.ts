import { signInBodyValidation } from '../../users/infrastructure/utils/validationSchema';

describe('signInBodyValidation', () => {

  it('should pass validation with valid email and password', () => {
    const validInput = {
      email: 'test@example.com',
      password: 'ValidP@ssword123'
    };

    const { error } = signInBodyValidation(validInput);

    // Verificamos que no haya errores
    expect(error).toBeUndefined();
  });

  it('should fail validation if email is missing', () => {
    const invalidInput = {
      password: 'ValidP@ssword123'
    };

    const { error } = signInBodyValidation(invalidInput);

    // Verificamos que exista un error de validación
    expect(error).toBeDefined();
  });

  it('should fail validation if password is missing', () => {
    const invalidInput = {
      email: 'test@example.com'
    };

    const { error } = signInBodyValidation(invalidInput);

    // Verificamos que exista un error de validación
    expect(error).toBeDefined();

  });

  it('should fail validation if email format is invalid', () => {
    const invalidInput = {
      email: 'invalid-email',
      password: 'ValidP@ssword123'
    };

    const { error } = signInBodyValidation(invalidInput);

    // Verificamos que el error de validación es el correcto
    expect(error).toBeDefined();

  });

});
