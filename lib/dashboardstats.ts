import {
  CUSTOMER_STAT_CONFIG,
  GROWTH_STAT_CONFIG,
  PROFIT_COST_STAT_CONFIG,
  STATS_CONFIG,
} from "./config/dashboard";

// For dashboard overview stats
export interface Stat {
  value: string;
  percent: number;
}
export type StatKey =
  (typeof STATS_CONFIG)[number]["key"];
export type StatsApiResponse = Record<
  StatKey,
  Stat
>;

// For customer stats
export interface CustomerStat {
  value: string;
}
export type CustomerStatKey =
  (typeof CUSTOMER_STAT_CONFIG)[number]["key"];
export type CustomerApiResponse = Record<
  CustomerStatKey,
  CustomerStat
>;

// For profit cost stats
export interface ProfitCostStat {
  value: string;
}
export type ProfitCostStatKey =
  (typeof PROFIT_COST_STAT_CONFIG)[number]["key"];
export type ProfitCostApiResponse = Record<
  ProfitCostStatKey,
  ProfitCostStat
>;
// For growth stats
export interface GrowthStat {
  value: string;
  prev: string;
  percent: number;
}
export type GrowthStatKey =
  (typeof GROWTH_STAT_CONFIG)[number]["key"];
export type GrowthStatsApiResponse = Record<
  GrowthStatKey,
  GrowthStat
>;
