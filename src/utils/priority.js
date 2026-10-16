// src/utils/priority.js
// Rescue Priority: যে খাবার আগে নষ্ট হবে এবং পরিমাণে বেশি, তার স্কোর বেশি (০-১০০)।
// priority = urgency × 0.7 + quantity × 0.3

import { msRemaining } from "./time";

const WINDOW_HOURS = 8; // ৮ ঘণ্টার বেশি বাকি থাকলে urgency শূন্য
const FULL_QUANTITY = 50; // ৫০ meal বা তার বেশি হলে quantity স্কোর পুরো

export function priorityScore(donation, now = Date.now()) {
  const ms = msRemaining(donation, now);
  if (ms === null || ms <= 0) return 0;

  const hours = ms / (60 * 60 * 1000);
  const urgency = Math.max(0, 1 - hours / WINDOW_HOURS);
  const quantity = Math.min(1, (parseInt(donation.totalQuantity, 10) || 0) / FULL_QUANTITY);

  return Math.round((urgency * 0.7 + quantity * 0.3) * 100);
}