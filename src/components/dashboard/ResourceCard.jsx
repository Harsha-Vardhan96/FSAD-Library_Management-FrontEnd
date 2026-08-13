import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Badge, Button } from '../ui';

export const ResourceCard = ({ resource }) => {
  const navigate = useNavigate();
  if (!resource) return null;

  return (
    <Card hoverable className="flex flex-col justify-between h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="primary" size="sm">
            {resource.category || 'General'}
          </Badge>
          <span className="text-[10px] text-text-gray font-mono">
            {resource.uploadDate || 'Recent'}
          </span>
        </div>
        <CardTitle className="line-clamp-1">{resource.title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-1">
          {resource.description || 'No description provided for this resource.'}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <span className="text-xs text-text-gray truncate max-w-[140px]" title={resource.fileName}>
          📄 {resource.fileName}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/resource/${resource.id}`)}
        >
          View PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
