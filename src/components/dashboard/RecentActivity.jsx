import React from 'react';
import { Card, CardContent, Badge, Skeleton, EmptyState } from '../ui';

export const RecentActivity = ({ activities = [], isLoading }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Recent Platform Activity</h2>
        <p className="text-xs text-text-gray">Real-time audit log of library additions, updates, and interactions</p>
      </div>

      <Card>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
            </div>
          ) : activities.length === 0 ? (
            <EmptyState title="No recent activity logs recorded" description="Platform events will appear here as users access and modify resources." />
          ) : (
            activities.slice(0, 5).map((act, idx) => (
              <div key={act.id || idx} className="flex items-center justify-between border-b border-border-color/40 pb-3 last:border-none last:pb-0">
                <div className="flex items-center space-x-3">
                  <Badge variant={act.action === 'Added' ? 'success' : act.action === 'Deleted' ? 'danger' : 'info'} size="sm">
                    {act.action || 'Event'}
                  </Badge>
                  <div>
                    <p className="text-xs font-semibold text-text-dark">{act.target || act.details}</p>
                    <p className="text-[10px] text-text-gray">{act.details}</p>
                  </div>
                </div>
                <span className="text-[10px] text-text-gray font-mono">{act.when || act.timestamp || 'Recent'}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivity;
