
export const 전국 = [
  { code: "0000000000", name: "전국" },
  { code: "1100000000", name: "서울" },
  { code: "1A0000",     name: "강북14개구" },
  { code: "1B0000",     name: "강남11개구" },
  { code: "1T0000",     name: "수도권" },
  { code: "2A0000",     name: "6개광역시" },
  { code: "2B0000",     name: "5개광역시" },
  { code: "4A0000",     name: "기타지방" },
  { code: "2600000000", name: "부산" },
  { code: "2700000000", name: "대구" },
  { code: "2800000000", name: "인천" },
  { code: "2900000000", name: "광주" },
  { code: "3000000000", name: "대전" },
  { code: "3100000000", name: "울산" },
  { code: "3600000000", name: "세종" },
  { code: "4100000000", name: "경기" },
  { code: "4300000000", name: "충북" },
  { code: "4400000000", name: "충남" },
  { code: "4600000000", name: "전남" },
  { code: "4700000000", name: "경북" },
  { code: "4800000000", name: "경남" },
  { code: "5000000000", name: "제주" },
  { code: "5100000000", name: "강원" },
  { code: "5200000000", name: "전북" },
] as const;

export type 전국Type = typeof 전국[number];