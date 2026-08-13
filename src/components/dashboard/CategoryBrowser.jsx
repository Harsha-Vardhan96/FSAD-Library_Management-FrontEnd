import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../constants/categories';
import { Card, Badge } from '../ui';

export const CategoryBrowser = () => {
  const navigate = useNavigate();
  const categoryList = Object.values(CATEGORIES);

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="warning" size="sm" className="mb-2">
          Catalog Directory
        </Badge>
        <h2 className="text-2xl font-bold text-white tracking-tight">Browse Knowledge Domains</h2>
        <p className="text-xs text-text-gray">Access specialized sub-repositories and curated archives</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryList.map((cat) => (
          <Card
            key={cat.id}
            hoverable
            onClick={() => navigate(`/${cat.id}-resources`)}
            className="cursor-pointer flex flex-col justify-between h-64 p-5 border-border-color hover:border-cyan-500/50"
          >
            <div>
              <span className="text-3xl mb-3 block">{cat.badgeIcon || '📚'}</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{cat.name}</h3>
              <p className="text-xs text-text-gray line-clamp-2">{cat.headerSubtitle}</p>
            </div>

            <div className="pt-4 border-t border-border-color/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                Explore Domain →
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryBrowser;
