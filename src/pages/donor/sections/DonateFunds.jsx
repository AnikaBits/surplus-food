// ============================================================
// NEW FILE — src/pages/donor/sections/DonateFunds.jsx
// ============================================================
// Feature List এর "Donate Funds" — bKash/Nagad/Rocket/Card দিয়ে
// টাকা donate করার UI। এটা সম্পূর্ণ mockup — কোনো real payment
// gateway এর সাথে কানেক্ট হচ্ছে না, শুধু fake success দেখাবে।
// ============================================================

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const paymentMethods = [
  { id: "bkash", label: "bKash", color: "bg-pink-600" },
  { id: "nagad", label: "Nagad", color: "bg-orange-600" },
  { id: "rocket", label: "Rocket", color: "bg-purple-600" },
  { id: "card", label: "Card", color: "bg-blue-600" },
];

function DonateFunds() {
  const { currentUser, moneyDonations, setMoneyDonations } = useAuth();

  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleConfirm(e) {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    const newPayment = {
      id: `pay${Date.now()}`,
      donorId: currentUser.id,
      amount: Number(amount),
      method:
        paymentMethods.find((m) => m.id === selectedMethod)?.label ||
        selectedMethod,
      date: new Date().toISOString(),
    };

    setMoneyDonations([...moneyDonations, newPayment]);
    setSuccessMsg(`৳${amount} donated successfully via ${newPayment.method}!`);
    setAmount("");
    setAccountNumber("");

    setTimeout(() => setSuccessMsg(""), 4000);
  }

  const myMoneyDonations = moneyDonations.filter(
    (p) => p.donorId === currentUser.id
  );

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Donate Funds</h2>

      {successMsg && (
        <p className="mb-4 text-green-600 text-sm font-medium bg-green-50 p-3 rounded-lg">
          ✅ {successMsg}
        </p>
      )}

      <form
        onSubmit={handleConfirm}
        className="bg-white rounded-xl shadow-sm p-6 space-y-5"
      >
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Select Payment Method
          </p>
          <div className="grid grid-cols-4 gap-3">
            {paymentMethods.map((method) => (
              <button
                type="button"
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`py-3 rounded-lg text-white text-sm font-semibold ${
                  method.color
                } ${
                  selectedMethod === method.id
                    ? "ring-2 ring-offset-2 ring-green-600"
                    : "opacity-70"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (৳)"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder={
            selectedMethod === "card"
              ? "Card Number (dummy)"
              : "Phone Number (dummy)"
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Confirm Donation
        </button>
      </form>

      {myMoneyDonations.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold text-gray-700 mb-3">
            Your Past Fund Donations
          </h3>
          <div className="space-y-2">
            {myMoneyDonations.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg shadow-sm p-3 flex justify-between text-sm"
              >
                <span>{p.method}</span>
                <span className="font-semibold text-green-700">
                  ৳{p.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DonateFunds;