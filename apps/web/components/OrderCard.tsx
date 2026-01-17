interface OrderCardProps {
  id: string;
  tableNo?: string;
  status: string;
  total: number;
  items: { name: string; quantity: number }[];
}

export default function OrderCard({ id, tableNo, status, total, items }: OrderCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Order #{id.slice(0, 6)}</p>
          <p className="text-xs text-slate-500">{tableNo ? `Table ${tableNo}` : 'Takeaway'}</p>
        </div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {status}
        </span>
      </div>
      <ul className="mt-3 space-y-1 text-sm text-slate-600">
        {items.map((item) => (
          <li key={`${id}-${item.name}`} className="flex justify-between">
            <span>{item.name}</span>
            <span>x{item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 border-t pt-3 text-right text-sm font-semibold">
        ${total.toFixed(2)}
      </div>
    </div>
  );
}
