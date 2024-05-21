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
  // const products = await prisma.product.createMany({
  //   data:[
  //     {
  //       categoryId: "sports",
  //       name: "Nike",
  //       description: "Nike không chỉ là biểu tượng của sự đổi mới và hoàn thiện mà còn là nguồn cảm hứng cho vận động viên trên khắp thế giới",
  //       img: "https://sneakerdaily.vn/wp-content/uploads/2022/06/thuong-hieu-giay-nike.jpg.webp",
  //       location:'Hồ Chí Minh',
  //       price: 5000000
  //     },
  //     {
  //       categoryId: "sports",
  //       name: "Adidas",
  //       description: "Adidas được biết đến với sự kết hợp hoàn hảo giữa thiết kế và công nghệ",
  //       img: "https://sneakerdaily.vn/wp-content/uploads/2022/06/thuong-hieu-giay-adidas.jpg.webp",
  //       location:'Cần Thơ',
  //       price: 25000000
  //     },
  //     {
  //       categoryId: "sports",
  //       name: "Puma",
  //       description: "Nổi tiếng với sự linh hoạt và thiết kế độc đáo.",
  //       img: "https://sneakerdaily.vn/wp-content/uploads/2022/06/thuong-hieu-giay-puma.jpg.webp",
  //       location:'Cần Thơ',
  //       price: 16700000
  //     },
  //     {
  //       categoryId: "sports",
  //       name: " Under Armour",
  //       description: "Under Armour ban đầu được biết đến với quần áo thể thao hiệu suất cao",
  //       img: "https://sneakerdaily.vn/wp-content/uploads/2022/06/thuong-hieu-giay-under-armour.jpg.webp",
  //       location:'Cần Thơ',
  //       price: 25600000
  //     },
  //     {
  //       categoryId: "sports",
  //       name: "Reebok",
  //       description: "Reebok không ngừng nỗ lực mang đến cho người dùng những trải nghiệm tốt nhất qua từng sản phẩm.",
  //       img: "https://sneakerdaily.vn/wp-content/uploads/2022/06/thuong-hieu-giay-reebok.jpg.webp",
  //       location:'Hồ Chí Minh',
  //       price: 10000000
  //     },
  //   ]
  // })
  
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
