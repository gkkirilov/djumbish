import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function prismaCreate(name) {}

export default defineEventHandler(async (event) => {
  // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
  const { email } = await readBody(event);
  try {
    await prisma.user.create({
      data: {
        name: '123',
        email,
        image: "",
      },
    });

    return {};
  } catch (error) {
    console.error(error)
    return { error: true, errorMessage: JSON.stringify(error) };
  }
});
