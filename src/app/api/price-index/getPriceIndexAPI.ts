import { IndexType } from '@/lib/db/entity/PriceIndex';
import axios from 'axios';

type GetPriceIndexParams = {
  regionName?: string;
  regionCode?: string;
}

type GetPriceIndexResponse = {
  SALE: { statDate: string; value: string; indexType: IndexType }[];
  JEONSE: { statDate: string; value: string; indexType: IndexType }[];
}

export const getPriceIndexAPI = async (params: GetPriceIndexParams) => {
  return (await axios.get<GetPriceIndexResponse>('/api/price-index', { params })).data;
}