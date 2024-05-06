import { PrismaClient, PublishType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const subcategory = await prisma.subCategory.createMany({
  //   data: [
  //     {
  //       id: "apartments-for-rent",
  //       categoryId: "propertyrentals",
  //       name: "Căn hộ cho thuê",
  //     },
  //     {
  //       id: "condos-for-rent",
  //       categoryId: "propertyrentals",
  //       name: "Chung cư cho thuê",
  //     },
  //     {
  //       id: "houses-for-rent",
  //       categoryId: "propertyrentals",
  //       name: "Nhà cho thuê",
  //     },
  //     {
  //       id: "townhouses-for-rent",
  //       categoryId: "propertyrentals",
  //       name: "Nhà liền kề cho thuê",
  //     }
  //   ],
  // });
  const products = await prisma.product.createMany({
    data:[
      {
        categoryId: "sports",
        name: "Nike",
        description: "Nike không chỉ là biểu tượng của sự đổi mới và hoàn thiện mà còn là nguồn cảm hứng cho vận động viên trên khắp thế giới",
        img: "https://sneakerdaily.vn/wp-content/uploads/2022/06/thuong-hieu-giay-nike.jpg.webp",
        location:'Hồ Chí Minh',
        price: 5000000
      },
      {
        categoryId: "sports",
        name: "Adidas",
        description: "Adidas được biết đến với sự kết hợp hoàn hảo giữa thiết kế và công nghệ",
        img: "https://sneakerdaily.vn/wp-content/uploads/2022/06/thuong-hieu-giay-adidas.jpg.webp",
        location:'Cần Thơ',
        price: 25000000
      },
      {
        categoryId: "sports",
        name: "Puma",
        description: "Nổi tiếng với sự linh hoạt và thiết kế độc đáo.",
        img: "https://sneakerdaily.vn/wp-content/uploads/2022/06/thuong-hieu-giay-puma.jpg.webp",
        location:'Cần Thơ',
        price: 16700000
      },
      {
        categoryId: "sports",
        name: " Under Armour",
        description: "Under Armour ban đầu được biết đến với quần áo thể thao hiệu suất cao",
        img: "https://sneakerdaily.vn/wp-content/uploads/2022/06/thuong-hieu-giay-under-armour.jpg.webp",
        location:'Cần Thơ',
        price: 25600000
      },
      {
        categoryId: "sports",
        name: "Reebok",
        description: "Reebok không ngừng nỗ lực mang đến cho người dùng những trải nghiệm tốt nhất qua từng sản phẩm.",
        img: "https://sneakerdaily.vn/wp-content/uploads/2022/06/thuong-hieu-giay-reebok.jpg.webp",
        location:'Hồ Chí Minh',
        price: 10000000
      },
    ]
  })

  console.log(products);
  
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
