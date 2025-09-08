'use client';
import LocationCode from '@/app/(index)/components/LocationCode';
import { getPriceIndexAPI } from '@/app/api/price-index/getPriceIndexAPI';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { 전국Type, 전국 } from '@/app/constatns';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const SALE_COLOR = '#2563eb';
const JEONSE_COLOR = '#10b981';
export default function Page() {
  const searchParams = useSearchParams();
  const [type, setType] = useState<'SALE' | 'JEONSE'>('SALE');
  const [status, setStatus] = useState('');
  const [rows, setRows] = useState<{
    SALE: any[];
    JEONSE: any[];
  }>({
    SALE: [],
    JEONSE: []
  });


  const scrape = async () => {
    // TODO: 추후 활성화
    return;

    setStatus('실행 중...');
    const res = await fetch(`/api/scrape?type=${type}`, { cache: 'no-store' });
    const data = await res.json();
    setStatus(`완료: ${JSON.stringify(data)}`);
  };

  const load = async () => {
    const regionCode = searchParams.get("regionCode");
    const result = await getPriceIndexAPI({ regionCode });

    setRows(result);
  };

  const chartData = useMemo(() => {
    if (!rows.SALE || !rows?.JEONSE) return [];
    const m = new Map<string, {statDate: string; SALE?: number; JEONSE?: number}>();

    for (const { statDate, value } of rows.SALE) {
      const obj = m.get(statDate) ?? { statDate };
      obj.SALE = +value;
      m.set(statDate, obj);
    }
    for (const { statDate, value } of rows.JEONSE) {
      const obj = m.get(statDate) ?? { statDate };
      obj.JEONSE = +value;
      m.set(statDate, obj);
    }

    return Array.from(m.values()).sort((a, b) => a.statDate.localeCompare(b.statDate));
  }, [rows]);

  return (
    <main className="container">
      <h1 className="title">KB Index Console</h1>

      <div className="row">
        <select
          className="select"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <option value="SALE">SALE</option>
          <option value="JEONSE">JEONSE</option>
        </select>
        <button className="btn btn-primary" onClick={scrape}>
          스크래핑
        </button>
        <span className="status">{status}</span>
      </div>

      {/* 조회 필터 */}
      <div css={{ display: 'flex', gap: '0.5rem' }}>
        <LocationCode />

        <button className="btn" onClick={load}>
          조회
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="statDate"/><YAxis/><Tooltip/>
          <Line
            type="monotone"
            dataKey="SALE"
            name="매매 (SALE)"
            stroke={SALE_COLOR}
            dot={false}
            activeDot={false}
          />
          <Line
            type="monotone"
            dataKey="JEONSE"
            name="전세 (JEONSE)"
            stroke={JEONSE_COLOR}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* 아래 별도 라벨 */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 8 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 3, background: SALE_COLOR, borderRadius: 2 }}/>
          매매 (SALE)
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 12, height: 3, background: JEONSE_COLOR, borderRadius: 2 }}/>
          전세 (JEONSE)
        </span>
      </div>

    </main>
  );
}
