import React, { FC } from "react";
import {
    Tailwind,
    Body,
    Container,
    Column,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Hr,
    Button,
} from "@react-email/components";

type Props = {
    shop: {
        name: string;
        email: string;
    };

    product: {
        name: string;
        description: string;
        images: string[];
    };
};

const ProductRegisterRequest = ({ product, shop }: Props) => {
    const baseUrl = process.env.BASE_URL;
    return (
        <Html>
            <Tailwind>
                <Head />
                <Preview>
                    Yêu cầu đăng ký kinh doanh sản phẩm {product.name}{" "}
                </Preview>
                <Body style={main}>
                    <Container style={container}>
                        <Section>
                            <Column>
                                <Img
                                    style={sectionLogo}
                                    src={`${baseUrl}/logo.png`}
                                    width="155"
                                    height="31"
                                    alt="TDMU eStore"
                                />
                            </Column>
                        </Section>

                        <Section style={paragraphContent}>
                            <Hr style={hr} />
                            <Text style={heading}>
                                Yêu cầu đăng ký sản phẩm
                            </Text>
                            <Text style={paragraph}>
                                Xin chào Admin TDMU eStore,
                            </Text>
                            <Text style={paragraph}>
                                Chúng tôi muốn thông báo rằng có một yêu cầu
                                đăng ký sản phẩm mới từ một người bán trên nền
                                tảng của bạn.
                            </Text>
                        </Section>

                        <Section style={paragraphContent}>
                            <Text style={paragraph} className="font-semibold">
                                Thông tin Sản phẩm:
                            </Text>
                            <ul className="p-0">
                                <li>
                                    <Text style={paragraph}>
                                        Tên sản phẩm: {product.name}
                                    </Text>
                                </li>
                                <li>
                                    <Text style={paragraph}>
                                        Tên cửa hàng: {shop.name}
                                    </Text>
                                </li>
                                <li>
                                    <Text style={paragraph}>
                                        Địa chỉ email: {shop.email}
                                    </Text>
                                </li>
                            </ul>
                        </Section>
                        <Section style={paragraphContent}>
                            <Text style={paragraph} className="font-semibold">
                                Mô tả sản phẩm:{" "}
                            </Text>
                            <Text style={paragraph}>{product.description}</Text>
                        </Section>

                        <Section style={paragraphContent}>
                            <Button
                                className="text-center px-5 py-2 rounded-md bg-blue-600 text-white font-semibold text-lg inline-block"
                                href={`${baseUrl}/manager/admin/products/pending`}
                            >
                                Xem ngay
                            </Button>
                        </Section>

                        <Section style={paragraphContent}>
                            <Text style={paragraph}>Ảnh minh họa: </Text>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {product.images.map((url, index) => {
                                    return (
                                        <Img
                                            key={index}
                                            className="w-full h-full object-cover"
                                            src={url}
                                            alt={`ảnh minh họa ${index + 1}`}
                                        />
                                    );
                                })}
                            </div>
                            <Hr style={hr} />
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

const main = {
    backgroundColor: "#dbddde",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const sectionLogo = {
    padding: "0 40px",
};

const headerBlue = {
    marginTop: "-1px",
};

const container = {
    margin: "30px auto",
    width: "610px",
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
};

const heading = {
    fontSize: "14px",
    lineHeight: "26px",
    fontWeight: "700",
    color: "#004dcf",
};

const paragraphContent = {
    padding: "0 40px",
};

const paragraph = {
    fontSize: "14px",
    lineHeight: "22px",
    color: "#3c4043",
};

const hr = {
    borderColor: "#e8eaed",
    margin: "20px 0",
};

export default ProductRegisterRequest;
