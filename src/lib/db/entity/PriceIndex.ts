import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm";

export type IndexType = "SALE" | "JEONSE";

@Entity({ name: "price_index" })
@Unique("uq_price_index", ["statDate", "regionCode", "indexType", "source"])
export class PriceIndex {
  @PrimaryGeneratedColumn()
  id!: number;

  /** YYYYMM (예: 202508) */
  @Index()
  @Column({ type: "varchar", length: 6 })
  statDate!: string;

  /** 지역 코드 (예: 1100000000, 1A0000 등) */
  @Index()
  @Column({ type: "varchar", length: 16 })
  regionCode!: string;

  /** 지역 명 (예: 서울, 강북14개구 등) */
  @Column({ type: "varchar", length: 64 })
  regionName!: string;

  /** 지수 구분: 매매(SALE) / 전세(JEONSE) */
  @Index()
  @Column({ type: "enum", enum: ["SALE", "JEONSE"] })
  indexType!: IndexType;

  /** 지수 값(소수 6자리까지 보존) */
  @Column({ type: "decimal", precision: 12, scale: 6 })
  value!: string;

  /** 원천 식별 (요청한 API/엔드포인트) */
  @Column({ type: "varchar", length: 256 })
  source!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
