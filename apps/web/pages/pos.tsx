import { FormEvent, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function PosPage() {
  const [status, setStatus] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      branchId: 'demo-branch',
      type: formData.get('type'),
      tableNo: formData.get('tableNo') || undefined,
      items: [
        {
          menuItemId: 'demo-item',
          quantity: Number(formData.get('quantity')),
        },
      ],
      discount: Number(formData.get('discount')) || 0,
    };
    const response = await axios.post(`${apiUrl}/orders`, payload);
    setStatus(`Created order ${response.data.id}`);
  };

  return (
    <Layout title="Point of Sale">
      <div className="max-w-xl rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Quick Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Order Type</label>
            <select name="type" className="mt-1 w-full rounded border px-3 py-2">
              <option value="dine-in">Dine-in</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Table No (optional)</label>
            <input name="tableNo" className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input name="quantity" type="number" defaultValue={1} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Discount</label>
            <input name="discount" type="number" defaultValue={0} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <button className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700" type="submit">
            Create Order
          </button>
        </form>
        {status && <p className="mt-4 text-sm text-green-600">{status}</p>}
      </div>
    </Layout>
  );
}
