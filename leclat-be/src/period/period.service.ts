import { Injectable } from '@nestjs/common';

import { PeriodDto } from 'src/dto/period.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PeriodService {
  constructor(private prisma: PrismaService) {}

  async getPeriods() {
    const periods = await this.prisma.period.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });

    return {
      message: 'success',
      data: periods,
    };
  }

  async addPeriod(dto: PeriodDto) {
    try {
      const period = await this.prisma.period.create({
        data: {
          ...dto,
        },
      });

      return {
        message: 'Period Created',
        data: period,
      };
    } catch (error) {
      throw error;
    }
  }

  async editPeriod(periodId: string, dto: PeriodDto) {
    /* Updating the period with the new data. */
    const updatedPeriod = await this.prisma.period.update({
      where: {
        id: periodId,
      },
      data: {
        ...dto,
      },
    });

    return {
      message: 'Period updated successfully',
      data: { ...updatedPeriod },
    };
  }

  async deletePeriod(periodId: string) {
    /* Deleting the period. */
    await this.prisma.period.delete({
      where: {
        id: periodId,
      },
    });

    return {
      message: 'Period deleted successfully',
    };
  }
}
