import axios from 'axios';

type GetScrapeParams = {
  type: 'SALE' | 'JEONSE';
}

type GetScrapeResponse = {
  ok: boolean;
  type: 'SALE' | 'JEONSE';
  error?: unknown;
}

export const getScrapeAPI = async (params: GetScrapeParams) => {
  return (await axios.get<GetScrapeResponse>('/api/scrape', { params })).data;
}