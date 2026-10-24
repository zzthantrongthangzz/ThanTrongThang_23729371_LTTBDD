import { PHONES } from "../data/phones";
import { ColorKey, Phone } from "../types";
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? "https://6adc97c6fa5e73d4ab2d851c.mockapi.io").replace(/\/$/, "");
const VALID_COLORS: ColorKey[] = ["silver", "red", "black", "blue"];
export async function fetchPhone(id: string): Promise<Phone> {
  const response = await fetch(API_URL + "/phones/" + id);
  if (!response.ok) throw new Error("Máy chủ trả về lỗi " + response.status);
  const raw = await response.json();
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Dữ liệu điện thoại không hợp lệ");
  const fallback = PHONES.find((phone) => phone.id === id) ?? PHONES[0];
  const rawColors = Array.isArray(raw.colors) ? raw.colors.filter((key: unknown): key is ColorKey => VALID_COLORS.includes(key as ColorKey)) : [];
  const defaultColor: ColorKey = VALID_COLORS.includes(raw.defaultColor) ? raw.defaultColor : VALID_COLORS.includes(raw.daultColor) ? raw.daultColor : fallback.defaultColor;
  return {
    id: String(raw.id ?? id), name: typeof raw.name === "string" && raw.name.trim() && !/^name \d+$/i.test(raw.name) ? raw.name : fallback.name,
    price: Number.isFinite(Number(raw.price)) && Number(raw.price) >= 1000 ? Number(raw.price) : fallback.price,
    oldPrice: Number.isFinite(Number(raw.oldPrice)) && Number(raw.oldPrice) >= 1000 ? Number(raw.oldPrice) : fallback.oldPrice,
    rating: Number.isFinite(Number(raw.rating)) ? Math.max(0, Math.min(5, Number(raw.rating))) : fallback.rating,
    reviewCount: Number.isFinite(Number(raw.reviewCount)) ? Number(raw.reviewCount) : fallback.reviewCount,
    supplier: typeof raw.supplier === "string" && raw.supplier.trim() && !/^supplier \d+$/i.test(raw.supplier) ? raw.supplier : fallback.supplier,
    badge: typeof raw.badge === "string" && raw.badge.trim() && !/^badge \d+$/i.test(raw.badge) ? raw.badge : fallback.badge,
    colors: rawColors.length ? rawColors : fallback.colors, defaultColor,
  };
}

