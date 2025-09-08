import { RegionType, 전국 } from '@/app/constatns';

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, FC, useEffect, useState } from 'react';


const LocationCode: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [firstRegion, setFirstRegion] = useState<RegionType>(전국[0]);
  const [secondRegion, setSecondRegion] = useState<RegionType | null>(null);

  useEffect(() => {
    const regionCode = searchParams.get("regionCode");

    if (!regionCode) {
      return;
    }

    let parent: RegionType | undefined;
    let child: RegionType | undefined;

    for (const r of 전국) {
      if (r.code === regionCode) {
        parent = r;
        break;
      }

      const c = r.children?.find(ch => ch.code === regionCode);
      if (c) {
        parent = r;
        child = c;
        break;
      }
    }

    if (parent) setFirstRegion(parent);
    setSecondRegion(child ?? null);
  }, []);

  const handleFirstRegionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const region = 전국.find(item => item.code === e.target.value)!;
    setFirstRegion(region as never);
    setSecondRegion(null);
  };

  const handleSecondRegionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!firstRegion.children) {
      return;
    }

    const region = firstRegion.children.find(item => item.code === e.target.value)!;
    setSecondRegion(region as never);
  };


  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const regionCode = secondRegion ? secondRegion.code : firstRegion.code;
    params.set("regionCode", regionCode);
    router.replace(`?${params.toString()}`);
  }, [firstRegion, router, searchParams, secondRegion]);

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <select
        className="select"
        value={firstRegion.code}
        onChange={handleFirstRegionChange}
      >
        <option value="none">선택</option>
        {전국.map((r) => (
          <option key={r.code} value={r.code}>
            {r.name}
          </option>
        ))}
      </select>

      <select
        className="select"
        value={secondRegion?.code ?? 'none'}
        onChange={handleSecondRegionChange}
        disabled={!firstRegion.children}
      >
        <option value="none">선택</option>
        {firstRegion.children?.map((r) => (
          <option key={r.code} value={r.code}>
            {r.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationCode;