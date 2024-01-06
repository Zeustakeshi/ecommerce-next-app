import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import Image from "next/image";
import React from "react";

const Loading = () => {
    return (
        <MaxWidthWrapper className="flex flex-col w-svw h-svh justify-center items-center">
            <div className="flex justify-center items-center p-8">
                <Image
                    src="/loading.svg"
                    alt="loading"
                    width={200}
                    height={200}
                ></Image>
                <Image
                    src="/loading-static.svg"
                    alt="loading"
                    width={200}
                    height={200}
                ></Image>
            </div>
            <p className="text-lg font-semiboldm my-5">
                Đang chuyển trang đợi xíu nhé ...........
            </p>
        </MaxWidthWrapper>
    );
};

export default Loading;
