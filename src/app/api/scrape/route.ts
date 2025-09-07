import axios from "axios";
import { storeKbResponse } from "@/lib/services/storeKbResponse";

export const runtime = "nodejs"; // ✅ TypeORM은 Edge 불가

const BASE_URL = "https://data-api.kbland.kr/bfmstat";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get("type") as "SALE" | "JEONSE") ?? "SALE";

  const params = {
    title: "주택종합 매매가격지수",
    매매전세코드: type === "SALE" ? "01" : "02",
    매물종별구분: "98",
    월간주간구분코드: "01",
    기간: "1",
    type: "true",
    apiFlag: "priceIndex",
    메뉴코드: "1",
    단위: "(기준:2022.1 = 100.0)",
  };

  const { data } = await axios.get(`${BASE_URL}/weekMnthlyHuseTrnd/priceIndex`, { params });

  await storeKbResponse(data, type, `${BASE_URL}/weekMnthlyHuseTrnd/priceIndex`);

  return Response.json({ ok: true, type });
}
