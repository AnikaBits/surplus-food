import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const paymentMethods = [
  {
    id: "bkash",
    label: "bKash",
    color: "bg-pink-600",
    light: "bg-pink-50",
    border: "border-pink-500",
    icon: "💗",
  },
  {
    id: "nagad",
    label: "Nagad",
    color: "bg-orange-600",
    light: "bg-orange-50",
    border: "border-orange-500",
    icon: "🟠",
  },
  {
    id: "rocket",
    label: "Rocket",
    color: "bg-purple-600",
    light: "bg-purple-50",
    border: "border-purple-500",
    icon: "🚀",
  },
  {
    id: "card",
    label: "Card",
    color: "bg-blue-600",
    light: "bg-blue-50",
    border: "border-blue-500",
    icon: "💳",
  },
];

const presetAmounts = [100, 200, 500, 1000];

function DonateFunds() {
  const {
    currentUser,
    moneyDonations = [],
    setMoneyDonations,
  } = useAuth();

  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Logged-in donor's fund donations
  const myMoneyDonations = moneyDonations.filter(
    (payment) => payment.donorId === currentUser?.id
  );

  // Total amount recorded in demo
  const totalAmount = myMoneyDonations.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  const totalTransactions = myMoneyDonations.length;

  function handleConfirm(e) {
    e.preventDefault();

    const donationAmount = Number(amount);

    if (
      !Number.isFinite(donationAmount) ||
      donationAmount <= 0
    ) {
      return;
    }

    const newPayment = {
      id: `pay${Date.now()}`,
      donorId: currentUser.id,
      amount: donationAmount,
      method:
        paymentMethods.find(
          (method) => method.id === selectedMethod
        )?.label || selectedMethod,
      date: new Date().toISOString(),
    };

    // Demo only — no real payment processing
    setMoneyDonations([...moneyDonations, newPayment]);

    setSuccessMsg(
      `Demo donation of ৳${donationAmount.toLocaleString(
        "en-BD"
      )} recorded successfully via ${newPayment.method}!`
    );

    setAmount("");
    setAccountNumber("");

    setTimeout(() => {
      setSuccessMsg("");
    }, 4000);
  }

  function formatDate(dateString) {
    if (!dateString) return "Not specified";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const inputStyle =
    "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300";

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            💚 Support Our Mission
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Donate Funds
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Support the FoodShare mission and help create
            a community where surplus food can reach
            people who need it.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-2 rounded-xl text-sm font-bold">
            ⚠️ Demo Payment System — No Real Transactions
          </div>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="grid sm:grid-cols-2 gap-5">

        {/* TOTAL AMOUNT */}
        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
              💰
            </div>

            <div>

              <p className="text-sm font-semibold text-gray-500">
                Total Demo Donations
              </p>

              <h3 className="mt-2 text-3xl font-extrabold text-green-800">
                ৳{totalAmount.toLocaleString("en-BD")}
              </h3>

            </div>

          </div>

        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
              📋
            </div>

            <div>

              <p className="text-sm font-semibold text-gray-500">
                Demo Transactions
              </p>

              <h3 className="mt-2 text-3xl font-extrabold text-green-800">
                {totalTransactions}
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">

        {/* DONATION FORM */}
        <div className="lg:col-span-2">

          <div className="bg-white border border-green-100 rounded-3xl shadow-sm overflow-hidden">

            {/* FORM HEADER */}
            <div className="p-7 sm:p-9 border-b border-gray-100">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
                  💚
                </div>

                <div>

                  <h3 className="text-2xl font-extrabold text-green-950">
                    Make a Fund Donation
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Complete the demo donation form below.
                  </p>

                </div>

              </div>

            </div>

            <div className="p-7 sm:p-9">

              {/* SUCCESS MESSAGE */}
              {successMsg && (
                <div
                  role="status"
                  className="mb-7 bg-green-50 border border-green-200 text-green-800 rounded-2xl p-5"
                >
                  <p className="font-bold">
                    ✅ {successMsg}
                  </p>

                  <p className="mt-2 text-xs">
                    This is a simulated donation.
                    No money was transferred.
                  </p>
                </div>
              )}

              <form
                onSubmit={handleConfirm}
                className="space-y-8"
              >

                {/* AMOUNT */}
                <div>

                  <h4 className="text-lg font-bold text-green-950 mb-5">
                    💰 Select Donation Amount
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                    {presetAmounts.map((preset) => (

                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(String(preset))}
                        aria-pressed={Number(amount) === preset}
                        className={`py-4 rounded-xl font-bold border-2 transition-all duration-300 ${
                          Number(amount) === preset
                            ? "bg-green-700 border-green-700 text-white shadow-md"
                            : "bg-green-50 border-green-100 text-green-800 hover:border-green-400"
                        }`}
                      >
                        ৳{preset}
                      </button>

                    ))}

                  </div>

                  <div className="mt-6">

                    <label
                      htmlFor="donationAmount"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Donation Amount (৳)
                      <span className="text-red-500"> *</span>
                    </label>

                    <input
                      id="donationAmount"
                      type="number"
                      min="1"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter your amount"
                      required
                      className={inputStyle}
                    />

                  </div>

                </div>

                <div className="border-t border-gray-100"></div>

                {/* PAYMENT METHODS */}
                <div>

                  <h4 className="text-lg font-bold text-green-950 mb-5">
                    💳 Select Payment Method
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                    {paymentMethods.map((method) => (

                      <button
                        key={method.id}
                        type="button"
                        onClick={() => {
                          setSelectedMethod(method.id);
                          setAccountNumber("");
                        }}
                        aria-pressed={selectedMethod === method.id}
                        className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                          selectedMethod === method.id
                            ? `${method.border} ${method.light} shadow-md`
                            : "border-gray-100 bg-gray-50 hover:border-green-200"
                        }`}
                      >

                        <div className={`w-12 h-12 ${method.color} text-white rounded-xl flex items-center justify-center text-2xl mx-auto`}>
                          {method.icon}
                        </div>

                        <p className="mt-3 text-sm font-bold text-gray-800">
                          {method.label}
                        </p>

                        {selectedMethod === method.id && (
                          <span className="absolute top-2 right-2 text-green-700 text-sm">
                            ✓
                          </span>
                        )}

                      </button>

                    ))}

                  </div>

                  <p className="mt-4 text-xs text-gray-500">
                    Payment methods are for demonstration only.
                  </p>

                </div>

                <div className="border-t border-gray-100"></div>

                {/* ACCOUNT DETAILS */}
                <div>

                  <h4 className="text-lg font-bold text-green-950 mb-5">
                    📝 Demo Payment Details
                  </h4>

                  <label
                    htmlFor="demoAccount"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {selectedMethod === "card"
                      ? "Demo Card Reference"
                      : "Demo Mobile Number"}
                  </label>

                  <input
                    id="demoAccount"
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder={
                      selectedMethod === "card"
                        ? "Enter a dummy reference (not a real card number)"
                        : "Enter a dummy reference (not a real phone number)"
                    }
                    className={inputStyle}
                  />

                  <p className="mt-3 text-xs text-amber-700">
                    ⚠️ Do not enter real card details,
                    phone numbers, PINs, or passwords.
                  </p>

                </div>

                {/* SUBMIT */}
                <div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-bold rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    💚 Confirm Demo Donation →
                  </button>

                  <p className="mt-4 text-center text-xs text-gray-400">
                    No real payment will be processed.
                  </p>

                </div>

              </form>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* IMPACT CARD */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-800 to-emerald-600 rounded-3xl p-7 text-white shadow-lg">

            <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative">

              <div className="text-4xl">
                🌱
              </div>

              <h3 className="mt-5 text-2xl font-extrabold">
                Every Contribution Matters
              </h3>

              <p className="mt-4 text-sm text-green-50/90 leading-7">
                FoodShare aims to reduce food waste
                and connect surplus food with
                communities in need.
              </p>

              <div className="mt-6 pt-5 border-t border-white/20">

                <p className="text-sm font-semibold">
                  Share Food. Spread Hope.
                </p>

              </div>

            </div>

          </div>

          {/* HOW IT WORKS */}
          <div className="bg-white border border-green-100 rounded-3xl p-7 shadow-sm">

            <h3 className="text-xl font-extrabold text-green-950">
              📋 How This Demo Works
            </h3>

            <div className="mt-6 space-y-5">

              <div className="flex items-start gap-3">

                <span className="w-8 h-8 shrink-0 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-sm">
                  1
                </span>

                <p className="text-sm text-gray-600 leading-6">
                  Choose a donation amount.
                </p>

              </div>

              <div className="flex items-start gap-3">

                <span className="w-8 h-8 shrink-0 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-sm">
                  2
                </span>

                <p className="text-sm text-gray-600 leading-6">
                  Select a demo payment method.
                </p>

              </div>

              <div className="flex items-start gap-3">

                <span className="w-8 h-8 shrink-0 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-sm">
                  3
                </span>

                <p className="text-sm text-gray-600 leading-6">
                  Confirm to save a simulated transaction.
                </p>

              </div>

            </div>

          </div>

          {/* SAFETY NOTICE */}
          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-7">

            <div className="text-3xl">
              ⚠️
            </div>

            <h3 className="mt-4 text-lg font-bold text-amber-900">
              Demo Payment Notice
            </h3>

            <p className="mt-3 text-sm text-amber-800 leading-7">
              This page does not connect to bKash,
              Nagad, Rocket, or any banking service.
              All transactions are simulated.
            </p>

          </div>

        </div>

      </div>

      {/* DONATION HISTORY */}
      <div className="bg-white border border-green-100 rounded-3xl shadow-sm overflow-hidden">

        <div className="p-7 sm:p-8 border-b border-gray-100">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
              📋
            </div>

            <div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
                Your Past Fund Donations
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                History of your simulated fund donations.
              </p>

            </div>

          </div>

        </div>

        {myMoneyDonations.length === 0 ? (

          <div className="p-10 sm:p-14 text-center">

            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-4xl mx-auto">
              💰
            </div>

            <h4 className="mt-5 text-xl font-bold text-green-950">
              No Demo Donations Yet
            </h4>

            <p className="mt-3 text-gray-500 text-sm">
              Your simulated fund donation records will appear here.
            </p>

          </div>

        ) : (

          <div className="p-5 sm:p-7 space-y-4">

            {[...myMoneyDonations].reverse().map((payment) => (

              <div
                key={payment.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 shrink-0 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                    💚
                  </div>

                  <div>

                    <p className="font-bold text-green-950">
                      {payment.method}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {formatDate(payment.date)}
                    </p>

                    <p className="mt-1 text-xs text-amber-700 font-medium">
                      Demo Transaction
                    </p>

                  </div>

                </div>

                <div className="sm:text-right">

                  <p className="text-xl font-extrabold text-green-700">
                    ৳{Number(payment.amount).toLocaleString("en-BD")}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Simulated amount
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default DonateFunds;