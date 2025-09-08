import { 강남11개구 } from './강남11개구';
import { 강북14개구 } from './강북14개구';
import { 강원 } from './강원';
import { 경기 } from './경기';
import { 경남 } from './경남';
import { 경북 } from './경북';
import { 광주 } from './광주';
import { 대구 } from './대구';
import { 대전 } from './대전';
import { 부산 } from './부산';
import { 울산 } from './울산';
import { 인천 } from './인천';
import { 전남 } from './전남';
import { 전북 } from './전북';
import { 제주 } from './제주';
import { 충남 } from './충남';
import { 충북 } from './충북';


export type RegionType = {
  code: string;
  name: string;
  children?: RegionType[];
};

export const 전국: RegionType[] = [
  { code: '0000000000', name: '전국' },
  { code: '1100000000', name: '서울' },
  { code: '1A0000', name: '강북14개구', children: 강북14개구 },
  { code: '1B0000', name: '강남11개구', children: 강남11개구 },
  { code: '1T0000', name: '수도권' },
  { code: '2A0000', name: '6개광역시' },
  { code: '2B0000', name: '5개광역시' },
  { code: '4A0000', name: '기타지방' },
  { code: '2600000000', name: '부산', children: 부산 },
  { code: '2700000000', name: '대구', children: 대구 },
  { code: '2800000000', name: '인천', children: 인천 },
  { code: '2900000000', name: '광주', children: 광주 },
  { code: '3000000000', name: '대전', children: 대전 },
  { code: '3100000000', name: '울산', children: 울산 },
  { code: '3600000000', name: '세종' },
  { code: '4100000000', name: '경기', children: 경기 },
  { code: '4300000000', name: '충북', children: 충북 },
  { code: '4400000000', name: '충남', children: 충남 },
  { code: '4600000000', name: '전남', children: 전남 },
  { code: '4700000000', name: '경북', children: 경북 },
  { code: '4800000000', name: '경남', children: 경남 },
  { code: '5000000000', name: '제주', children: 제주 },
  { code: '5100000000', name: '강원', children: 강원 },
  { code: '5200000000', name: '전북', children: 전북 },
];

export const 지역코드 = [
  '1A0000',
  '1B0000',
  '2600000000',
  '2700000000',
  '2800000000',
  '2900000000',
  '3000000000',
  '3100000000',
  '4100000000',
  '4300000000',
  '4400000000',
  '4600000000',
  '4700000000',
  '4800000000',
  '5100000000',
  '5200000000',
];
