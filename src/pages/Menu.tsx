import { useQuery } from '@tanstack/react-query';
import { menuAPI } from '../lib/api';
import { Plus } from 'lucide-react';

export default function Menu() {
  const { data: items, isLoading } = useQuery({
    queryKey: ['menu'],
    queryFn: () => menuAPI.getItems().then(res => res.data),
  });

  if (isLoading) return <div className="loading">Loading menu...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Menu Items</h1>
        <button className="btn btn-primary">
          <Plus size={20} />
          Add Item
        </button>
      </div>

      <div className="grid grid-4">
        {items?.map((item: any) => (
          <div key={item.id} className="card">
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>
              {item.name}
            </h3>
            <p style={{color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem'}}>
              {item.description}
            </p>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontSize: '1.5rem', fontWeight: '700', color: '#4f46e5'}}>
                ${item.price}
              </span>
              <span className={`badge ${item.available ? 'badge-ready' : 'badge-pending'}`}>
                {item.available ? 'Available' : 'Out of Stock'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
