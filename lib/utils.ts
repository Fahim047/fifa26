import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFlagUrl(teamId?: string): string | undefined {
  if (!teamId || teamId.startsWith("po-")) return undefined;

  const mapping: Record<string, string> = {
    en: "gb-eng",
    sc: "gb-sct",
    wa: "gb-wls",
    nir: "gb-nir",
  };

  const code = mapping[teamId.toLowerCase()] || teamId.toLowerCase();
  // Basic validation to ensure we don't send garbage to CDN
  if (code.length > 6) return undefined;

  return `https://flagcdn.com/w40/${code}.png`;
}
