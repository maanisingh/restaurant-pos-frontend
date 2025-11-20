import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { kitchenAPI } from '../lib/api';
import { Clock, CheckCircle } from 'lucide-react';

export default function Kitchen() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['kitchen-orders'],
    queryFn: () => kitchenAPI.getOrders().then(res => res.data),
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      kitchenAPI.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kitchen-orders'] });
    },
  });

  if (isLoading) return <div className="loading">Loading kitchen orders...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Kitchen Display</h1>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280'}}>
          <Clock size={20} />
          <span>Auto-refresh: 5s</span>
        </div>
      </div>

      <div className="grid grid-3">
        {orders?.filter((order: any) => order.status !== 'completed')
          .map((order: any) => (
          <div key={order.id} className="card">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
              <h3 style={{fontSize: '1.5rem', fontWeight: '700'}}>Order #{order.id}</h3>
              <span className="badge badge-preparing">Table {order.table_number}</span>
            </div>

            <div style={{marginBottom: '1rem'}}>
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} style={{
                  padding: '0.75rem',
                  background: '#f9fafb',
                  borderRadius: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontWeight: '600'}}>{item.name}</span>
                    <span>x{item.quantity}</span>
                  </div>
                  {item.notes && (
                    <p style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem'}}>
                      Note: {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div style={{display: 'flex', gap: '0.5rem'}}>
              {order.status === 'pending' && (
                <button
                  className="btn btn-primary"
                  style={{flex: 1}}
                  onClick={() => updateStatus.mutate({ id: order.id, status: 'preparing' })}
                >
                  Start Preparing
                </button>
              )}
              {order.status === 'preparing' && (
                <button
                  className="btn btn-success"
                  style={{flex: 1}}
                  onClick={() => updateStatus.mutate({ id: order.id, status: 'ready' })}
                >
                  <CheckCircle size={20} />
                  Mark Ready
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {orders?.filter((order: any) => order.status !== 'completed').length === 0 && (
        <div style={{textAlign: 'center', padding: '4rem', color: '#6b7280'}}>
          <p style={{fontSize: '1.25rem'}}>No pending orders</p>
        </div>
      )}
    </div>
  );
}
