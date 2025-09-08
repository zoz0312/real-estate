"use client";

import { getScrapeAPI } from "@/app/api/scrape/getScrapeAPI";
import { useState } from "react";


const Page = () => {
  const [type, setType] = useState<"SALE" | "JEONSE">("SALE");
  const [status, setStatus] = useState("");
  const scrape = async () => {
    setStatus("실행 중...");
    await getScrapeAPI({ type });
    setStatus(`완료`);
  };


  return (
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
  )
}

export default Page;