// src/utils/time.js
// খাবারের expiry সময় নিয়ে সব হিসাব এখানে থাকবে।
// নতুন donation-এ `expiryAt` (ISO datetime) থাকবে।
// পুরনো ডেটায় শুধু `expiryTime` ("8:00 PM" টাইপ টেক্সট) থাকলে, সেটাকে আজকের তারিখে ধরে নেওয়া হয়।

export function getExpiryDate(donation) {
  if (donation.expiryAt) {
    const d = new Date(donation.expiryAt);
    return isNaN(d.getTime()) ? null : d;
  }

  const match = String(donation.expiryTime || "")
    .trim()
    .match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2] || "0", 10);
  const meridiem = match[3]?.toLowerCase();

  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;

  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
}

// কত মিলিসেকেন্ড বাকি। expiry জানা না থাকলে null।
export function msRemaining(donation, now = Date.now()) {
  const d = getExpiryDate(donation);
  return d ? d.getTime() - now : null;
}

// safe: ৩ ঘণ্টা বা বেশি, urgent: ১-৩ ঘণ্টা, critical: ১ ঘণ্টার কম
export function urgencyLevel(ms) {
  if (ms === null) return "unknown";
  if (ms <= 0) return "expired";
  if (ms < 60 * 60 * 1000) return "critical";
  if (ms < 3 * 60 * 60 * 1000) return "urgent";
  return "safe";
}

export function formatRemaining(ms) {
  if (ms === null) return "No expiry";
  if (ms <= 0) return "Expired";

  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}