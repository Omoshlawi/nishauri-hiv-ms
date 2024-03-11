import { ARTGroup, ARTGroupUserEnrollment, Prisma } from "@prisma/client";
import { Repository } from "../../../shared/types";
import { ARTGroupEnrollmentModel, ARTGroupModel } from "../models";

export class ARTGroupRepository implements Repository<ARTGroup> {
  selectFields: Prisma.ARTGroupSelect = {
    id: true,
    title: true,
    description: true,
    extraSubscribers: true,
    enrollments: {
      select: {
        id: true,
        isAdmin: true,
        isCurrent: true,
        publicName: true,
        user: true,
        createdAt: true,
        updatedAt: true,
      },
    },
    events: {
      select: {
        id: true,
        title: true,
        distributionTime: true,
        createdAt: true,
        updatedAt: true,
      },
    },
    createdAt: true,
    updatedAt: true,
  };
  enrollmentsSelectFields: Prisma.ARTGroupUserEnrollmentSelect = {
    id: true,
    groupId: true,
    group: {
      select: {
        id: true,
        title: true,
        description: true,
        extraSubscribers: true,
        createdAt: true,
        updatedAt: true,
      },
    },
    isAdmin: true,
    isCurrent: true,
    publicName: true,
    user: true,
    createdAt: true,
    updatedAt: true,
  };
  create(
    entity: Partial<ARTGroup> & { enrollments?: { user: { id: string } } } & {
      extraSubscribers?: {
        name: string;
        cccNumber: string;
        phoneNumber: string;
      }[];
    }
  ): Promise<ARTGroup> {
    return ARTGroupModel.create({
      data: {
        ...entity,
        title: entity.title!,
        extraSubscribers: {
          createMany: {
            data: entity?.extraSubscribers ?? [],
            skipDuplicates: true,
          },
        },
        enrollments: {
          create: {
            ...entity.enrollments!,
            isAdmin: true,
            isCurrent: true,
          },
        },
      },
      select: this.selectFields,
    });
  }
  async findOneById(id: string): Promise<ARTGroup | undefined> {
    const group = await ARTGroupModel.findUnique({
      where: { id },
      select: this.selectFields,
    });
    return group ?? undefined;
  }
  findAll(): Promise<ARTGroup[]> {
    return ARTGroupModel.findMany({ select: this.selectFields });
  }

  findUseGroupEnrollments(userId: string): Promise<ARTGroupUserEnrollment[]> {
    return ARTGroupEnrollmentModel.findMany({
      where: {
        user: {
          path: "$.id",
          equals: userId,
        },
      },
      select: this.enrollmentsSelectFields,
    });
  }

  async findUseGroupEnrollmentById(
    userId: string,
    enrollmentId: string
  ): Promise<ARTGroupUserEnrollment | undefined> {
    const enrollment = await ARTGroupEnrollmentModel.findUnique({
      where: {
        user: {
          path: "$.id",
          equals: userId,
        },
        id: enrollmentId,
      },
      select: this.enrollmentsSelectFields,
    });
    return enrollment ?? undefined;
  }

  createUserGroupEnrollments(
    entity: Partial<ARTGroupUserEnrollment>
  ): Promise<ARTGroupUserEnrollment> {
    return ARTGroupEnrollmentModel.create({
      data: {
        ...entity,
        groupId: entity.groupId!,
        user: entity.user!,
      },
    });
  }
  findByCriteria(criteria: Prisma.ARTGroupWhereInput): Promise<ARTGroup[]> {
    return ARTGroupModel.findMany({
      where: criteria,
      select: this.selectFields,
    });
  }
  async updateById(
    id: string,
    updates: Partial<ARTGroup> & {
      extraSubscribers?: {
        name: string;
        cccNumber: string;
        phoneNumber: string;
      }[];
    }
  ): Promise<ARTGroup | undefined> {
    const res = await ARTGroupModel.update({
      select: this.selectFields,
      where: { id },
      data: {
        ...updates,
        extraSubscribers: {
          deleteMany: {
            cccNumber: {
              notIn: updates.extraSubscribers?.map((e) => e.cccNumber) ?? [],
            },
          },
          createMany: {
            data: updates?.extraSubscribers ?? [],
            skipDuplicates: true,
          },
        },
      },
    });
    return res ?? undefined;
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async exists(criteria: Prisma.ARTGroupWhereInput): Promise<boolean> {
    const group = await ARTGroupModel.findFirst({ where: criteria });
    return group !== null;
  }
}
