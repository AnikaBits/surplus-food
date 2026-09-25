function StatusBadge({ status }) {
  const statusStyles = {
    available: "bg-green-100 text-green-700",
    requested: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    picked_up: "bg-purple-100 text-purple-700",
    on_the_way: "bg-indigo-100 text-indigo-700",
    delivered: "bg-gray-200 text-gray-700",
    pending: "bg-orange-100 text-orange-700",
    blocked: "bg-red-100 text-red-700",
  };

  const statusLabels = {
    available: "Available",
    requested: "Requested",
    approved: "Approved",
    picked_up: "Picked Up",
    on_the_way: "On the Way",
    delivered: "Delivered",
    pending: "Pending",
    blocked: "Blocked",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}

export default StatusBadge;