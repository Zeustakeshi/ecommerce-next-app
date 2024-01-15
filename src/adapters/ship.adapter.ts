import db from "@/lib/db";
import { ShipMethodCode } from "@prisma/client";

interface IShipMethod {
    getShippingCost(
        weight: number,
        dimensions: { long: number; width: number; height: number }
    ): Promise<number>;
}

class GExpress implements IShipMethod {
    async getShippingCost(
        weight: number,
        dimensions: { long: number; width: number; height: number }
    ): Promise<number> {
        const response = await fetch(process.env.G_EXPRESS_URL!, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                weight,
            }),
            cache: "no-store",
        });

        const data = await response.json();

        return data?.body?.data?.transport_price || 0;
    }
}

class SellerShip implements IShipMethod {
    async getShippingCost(
        weight: number,
        dimensions: { long: number; width: number; height: number }
    ): Promise<number> {
        return 0;
    }
}

class ShipManager {
    private shipMethod: Record<string, IShipMethod> = {};
    constructor() {
        this.shipMethod = {
            [ShipMethodCode.G_EXPRESS]: new GExpress(),
            [ShipMethodCode.SELLER_SHIPPING]: new SellerShip(),
        };
    }
    getShipMethod(code: ShipMethodCode) {
        return this.shipMethod[code];
    }
}

export default new ShipManager();
