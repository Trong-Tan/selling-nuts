import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const subcategory = await prisma.product.createMany({
    data: [
      {
        "name": "Planters' Mixed Nuts",
        "price": 5.99,
        "discountPrice": null,
        "numRatings": 146,
        "imageUrl": "https://i.ibb.co/k6tJpGC/peanuts.png",
      },
      {
        "name": "Lemoncello Chocolate Almonds",
        "price": 8.99, 
        "numRatings": 15,
        "discountPrice": null,
        "imageUrl": "https://i.ibb.co/z2qJ5sB/lemon-choc-almonds.webp",
      },
      {
        "name": "Spicy Dill Cashews",
        "price": 7.49, 
        "numRatings": 19,
        "discountPrice": null,
        "imageUrl": "https://i.ibb.co/TcVPZZv/spicy-dill.webp",
      },
      {
        "name": "Gorbanzo Beans",
        "price": 6.99, 
        "numRatings": 33,
        "discountPrice": 5.99,
        "imageUrl": "https://i.ibb.co/rMXKgQW/beans.webp",
      },
      {
        "name": "Pistachios (No Shell)",
        "price": 7.99, 
        "numRatings": 88,
        "discountPrice": null,
        "imageUrl": "https://i.ibb.co/ncJkwmQ/pistachios.webp",
      },
      {
        "name": "Honey Roasted Cashews",
        "price": 3.99,
        "discountPrice": null,
        "numRatings": 35,
        "imageUrl": "https://i.ibb.co/Cnnjsh3/honeyroastedcashews.png", 
      }
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
