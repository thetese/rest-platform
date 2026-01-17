import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Layout from '../components/Layout';
import MetricCard from '../components/MetricCard';
import OrderCard from '../components/OrderCard';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Home() {
  const { data: profit } = useQuery({
    queryKey: ['profit'],
    queryFn: async () => (await axios.get(`${apiUrl}/reports/profit?branchId=demo-branch`)).data,
  });
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => (await axios.get(`${apiUrl}/orders?branchId=demo-branch`)).data,
  });

  return (
    <Layout title="Operations Dashboard">
      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Revenue" value={`$${profit?.revenue ?? 0}`} description="Gross sales" />
        <MetricCard label="COGS" value={`$${profit?.cogs ?? 0}`} description="Ingredients consumed" />
        <MetricCard label="Gross Profit" value={`$${profit?.grossProfit ?? 0}`} />
        <MetricCard label="Net Profit" value={`$${profit?.netProfit ?? 0}`} description="After expenses" />
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Live Orders</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {(orders || []).map((order: any) => (
            <OrderCard
              key={order.id}
              id={order.id}
              tableNo={order.tableNo}
              status={order.status}
              total={Number(order.total)}
              items={order.items.map((item: any) => ({ name: item.name, quantity: item.quantity }))}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
