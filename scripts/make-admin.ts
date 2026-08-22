import "dotenv/config";

import { prisma } from "../lib/prisma";

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();

  if (!email) {
    throw new Error(
      "Please provide an email address.\n\nExample:\nnpx tsx scripts/make-admin.ts you@example.com"
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error(`No user found with email: ${email}`);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      role: "ADMIN",
    },
  });

  console.log(
    `Admin role granted to ${updatedUser.email}`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });