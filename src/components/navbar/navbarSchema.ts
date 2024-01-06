export type NavBarSchema = {
    title: string;
    to?: string;
    children?: { title: string; to: string; description?: string }[];
};

const navBarSchema: NavBarSchema[] = [
    {
        title: "Phổ biến",
        to: "/",
    },
    {
        title: "Cá nhân",
        children: [
            {
                title: "Quần áo",
                to: "",
                description:
                    "Sản phẩm quần áo chất lượng cao, phong cách và thoải mái cho mọi dịp. Hãy trải nghiệm sự thoải mái cùng chất liệu đẳng cấp.",
            },
            {
                title: "Giày",
                to: "",
                description:
                    "Bước đi nhẹ nhàng với các sản phẩm giày thời trang. Chất liệu bền bỉ, phong cách đa dạng để bạn tỏa sáng mọi lúc.",
            },
            {
                title: "Balo",
                to: "",
                description:
                    "Balo thông minh với nhiều ngăn tiện ích, phù hợp cho cả công việc và du lịch. Thiết kế thời trang và chất liệu chống nước đảm bảo an toàn cho đồ dùng bên trong.",
            },
            {
                title: "Mũ",
                to: "",
                description:
                    "Mũ thời trang phản ánh phong cách cá nhân của bạn. Chất liệu cao cấp, đa dạng kiểu dáng để bạn có nhiều sự lựa chọn.",
            },
            {
                title: "Ốp lưng",
                to: "",
                description:
                    "Bảo vệ điện thoại của bạn một cách an toàn và thời trang với ốp lưng chất lượng. Nhiều mẫu mã để bạn tự do lựa chọn.",
            },
        ],
    },
    {
        title: "Học tập",
        children: [
            {
                title: "Đồ dùng học tập",
                to: "",
                description:
                    "Bộ sưu tập đồ dùng học tập chất lượng, từ sách vở đến bút chì. Hãy tạo điểm nhấn cho sự thành công học tập của bạn.",
            },
            {
                title: "Tài liệu cũ",
                to: "",
                description:
                    "Khám phá các tài liệu cũ độc đáo và giá trị. Sách, tạp chí và nguồn tư liệu khác đang chờ bạn khám phá.",
            },
        ],
    },
    {
        title: "Đồ ăn",
        children: [
            {
                title: "Trái cây",
                to: "",
                description:
                    "Thưởng thức hương vị tươi ngon của trái cây tự nhiên. Sản phẩm chất lượng cao, giữ nguyên hương vị và dinh dưỡng.",
            },
            {
                title: "Trà sữa",
                to: "",
                description:
                    "Một trải nghiệm thú vị với trà sữa đa dạng hương vị. Thưởng thức mỗi ngụm, bạn sẽ cảm nhận được sự tinh tế và độc đáo.",
            },
        ],
    },
    {
        title: "Tài liệu",
        to: "/",
    },
    {
        title: "Thêm",
        children: [
            {
                title: "Quần áo",
                to: "",
                description:
                    "Mở rộng tủ quần áo của bạn với những kiểu dáng mới nhất. Chất liệu thoáng khí và thoải mái để bạn tự tin bước ra ngoài.",
            },
            {
                title: "Giày",
                to: "",
                description:
                    "Bước đi tự tin với những đôi giày thời trang. Chất liệu êm dịu và đế chống trơn trượt đảm bảo an toàn mỗi bước đi.",
            },
            {
                title: "Dụng cụ thể thao",
                to: "",
                description:
                    "Nâng cao sức khỏe và thể lực với dụng cụ thể thao chất lượng. Tận hưởng những buổi tập luyện hiệu quả cùng trang thiết bị đa dạng.",
            },
            {
                title: "Sách",
                to: "",
                description:
                    "Khám phá thế giới thông qua những cuốn sách hấp dẫn. Sách với đủ thể loại để đáp ứng mọi sở thích và kiến thức.",
            },
        ],
    },
];

export default navBarSchema;
