import React from 'react';
import { Card, Badge } from '../ui';

export const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} hoverable className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl p-2.5 rounded-xl bg-slate-950/60 border border-border-color/60">
              {stat.icon}
            </span>
            <Badge variant={stat.variant || 'primary'} size="sm">
              Live Metric
            </Badge>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-gray uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
