import { getDS } from "@/lib/db/dataSource";
import { IndexType, PriceIndex } from '@/lib/db/entity/PriceIndex';

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const regionName = searchParams.get("regionName") ?? '전국';
  const regionCode = searchParams.get("regionCode") ?? undefined;

  const ds = await getDS();

  const qb = ds.getRepository(PriceIndex)
    .createQueryBuilder("p")
    .select([
      "p.statDate AS statDate",
      "p.indexType AS indexType",
      "p.value AS value",
    ])
    .where("p.regionName = :regionName", { regionName })
    .orderBy("p.statDate", "ASC");

  if (regionCode) {
    qb.where("p.regionCode = :regionCode", { regionCode });
  }


  const raw = await qb.getRawMany<{ statDate: string; indexType: IndexType; value: string }>();

  const data = [...new Set(raw)];

  return Response.json({
    SALE: data.filter(item => item.indexType === "SALE"),
    JEONSE: data.filter(item => item.indexType === "JEONSE")
  });
}
