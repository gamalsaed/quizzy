"use server";

import bcrypt from "bcryptjs";
import { prisma } from "../prisma_client";
import { signUpType, signUpSchema } from "../schema/signup.schema";
import { Prisma } from "@/generated/prisma/client";

export async function signUpAction(data: signUpType) {
  // Validation
  const parsed = signUpSchema.safeParse(data);

  if (!parsed.success) throw new Error("بيانات غير صالحة");

  // Hashing
  const passwordHash = await bcrypt.hash(data.password, 12);

  try {
    // Creating a user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.trim().toLowerCase(),
        password: passwordHash,
      },
      select: {
        name: true,
        email: true,
      },
    });
    return user;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new Error("البريد الالكتروني مستخدم من قبل");
      }
    }
  }
}
