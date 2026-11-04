import { SHOP, priceOf } from "./catalog";

/**
 * Orders placed through the preview checkout. Payments are not connected, so an order is
 * saved in this browser only; swap `saveOrder` for a call to the real order API at launch.
 */

export interface OrderLine {
  id: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  placedAt: string;
  email: string;
  name: string;
  address: string[];
  slot: string;
  payment: string;
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  fee: number;
  total: number;
}

const ORDERS_KEY = "kairo-orders";

export function orderTotals(
  lines: { id: string; quantity: number }[],
  payment?: string
) {
  const subtotal = lines.reduce((acc, l) => acc + priceOf(l.id) * l.quantity, 0);
  const shipping =
    subtotal === 0 || subtotal >= SHOP.freeShippingFrom ? 0 : SHOP.shipping;
  const fee = payment === "cod" ? SHOP.cashOnDeliveryFee : 0;
  const total = subtotal + shipping + fee;
  // Japanese prices include 10% consumption tax.
  const tax = Math.floor((total * 10) / 110);
  return { subtotal, shipping, fee, total, tax };
}

export function readOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

export function readOrder(id: string): Order | undefined {
  return readOrders().find((o) => o.id === id);
}

export function saveOrder(order: Omit<Order, "id" | "placedAt">): Order {
  const now = new Date();
  const stamp = `${String(now.getFullYear()).slice(2)}${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;
  const serial = Math.floor(1000 + Math.random() * 9000);
  const full: Order = {
    ...order,
    id: `KA-${stamp}-${serial}`,
    placedAt: now.toISOString(),
  };
  localStorage.setItem(ORDERS_KEY, JSON.stringify([full, ...readOrders()]));
  return full;
}
