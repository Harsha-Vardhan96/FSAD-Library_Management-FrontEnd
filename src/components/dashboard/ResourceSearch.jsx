import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../ui';

export const ResourceSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2 max-w-xl mx-auto pt-2">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search books, documents, subjects (e.g. "Machine Learning", "Constitutional Law")...'
        className="bg-slate-900/90 border-border-color"
      />
      <Button type="submit" variant="primary" size="md">
        Search
      </Button>
    </form>
  );
};

export default ResourceSearch;
