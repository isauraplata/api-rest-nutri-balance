import { User } from '../domain/userModel';
import { UserRepository } from '../domain/userRepository';

export class UpdateSubscription {
  constructor(private userRepository: UserRepository) {}

  async updateUserSubscription(uuid: string, newType: 'free' | 'premium', paymentMethod?: 'paypal'): Promise<User | null> {
    try {
      const user = await this.userRepository.findUserByUUID(uuid);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (newType === 'premium' && !paymentMethod) {
        throw new Error('El plan premium requiere un método de pago');
      }

      user.subscriptionType = newType;
      user.paymentMethod = paymentMethod || null; // Si es plan free, no es necesario el método de pago

      const updatedUser = await this.userRepository.updateUser(user);
      
      return updatedUser;
    } catch (error) {
      console.log("Error actualizando la suscripción:", error);
      return null;
    }
  }
}
