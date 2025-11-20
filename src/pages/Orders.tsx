import { useQuery } from '@tanstack/react-query';
import { ordersAPI } from '../lib/api';
import { Plus } from 'lucide-react';

export default function Orders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersAPI.getAll().then(res => res.data),
  });

  if (isLoading) return <div className="loading">Loading orders...</div>;

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'badge-pending',
      preparing: 'badge-preparing',
      ready: 'badge-ready',
      completed: 'badge-completed',
    };
    return statusMap[status] || 'badge-pending';
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Orders</h1>
        <button className="btn btn-primary">
          <Plus size={20} />
          New Order
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Table</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order: any) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>Table {order.table_number}</td>
                <td>{order.items?.length || 0} items</td>
                <td>${order.total_amount}</td>
                <td>
                  <span className={`badge ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.created_at).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
