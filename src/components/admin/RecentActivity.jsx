import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Skeleton, EmptyState, ErrorState } from '../ui';

export const RecentActivity = ({ activities, loading, error, onRefresh }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <CardTitle>System Audit Log</CardTitle>
          <p className="text-xs text-text-gray mt-0.5">Real-time administrator and user action history</p>
        </div>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={onRefresh} />
      ) : activities.length === 0 ? (
        <EmptyState title="No recent activity logs" description="System audit records will appear here as users perform actions." />
      ) : (
        <div className="space-y-3">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-center justify-between p-3.5 rounded-lg bg-slate-950/40 border border-border-color/40 hover:border-border-color transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Badge
                  variant={act.action === 'Added' ? 'success' : act.action === 'Deleted' ? 'danger' : 'info'}
                  size="sm"
                >
                  {act.action || 'Event'}
                </Badge>
                <div>
                  <p className="text-xs font-semibold text-text-dark">{act.details || act.action}</p>
                  <p className="text-[10px] text-text-gray">By: {act.user || 'System'}</p>
                </div>
              </div>
              <span className="text-[10px] text-text-gray font-mono">{act.timestamp || 'Recent'}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
