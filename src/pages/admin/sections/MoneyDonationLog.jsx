import { useAuth } from "../../../context/AuthContext";
import { Icon } from "../../../components/LiveStats";

// পেমেন্ট মেথড অনুযায়ী ছোট রঙিন ব্যাজ
const METHOD_STYLE = {
  bKash: "bg-[#FFD9E8] text-[#B0124F]",
  Nagad: "bg-[#FFE0CC] text-[#C2490A]",
  Rocket: "bg-[#EBDDFF] text-[#6B2FB3]",
  Card: "bg-[#D9EAFF] text-[#1D5FB8]",
};

function MoneyDonationLog() {
  const { moneyDonations, users } = useAuth();

  function getDonorName(id) {
    const donor = users.find((u) => u.id === id);
    return donor ? donor.name : "Unknown";
  }

  const total = moneyDonations.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="bg-[#0F2E22] rounded-2xl px-6 py-5 flex items-center gap-4 min-w-[16rem]">
          <span className="w-12 h-12 rounded-full bg-[#F2B01E] text-[#0F2E22] flex items-center justify-center">
            <Icon name="wallet" className="w-6 h-6" />
          </span>
          <div>
            <p className="text-sm text-[#A9BFB0]">Total collected</p>
            <p className="text-3xl font-bold text-[#F2B01E] tabular-nums leading-tight">
              ৳{total.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#0F2E22]/10 shadow-sm px-6 py-5 min-w-[10rem]">
          <p className="text-sm text-[#3B4F43]">Payments</p>
          <p className="text-3xl font-bold text-[#0F2E22] tabular-nums leading-tight">{moneyDonations.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#0F2E22]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#FFF6DB] text-[#5A4300] text-left">
              <tr>
                <th className="p-3.5 font-semibold">Donor</th>
                <th className="p-3.5 font-semibold">Method</th>
                <th className="p-3.5 font-semibold">Amount</th>
                <th className="p-3.5 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {moneyDonations.map((p) => (
                <tr key={p.id} className="border-t border-[#0F2E22]/10 hover:bg-[#F6F7F2]">
                  <td className="p-3.5 font-medium">{getDonorName(p.donorId)}</td>
                  <td className="p-3.5">
                    <span
                      className={`text-xs font-semibold rounded-full px-2.5 py-1 ${
                        METHOD_STYLE[p.method] || "bg-[#ECE4C8] text-[#5A4300]"
                      }`}
                    >
                      {p.method}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-[#0F2E22] tabular-nums">৳{p.amount.toLocaleString()}</td>
                  <td className="p-3.5 text-[#3B4F43]">{new Date(p.date).toLocaleDateString()}</td>
                </tr>
              ))}
              {moneyDonations.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[#3B4F43]">
                    No fund donations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MoneyDonationLog;