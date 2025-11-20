import { useQuery } from '@tanstack/react-query';
import { statsAPI } from '../lib/api';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: () => statsAPI.getDashboard().then(res => res.data),
  });

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="grid grid-2">
        <div className="stat-card">
          <DollarSign size={40} />
          <div className="stat-value">${stats?.totalRevenue || 0}</div>
          <div className="stat-label">Total Revenue</div>
        </div>

        <div className="stat-card" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
          <ShoppingCart size={40} />
          <div className="stat-value">{stats?.totalOrders || 0}</div>
          <div className="stat-label">Total Orders</div>
        </div>

        <div className="stat-card" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
          <Users size={40} />
          <div className="stat-value">{stats?.activeOrders || 0}</div>
          <div className="stat-label">Active Orders</div>
        </div>

        <div className="stat-card" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
          <TrendingUp size={40} />
          <div className="stat-value">${stats?.averageOrder || 0}</div>
          <div className="stat-label">Average Order</div>
        </div>
      </div>
    </div>
  );
}
