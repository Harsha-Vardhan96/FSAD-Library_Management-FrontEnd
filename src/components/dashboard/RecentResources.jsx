import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceCard } from './ResourceCard';
import { Button, Skeleton, EmptyState, ErrorState } from '../ui';

export const RecentResources = ({ pdfs = [], isLoading, error }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Recent Resources</h2>
          <p className="text-xs text-text-gray">Explore newly added publications, research papers, and documents</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('/judicial-resources')}>
          View All
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
        </div>
      ) : error ? (
        <ErrorState message={error} />
      ) : pdfs.length === 0 ? (
        <EmptyState
          title="No recent resources found"
          description="There are currently no uploaded PDF documents in the digital repository."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pdfs.slice(0, 6).map((pdf) => (
            <ResourceCard key={pdf.id} resource={pdf} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentResources;
