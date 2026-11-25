
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './payment.entity.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async create(data: Partial<Payment>) {
    const payment = this.paymentsRepository.create({
      ...data,
      PaymentDate: data.PaymentDate ?? new Date(),
    });

    return await this.paymentsRepository.save(payment);
  }

  async findAll() {
    return await this.paymentsRepository.find({
      relations: {
        DocumentRequest: true,
      },
    });
  }

  async findOne(id: number) {
    const payment = await this.paymentsRepository.findOne({
      where: { PaymentID: id },
      relations: {
        DocumentRequest: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async update(id: number, data: Partial<Payment>) {
    const payment = await this.findOne(id);
    Object.assign(payment, data);
    return await this.paymentsRepository.save(payment);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    await this.paymentsRepository.remove(payment);

    return { message: 'Payment deleted successfully' };
  }
}
