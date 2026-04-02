import { fetchBusinessData } from "@/services/apiBusiness.client";
import { useQuery } from "@tanstack/react-query";

export const useBusiness = () => {
  return useQuery({
    queryKey: ["business-profile"],
    queryFn: fetchBusinessData,

    staleTime: Infinity,
  });
};
