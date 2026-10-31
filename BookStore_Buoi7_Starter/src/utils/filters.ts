import { Book } from "../types";

export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();

export type PriceRange = "lt100" | "100to300" | "gt300" | null;
export const PRICE_RANGES: { key: Exclude<PriceRange, null>; label: string }[] = [
  { key: "lt100", label: "Dưới 100k" },
  { key: "100to300", label: "100k–300k" },
  { key: "gt300", label: "Trên 300k" },
];

const inRange = (price: number, range: PriceRange): boolean => {
  if (range === null) return true;
  if (range === "lt100") return price < 100000;
  if (range === "100to300") return price >= 100000 && price <= 300000;
  return price > 300000;
};

export interface BookFilter { keyword: string; categoryId: number | null; priceRange: PriceRange; }

export function filterBooks(books: Book[], filter: BookFilter): Book[] {
  const keyword = normalize(filter.keyword);
  return books.filter((book) =>
    (keyword === "" || normalize(book.title).includes(keyword) || normalize(book.author).includes(keyword)) &&
    (filter.categoryId === null || book.categoryId === filter.categoryId) &&
    inRange(book.price, filter.priceRange)
  );
}
