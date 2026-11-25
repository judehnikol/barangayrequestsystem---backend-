
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

  private formatPayment(payment: Payment) {
    const date = new Date(payment.PaymentDate);

    const formattedDate = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    }).format(date).replace(',', '');

    return {
      ...payment,
      PaymentDate: formattedDate,
    };
  }

  async create(data: Partial<Payment>) {
    const payment = this.paymentsRepository.create({
      ...data,
      PaymentDate: data.PaymentDate ?? new Date(),
    });

    const savedPayment = await this.paymentsRepository.save(payment);

    return this.formatPayment(savedPayment);
  }

  async findAll() {
    const payments = await this.paymentsRepository.find({
      relations: {
        DocumentRequest: true,
      },
    });

    return payments.map((payment) => this.formatPayment(payment));
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

    return this.formatPayment(payment);
  }

  async update(id: number, data: Partial<Payment>) {
    const payment = await this.paymentsRepository.findOne({
      where: { PaymentID: id },
      relations: {
        DocumentRequest: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    Object.assign(payment, data);

    const savedPayment = await this.paymentsRepository.save(payment);

    return this.formatPayment(savedPayment);
  }

  async remove(id: number) {
    const payment = await this.paymentsRepository.findOne({
      where: { PaymentID: id },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    await this.paymentsRepository.remove(payment);

    return { message: 'Payment deleted successfully' };
  }
}
