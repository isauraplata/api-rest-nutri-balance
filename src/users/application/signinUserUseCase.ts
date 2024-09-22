import { UserRepository } from '../domain/userRepository';
import { User } from '../domain/userModel';

export class SignIn {
  constructor(private readonly userRepository: UserRepository) {}

  async run(email: string, password: string): Promise<User | null> {
    try {
      // Buscar al usuario por correo electrónico
      const user = await this.userRepository.findUserByEmail(email);
      
      // Si no existe el usuario, retornar null
      if (!user) {
        console.log('User not found');
        return null;
      }

      // Retornar el usuario si existe
      return user;
    } catch (error) {
      console.error('SignIn error:', error);
      return null;
    }
  }
}
