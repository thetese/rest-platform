import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function KdsPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    setOrders([
      { id: 'demo-1', status: 'PREPARING', items: ['Burger x1', 'Fries x2'] },
    ]);
  }, []);

  return (
    <Layout title="Kitchen Display">
      <div className="grid gap-4 md:grid-cols-2">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold">Order {order.id}</h3>
            <p className="text-xs text-slate-500">Status: {order.status}</p>
            <ul className="mt-3 text-sm text-slate-600">
              {order.items.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button className="mt-4 rounded bg-green-600 px-3 py-2 text-xs text-white">
              Mark Ready
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
