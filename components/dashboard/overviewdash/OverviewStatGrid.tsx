"use client";

import { MergedSerializableConfig } from "@/lib/config/dashboard";
import OverviewStatBox from "./OverviewStatBox";

export default function OverviewStatBoxGrid({
  stats,
}: {
  stats: MergedSerializableConfig[];
}) {
  return (
    <>
      {stats.map(({ key, ...stat }) => (
        <OverviewStatBox key={key} {...stat} />
      ))}
    </>
  );
}
