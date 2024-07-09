import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.createMany({
    data: [
      {
        id: 1,
        email: "vinay@prisma.io",
        name: "prakhar",
        mobile: "7509919996",
      },
      {
        id: 2,
        email: "prakhar@prisma.io",
        name: "vinay",
        mobile: "8269660225",
      },
    ],
  });
}

main()
  .then(async () => {
    console.log("Database seeded successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
