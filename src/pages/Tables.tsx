import { useQuery } from '@tanstack/react-query';
import { tablesAPI } from '../lib/api';

export default function Tables() {
  const { data: tables, isLoading } = useQuery({
    queryKey: ['tables'],
    queryFn: () => tablesAPI.getAll().then(res => res.data),
  });

  if (isLoading) return <div className="loading">Loading tables...</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return { background: '#d1fae5', color: '#065f46' };
      case 'occupied':
        return { background: '#fee2e2', color: '#991b1b' };
      case 'reserved':
        return { background: '#fef3c7', color: '#92400e' };
      default:
        return { background: '#e5e7eb', color: '#374151' };
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Tables</h1>
      </div>

      <div className="grid grid-4">
        {tables?.map((table: any) => (
          <div
            key={table.id}
            className="card"
            style={{
              ...getStatusColor(table.status),
              border: table.status === 'occupied' ? '2px solid #dc2626' : 'none',
            }}
          >
            <div style={{textAlign: 'center'}}>
              <h2 style={{fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem'}}>
                Table {table.table_number}
              </h2>
              <p style={{fontSize: '1rem', marginBottom: '0.5rem'}}>
                Capacity: {table.capacity} people
              </p>
              <span className={`badge ${
                table.status === 'available' ? 'badge-ready' :
                table.status === 'occupied' ? 'badge-pending' :
                'badge-preparing'
              }`}>
                {table.status.toUpperCase()}
              </span>
              {table.current_order_id && (
                <p style={{marginTop: '1rem', fontSize: '0.875rem'}}>
                  Order #{table.current_order_id}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
