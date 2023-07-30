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
      return await this.prismaService.$transaction(
        roles.map((name) =>
          this.prismaService.role.create({
            data: { name: name },
          }),
        ),
      );
    } else {
      return {
        existingRoles,
      };
    }
  }

  private async createUserStatus() {
    const userStatus = ['active', 'inactive', 'blocked', 'deleted'];
    const existingUserStatus = await this.prismaService.userStatus.findMany();

    if (existingUserStatus.length === 0) {
      return await this.prismaService.$transaction(
        userStatus.map((name) =>
          this.prismaService.userStatus.create({
            data: { name: name },
          }),
        ),
      );
    } else {
      return {
        existingUserStatus,
      };
    }
  }

  private async createStatus() {
    const postStatus = ['draft', 'publish', 'private'];
    const existingStatus = await this.prismaService.status.findMany();

    if (existingStatus.length === 0) {
      return await this.prismaService.$transaction(
        postStatus.map((name) =>
          this.prismaService.status.create({
            data: { name: name },
          }),
        ),
      );
    } else {
      return {
        existingStatus,
      };
    }
  }
}
