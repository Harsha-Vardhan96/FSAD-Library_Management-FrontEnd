import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePDF } from '../../context/PDFContext';
import { CATEGORIES } from '../../constants/categories';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Badge,
  Skeleton,
  EmptyState,
  ErrorState,
} from '../../components/ui';

export const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pdfs, loading: pdfsLoading, error: pdfsError } = usePDF();

  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || queryParams.get('query') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Debounce search term changes (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchTerm.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Sync initial query from URL search params
  useEffect(() => {
    setSearchTerm(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [location.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setDebouncedQuery('');
    navigate('/search');
  };

  // Filter and Sort PDF results
  const filteredResults = useMemo(() => {
    if (!Array.isArray(pdfs)) return [];

    let result = [...pdfs];

    // 1. Keyword filter
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter((pdf) => {
        const title = (pdf.title || '').toLowerCase();
        const cat = (pdf.category || '').toLowerCase();
        const sub = (pdf.subdomain || '').toLowerCase();
        const subSub = (pdf.subSubdomain || '').toLowerCase();
        const desc = (pdf.description || '').toLowerCase();
        const file = (pdf.fileName || '').toLowerCase();
        return (
          title.includes(q) ||
          cat.includes(q) ||
          sub.includes(q) ||
          subSub.includes(q) ||
          desc.includes(q) ||
          file.includes(q)
        );
      });
    }

    // 2. Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(
        (pdf) => (pdf.category || '').toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return (b.id || 0) - (a.id || 0);
      }
      if (sortBy === 'oldest') {
        return (a.id || 0) - (b.id || 0);
      }
      if (sortBy === 'title-asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'title-desc') {
        return (b.title || '').localeCompare(a.title || '');
      }
      return 0;
    });

    return result;
  }, [pdfs, debouncedQuery, selectedCategory, sortBy]);

  const categoryOptions = Object.values(CATEGORIES);

  return (
    <div className="flex flex-col w-full min-h-screen bg-bg-light text-text-dark font-sans">
      {/* Utility Navigation Header */}
      <header className="z-[1050] bg-slate-950/90 border-b border-border-color/60 px-4 md:px-8 py-3 flex justify-between items-center text-xs sticky top-0 backdrop-blur-md">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </Button>

        <div className="flex items-center space-x-2">
          <Badge variant="primary" size="sm">
            Search Discovery Terminal
          </Badge>
        </div>
      </header>

      {/* Main Search & Results Content */}
      <main className="flex-1 px-4 md:px-8 py-8 max-w-6xl mx-auto w-full space-y-8">
        {/* Search Header Banner */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">Repository Search</h1>
            <p className="text-xs text-text-gray mt-1">
              Search across academic books, research papers, legal acts, and historical documents.
            </p>
          </div>

          {/* Search Bar Input */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative flex-1">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, subject, category, or file name..."
                className="bg-slate-900/90 pr-10"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-gray hover:text-white transition-colors text-sm"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <Button type="submit" variant="primary" size="md">
              Search
            </Button>
          </form>
        </div>

        {/* Filter and Sorting Controls Bar */}
        <Card className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-text-gray mb-1">
                Category Filter
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-border-color bg-slate-950 text-text-dark px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Categories ({pdfs.length})</option>
                {categoryOptions.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-text-gray mb-1">
                Sort Order
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-border-color bg-slate-950 text-text-dark px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title A - Z</option>
                <option value="title-desc">Title Z - A</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-text-gray font-mono">
            Showing <span className="font-bold text-white">{filteredResults.length}</span> matching resources
          </div>
        </Card>

        {/* Results Grid / Loading / Empty States */}
        {pdfsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-44" />
            <Skeleton className="h-44" />
            <Skeleton className="h-44" />
          </div>
        ) : pdfsError ? (
          <ErrorState message={pdfsError} />
        ) : filteredResults.length === 0 ? (
          <EmptyState
            title="No matching resources found"
            description={
              debouncedQuery
                ? `No documents match your query "${debouncedQuery}". Try refining your search keywords or clearing filters.`
                : 'No resources found for the selected category filter.'
            }
            action={
              (debouncedQuery || selectedCategory !== 'all') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleClear();
                    setSelectedCategory('all');
                  }}
                >
                  Reset Filters
                </Button>
              )
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((pdf) => (
              <Card key={pdf.id} hoverable className="flex flex-col justify-between h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="primary" size="sm">
                      {pdf.category || 'General'}
                    </Badge>
                    <span className="text-[10px] text-text-gray font-mono">
                      {pdf.uploadDate || 'Recent'}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">{pdf.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">
                    {pdf.description || 'No description provided for this resource.'}
                  </CardDescription>
                </CardHeader>

                <CardFooter>
                  <span className="text-xs text-text-gray truncate max-w-[140px]" title={pdf.fileName}>
                    📄 {pdf.fileName}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/resource/${pdf.id}`)}
                  >
                    View Resource
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
