import React from 'react';
import { Card } from '../ui';

export const ResourceOverview = ({ totalResources, categoriesCount, activitiesCount, isLoading }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4 flex flex-col justify-center">
        <span className="text-xs text-text-gray font-semibold uppercase tracking-wider">Available Resources</span>
        <span className="text-2xl font-bold text-cyan-400 mt-1">{isLoading ? '...' : totalResources}</span>
      </Card>

      <Card className="p-4 flex flex-col justify-center">
        <span className="text-xs text-text-gray font-semibold uppercase tracking-wider">Knowledge Domains</span>
        <span className="text-2xl font-bold text-teal-400 mt-1">{categoriesCount}</span>
      </Card>

      <Card className="p-4 flex flex-col justify-center">
        <span className="text-xs text-text-gray font-semibold uppercase tracking-wider">Audit Logs</span>
        <span className="text-2xl font-bold text-amber-400 mt-1">{isLoading ? '...' : activitiesCount}</span>
      </Card>

      <Card className="p-4 flex flex-col justify-center">
        <span className="text-xs text-text-gray font-semibold uppercase tracking-wider">Platform Status</span>
        <div className="flex items-center space-x-2 mt-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-sm font-semibold text-emerald-400">Operational</span>
        </div>
      </Card>
    </div>
  );
};

export default ResourceOverview;
