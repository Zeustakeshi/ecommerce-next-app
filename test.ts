// import db from "@/lib/db";
// import { nanoid } from "@/lib/utils";
// import { Category } from "@prisma/client";

// const initDb = async (keyword: string) => {
//     const response = await fetch(
//         `https://banhang.shopee.vn/help/api/v3/global_category/list/?page=1&size=10&keyword=${keyword}`,
//         {
//             cache: "no-store",
//         }
//     );

//     const json = await response.json();
//     if (!json) throw new Error("co loi kiaaaaa");

//     const datas = json.data.global_cats as any[];

//     const res: Category[] = [];

//     datas.forEach((category: { path: any[] }) => {
//         let parent: string | null = null;
//         category.path.forEach((path) => {
//             const id = nanoid();
//             res.push({
//                 id: id,
//                 categoryId: id,
//                 name: path.category_name,
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//                 description: "",
//                 keyword: path.category_name,
//                 parentCategoryId: parent,
//             });
//             parent = id;
//         });
//         console.log(res);
//     });
// };

// initDb("văn phòng phẩm");
