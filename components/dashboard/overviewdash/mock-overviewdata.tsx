import { DataPoint } from "@/lib/types/chart";
import { Transaction } from "../RecentTransactions";
import { TopProduct } from "../TopItems";
import { LocationData } from "./SalesLocationChart";
import { HourlyData } from "./HourlySalesChart";
import {
  StatsApiResponse,
  WinningApiResponse,
} from "@/lib/dashboardstats";

export const mockStats: StatsApiResponse = {
  totalSales: {
    value: 999999,
    percent: 12,
  },
  totalOrders: {
    value: 1234,
    percent: 10,
  },
  productsSold: {
    value: 123,
    percent: 10,
  },
  netProfit: {
    value: 12000,
    percent: -10,
  },
};

export const mockWinningStats: WinningApiResponse =
  {
    topSellingProduct: {
      value: "Classic Latte",
    },
    peakHour: {
      value: "10AM - 11AM",
    },
    bestDay: {
      value: "Sunday",
    },
  };
export const mockTopProducts: TopProduct[] = [
  {
    rank: 1,
    productName: "Black Coffee",
    noOfSale: 10,
    totalRevenue: 500,
  },
  {
    rank: 2,
    productName: "Sandwich",
    noOfSale: 5,
    totalRevenue: 300,
  },
  {
    rank: 3,
    productName: "Latte",
    noOfSale: 8,
    totalRevenue: 250,
  },
];

export const mockRecentTransactions: Transaction[] =
  [
    {
      id: "ORD-421",
      timestamp: "2 min ago",
      customer: "Alex Johnson",
      amount: 28.5,
      status: "completed",
    },
    {
      id: "ORD-420",
      timestamp: "15 min ago",
      customer: "Maria Garcia",
      amount: 14.0,
      status: "pending",
    },
    {
      id: "ORD-419",
      timestamp: "1 hr ago",
      customer: "James Lee",
      amount: 52.75,
      status: "failed",
    },
  ];

export const mockWeeklyRevenue: DataPoint[] = [
  { day: "Mon", revenue: 13000 },
  { day: "Tue", revenue: 12000 },
  { day: "Wed", revenue: 15500 },
  { day: "Thu", revenue: 12500 },
  { day: "Fri", revenue: 17000 },
  { day: "Sat", revenue: 22000 },
  { day: "Sun", revenue: 18000 },
];

export const mockSalesLocation: LocationData[] = [
  {
    name: "Pokhara",
    value: 45,
  },
  {
    name: "Patan",
    value: 25,
  },
  {
    name: "Kathmandu",
    value: 30,
  },
];

export const mockHourlySales: HourlyData[] = [
  { hour: "7am", revenue: 580 },
  { hour: "8am", revenue: 1020 },
  { hour: "9am", revenue: 1350 },
  { hour: "10am", revenue: 2420 },
  { hour: "11am", revenue: 1900 },
  { hour: "12pm", revenue: 1580 },
  { hour: "1pm", revenue: 1420 },
  { hour: "2pm", revenue: 1080 },
  { hour: "3pm", revenue: 1020 },
  { hour: "4pm", revenue: 1130 },
  { hour: "5pm", revenue: 1420 },
  { hour: "6pm", revenue: 2050 },
  { hour: "7pm", revenue: 1720 },
  { hour: "8pm", revenue: 1050 },
];
