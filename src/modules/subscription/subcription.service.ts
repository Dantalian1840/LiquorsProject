import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/User.entity';
import { Subscription } from 'src/entities/Subscription.entity';
import { SubscriptionDto } from 'src/dtos/subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subcriptionRepository: Repository<Subscription>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async getSubcription() {
    return await this.subcriptionRepository.find();
  }

  async deleteSubcription(userId: string) {
    const user: Users = await this.userRepository.findOne({
      where: { id: userId },
      relations: { subscriptionId: true },
    });
    const { id } = user.subscriptionId;
    user.subscriptionId = null;
    await this.userRepository.update(user.id, user);
    await this.subcriptionRepository.delete(id);
  }

  async createSubcription(id: string, subscription: SubscriptionDto) {
    const dateInit = new Date();
    const dateFin = new Date(dateInit.getTime());
    dateFin.setDate(dateFin.getDate() + 30);

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
        throw new NotFoundException('User not found');
    }

    const NewSubcription = new Subscription();
    NewSubcription.userId = user;
    NewSubcription.type = subscription.type;
    NewSubcription.status = 'active';
    NewSubcription.dateInit = dateInit;
    NewSubcription.dateFin = dateFin;
    NewSubcription.price = subscription.price;

    return await this.subcriptionRepository.save(NewSubcription);
}


  // async updateSubcriptionType(id: string, type: string, status: string) {
  //   if (status === 'active') {
  //     const subcription = await this.subcriptionRepository.findOne({
  //       where: { id },
  //     });
  //     const dateInit = new Date();
  //     const dateFin = new Date(dateInit.getTime());
  //     dateFin.setDate(dateFin.getDate() + 30);

  //     (subcription.type = type),
  //       (subcription.status = 'active'),
  //       (subcription.dateInit = dateInit),
  //       (subcription.dateFin = dateFin);

  //     return await this.subcriptionRepository.save(subcription);
  //   } else if (status === 'inactive') {
  //     const subcription = await this.subcriptionRepository.findOne({
  //       where: { id },
  //     });
  //     const dateInit = new Date();
  //     const dateFin = new Date(dateInit.getTime());
  //     dateFin.setDate(dateFin.getDate() + 30);

  //     (subcription.type = type),
  //       (subcription.status = 'inactive'),
  //       (subcription.dateInit = dateInit),
  //       (subcription.dateFin = dateFin);

  //     return await this.subcriptionRepository.save(subcription);
  //   } else {
  //     throw new BadRequestException('El status es Incorrecto');
  //   }
  // }
  async updateSubcriptionType(id: string, type: string, status: string) {
    // Convertir el status a minúsculas para comparación
    status = status.toLowerCase();
  
    if (status === 'active' || status === 'inactive') {
      const subcription = await this.subcriptionRepository.findOne({
        where: { id },
      });
  
      if (!subcription) {
        throw new NotFoundException('Subcription not found');
      }
  
      const dateInit = new Date();
      const dateFin = new Date(dateInit.getTime());
      dateFin.setDate(dateFin.getDate() + 30);
  
      subcription.type = type;
      subcription.status = status;
      subcription.dateInit = dateInit;
      subcription.dateFin = dateFin;
  
      return await this.subcriptionRepository.save(subcription);
    } else {
      throw new BadRequestException('El status es Incorrecto');
    }
  }
  
}