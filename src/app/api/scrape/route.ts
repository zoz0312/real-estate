import { 지역코드 } from '@/app/constatns';
import { storeKbResponse } from '@/lib/services/storeKbResponse';
import axios from 'axios';

export const runtime = 'nodejs'; // ✅ TypeORM은 Edge 불가

const BASE_URL = 'https://data-api.kbland.kr/bfmstat';

type Params = {
  title: string;
  매매전세코드: '01' | '02'; // 01 = 매매, 02 = 전세
  매물종별구분: string;
  월간주간구분코드: string;
  기간: number; // 단위 = 년
  type: true;
  apiFlag: string;
  메뉴코드: number;
  단위: string;
  지역코드?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get('type') as 'SALE' | 'JEONSE') ?? 'SALE';

  const params: Params = {
    title: '주택종합 매매가격지수',
    매매전세코드: type === 'SALE' ? '01' : '02',
    매물종별구분: '98',
    월간주간구분코드: '01',
    기간: 10,
    type: true,
    apiFlag: 'priceIndex',
    메뉴코드: 1,
    단위: '(기준:2022.1 = 100.0)'
  };
  try {
    const { data } = await axios.get(`${BASE_URL}/weekMnthlyHuseTrnd/priceIndex`, { params });

    await storeKbResponse(data, type, `${BASE_URL}/weekMnthlyHuseTrnd/priceIndex`);

    const promises = 지역코드.map((code) => {
      params.지역코드 = code;

      return axios.get(`${BASE_URL}/weekMnthlyHuseTrnd/priceIndex`, { params });
    });

    const results = await Promise.all(promises);
    for (const res of results) {
      const idx = results.indexOf(res);
      console.log(`✅ [${idx + 1}] ${지역코드[idx]} 응답 수신`);
      console.log(res.data); // 실제 응답 처리

      await storeKbResponse(results[idx].data, type, `${BASE_URL}/weekMnthlyHuseTrnd/priceIndex`);
    }
    return Response.json({ ok: true, type });
  } catch (e) {
    return Response.json({ ok: false, type, error: e });
  }
}
