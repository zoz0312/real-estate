import { getDS } from '@/lib/db/dataSource';
import { PriceIndex } from '@/lib/db/entity/PriceIndex';

type IndexType = 'SALE' | 'JEONSE';

interface KBWire {
  dataBody: {
    data: {업데이트일자: string; 날짜리스트: string[]; 데이터리스트: {지역코드: string; 지역명: string; dataList: number[];}[];};
    resultCode: number;
  };
}

export const storeKbResponse = async (
  resp: KBWire,
  indexType: IndexType,
  source: string
) => {
  const ds = await getDS();
  const repo = ds.getRepository(PriceIndex);

  const dates = resp.dataBody.data.날짜리스트;
  const rows = resp.dataBody.data.데이터리스트;

  for (const r of rows) {
    const regionCode = r.지역코드;
    const regionName = r.지역명;

    for (let i = 0; i < dates.length; i++) {
      const statDate = dates[i];
      const value = Number(r.dataList[i] ?? 0).toFixed(6);

      const exists = await repo.exists({ where: { statDate, regionCode, indexType, source } });

      if (!exists) {
        const entity = repo.create({
          statDate,
          regionCode,
          regionName,
          indexType,
          value,
          source
        });
        await repo.save(entity);
      }
    }
  }
};
