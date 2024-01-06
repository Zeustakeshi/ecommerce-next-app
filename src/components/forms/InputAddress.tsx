import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FC, useEffect, useState, useTransition } from "react";

type Address = {
    province: string;
    district: string;
    ward: string;
};

type Props = {
    address: Address;
    onChange(value: Address): void;
};

const InputAddress: FC<Props> = ({ onChange, address }) => {
    const [provinces, setProvinces] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);

    useEffect(() => {
        fetchAddress("p")
            .then((data) => data.json())
            .then((provinces) => {
                setProvinces(provinces);
            });
    }, []);

    const fetchAddress = (type: "p" | "d" | "w", code?: number) => {
        let url = `https://provinces.open-api.vn/api/${type}/search/?q=*`;
        switch (type) {
            case "d":
                url += `&p=${code}`;
            case "w":
                url += `&d=${code}`;
        }
        console.log(url);
        return fetch(url, {
            cache: "no-cache",
        });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-3">
            <div>
                <p className="text-sm mb-3 text-muted-foreground">
                    Tỉnh, thành phố
                </p>
                <Select
                    onValueChange={(province) => {
                        const currentProvince = JSON.parse(province);
                        onChange({
                            ...address,
                            province: currentProvince.name,
                        });
                        fetchAddress("d", currentProvince.code)
                            .then((data) => data.json())
                            .then((districts) => {
                                setDistricts(districts);
                            });
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="  Tỉnh, thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                        {provinces.map((province, index) => {
                            return (
                                <SelectItem
                                    itemType="number"
                                    key={index}
                                    value={JSON.stringify(province)}
                                >
                                    {province.name}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <p className="text-sm mb-3 text-muted-foreground">
                    Quận, huyện
                </p>
                <Select
                    onValueChange={(district) => {
                        const currentDistrict = JSON.parse(district);
                        onChange({
                            ...address,
                            district: currentDistrict.name,
                        });
                        fetchAddress("w", currentDistrict.code)
                            .then((data) => data.json())
                            .then((wards) => {
                                setWards(wards);
                            });
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Quận, huyện" />
                    </SelectTrigger>
                    <SelectContent>
                        {districts.map((district, index) => {
                            return (
                                <SelectItem
                                    key={index}
                                    value={JSON.stringify(district)}
                                >
                                    {district.name}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <p className="text-sm mb-3 text-muted-foreground">
                    Phường, xã, thị trấn
                </p>
                <Select
                    onValueChange={(ward) => {
                        const currentWard = JSON.parse(ward);
                        onChange({
                            ...address,
                            ward: currentWard.name,
                        });
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Phường xã, thị trấn" />
                    </SelectTrigger>
                    <SelectContent>
                        {wards.map((ward, index) => (
                            <SelectItem
                                key={index}
                                value={JSON.stringify(ward)}
                            >
                                {ward.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default InputAddress;
