import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InitService {
  constructor(private readonly prismaService: PrismaService) {}

  async initDatabase() {
    const roles = await this.createRoles();
    const userStatus = await this.createUserStatus();
    const status = await this.createStatus();
    return {
      data: {
        roles,
        userStatus,
        status,
      },
    };
  }

  private async createRoles() {
    const roles = ['admin', 'manager', 'editor', 'author', 'subscriber'];
    const existingRoles = await this.prismaService.role.findMany();

    if (existingRoles.length === 0) {
      const insert = await this.prismaService.role.createMany({
        data: roles.map((name) => ({ name })),
      });
      return {
        inserted: insert.count,
        data: roles,
      };
    } else {
      return {
        inserted: 0,
        data: existingRoles,
      };
    }
  }

  private async createUserStatus() {
    const userStatus = ['active', 'inactive', 'blocked', 'deleted'];
    const existingUserStatus = await this.prismaService.userStatus.findMany();

    if (existingUserStatus.length === 0) {
      const insert = await this.prismaService.userStatus.createMany({
        data: userStatus.map((name) => ({ name })),
      });
      return {
        inserted: insert.count,
        data: userStatus,
      };
    } else {
      return {
        inserted: 0,
        data: existingUserStatus,
      };
    }
  }

  private async createStatus() {
    const postStatus = ['draft', 'publish', 'private'];
    const existingStatus = await this.prismaService.status.findMany();

    if (existingStatus.length === 0) {
      const insert = await this.prismaService.status.createMany({
        data: postStatus.map((name) => ({ name })),
      });
      return {
        inserted: insert.count,
        data: postStatus,
      };
    } else {
      return {
        inserted: 0,
        data: existingStatus,
      };
    }
  }
}
