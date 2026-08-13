import React, { useState } from 'react';
import { usePDF } from '../context/PDFContext';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, Modal, Badge, Skeleton, EmptyState, ErrorState } from './ui';

const AdminPDFManager = ({ onActivityChange }) => {
  const { pdfs, loading: pdfsLoading, error: pdfsError, addPDF, removePDF, getPDFsByNestedPath } = usePDF();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const categories = [
    {
      value: 'cultural',
      label: 'Cultural Archives',
      subdomains: [
        { value: 'content-providers', label: 'Content Providers', subSubdomains: [{ value: 'museums', label: 'Museums' }, { value: 'galleries', label: 'Galleries' }, { value: 'archives', label: 'Archives' }, { value: 'libraries', label: 'Libraries' }] },
        { value: 'resource-types', label: 'Resource Types', subSubdomains: [{ value: 'heritage', label: 'Heritage' }, { value: 'history', label: 'History' }, { value: 'art', label: 'Art' }, { value: 'music', label: 'Music' }] },
        { value: 'languages', label: 'Languages', subSubdomains: [{ value: 'hindi', label: 'Hindi' }, { value: 'english', label: 'English' }, { value: 'sanskrit', label: 'Sanskrit' }, { value: 'regional', label: 'Regional Languages' }] },
      ],
    },
    {
      value: 'judicial',
      label: 'Judicial Resources',
      subdomains: [
        { value: 'content-providers', label: 'Content Providers', subSubdomains: [{ value: 'supreme-court', label: 'Supreme Court' }, { value: 'high-courts', label: 'High Courts' }, { value: 'district-courts', label: 'District Courts' }] },
        { value: 'resource-types', label: 'Resource Types', subSubdomains: [{ value: 'case-law', label: 'Case Law' }, { value: 'legal-research', label: 'Legal Research' }, { value: 'judgments', label: 'Judgments' }] },
        { value: 'case-types', label: 'Case Types', subSubdomains: [{ value: 'civil', label: 'Civil Law' }, { value: 'criminal', label: 'Criminal Law' }, { value: 'constitutional', label: 'Constitutional Law' }] },
      ],
    },
    {
      value: 'school',
      label: 'School Education',
      subdomains: [
        { value: 'educational-boards', label: 'Educational Boards', subSubdomains: [{ value: 'cbse', label: 'CBSE' }, { value: 'icse', label: 'ICSE' }, { value: 'state-boards', label: 'State Boards' }] },
        { value: 'educational-levels', label: 'Educational Levels', subSubdomains: [{ value: 'class-x', label: 'Class X' }, { value: 'class-xii', label: 'Class XII' }, { value: 'jee-prep', label: 'JEE Preparatory' }] },
        { value: 'subjects', label: 'Subjects', subSubdomains: [{ value: 'physics', label: 'Physics' }, { value: 'chemistry', label: 'Chemistry' }, { value: 'mathematics', label: 'Mathematics' }] },
      ],
    },
    {
      value: 'higher',
      label: 'Higher Education',
      subdomains: [
        { value: 'subjects', label: 'Subjects', subSubdomains: [{ value: 'engineering', label: 'Engineering' }, { value: 'management', label: 'Management' }, { value: 'science', label: 'Science' }] },
        { value: 'resource-types', label: 'Resource Types', subSubdomains: [{ value: 'papers', label: 'Research Papers' }, { value: 'thesis', label: 'Thesis' }, { value: 'books', label: 'Books' }] },
      ],
    },
    {
      value: 'research',
      label: 'Research Resources',
      subdomains: [
        { value: 'subjects', label: 'Subjects', subSubdomains: [{ value: 'science', label: 'Science' }, { value: 'technology', label: 'Technology' }, { value: 'medicine', label: 'Medicine' }] },
        { value: 'resource-types', label: 'Resource Types', subSubdomains: [{ value: 'articles', label: 'Articles' }, { value: 'datasets', label: 'Datasets' }, { value: 'reports', label: 'Reports' }] },
      ],
    },
    {
      value: 'career',
      label: 'Career Development',
      subdomains: [
        { value: 'examinations', label: 'Examinations', subSubdomains: [{ value: 'upsc', label: 'UPSC' }, { value: 'ssc', label: 'SSC' }, { value: 'banking', label: 'Banking' }] },
      ],
    },
    {
      value: 'newspaper',
      label: 'Newspaper Archives',
      subdomains: [
        { value: 'content-providers', label: 'Content Providers', subSubdomains: [{ value: 'national', label: 'National Press' }, { value: 'regional', label: 'Regional Press' }] },
      ],
    },
    {
      value: 'patents',
      label: 'Patents & Standards',
      subdomains: [
        { value: 'cpc-classification', label: 'CPC Classification', subSubdomains: [{ value: 'tech', label: 'Technology' }, { value: 'pharma', label: 'Pharmaceutical' }] },
      ],
    },
  ];

  const getCategory = (categoryValue) => categories.find((cat) => cat.value === categoryValue);
  const getDefaultSubdomain = (categoryValue) => {
    const category = getCategory(categoryValue);
    return category?.subdomains?.[0]?.value || '';
  };
  const getDefaultSubSubdomain = (categoryValue, subdomainValue) => {
    const category = getCategory(categoryValue);
    const subdomain = category?.subdomains?.find((item) => item.value === subdomainValue);
    return subdomain?.subSubdomains?.[0]?.value || '';
  };

  const defaultCategory = categories[0].value;
  const defaultSubdomain = getDefaultSubdomain(defaultCategory);
  const defaultSubSubdomain = getDefaultSubSubdomain(defaultCategory, defaultSubdomain);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: defaultCategory,
    subdomain: defaultSubdomain,
    subSubdomain: defaultSubSubdomain,
    file: null,
  });
  const [filter, setFilter] = useState({
    category: defaultCategory,
    subdomain: '',
    subSubdomain: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  const selectedCategory = getCategory(formData.category);
  const selectedFilterCategory = getCategory(filter.category);
  const availableSubdomains = selectedCategory?.subdomains || [];
  const availableFilterSubdomains = selectedFilterCategory?.subdomains || [];
  const selectedSubdomain = availableSubdomains.find((item) => item.value === formData.subdomain);
  const selectedFilterSubdomain = availableFilterSubdomains.find((item) => item.value === filter.subdomain);
  const availableSubSubdomains = selectedSubdomain?.subSubdomains || [];
  const availableFilterSubSubdomains = selectedFilterSubdomain?.subSubdomains || [];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please select a valid PDF document (.pdf)');
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }
      setError('');
      setFormData({ ...formData, file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim()) {
      setError('Please enter a document title');
      return;
    }

    if (!formData.file) {
      setError('Please select a PDF file');
      return;
    }

    if (!formData.subdomain || !formData.subSubdomain) {
      setError('Please select both subdomain and sub-subdomain');
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const fileBase64 = event.target.result;
          await addPDF({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            subdomain: formData.subdomain,
            subSubdomain: formData.subSubdomain,
            file: fileBase64,
            fileName: formData.file.name,
          });

          setSuccess(`"${formData.title}" uploaded successfully!`);
          const nextSubdomain = getDefaultSubdomain(defaultCategory);
          const nextSubSubdomain = getDefaultSubSubdomain(defaultCategory, nextSubdomain);
          setFormData({
            title: '',
            description: '',
            category: defaultCategory,
            subdomain: nextSubdomain,
            subSubdomain: nextSubSubdomain,
            file: null,
          });
          setTimeout(() => {
            setSuccess('');
            setShowUploadModal(false);
            onActivityChange?.();
          }, 1500);
        } catch (err) {
          setError(err.message || 'Error uploading PDF file. Please try again.');
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(formData.file);
    } catch (err) {
      setError('Error reading PDF file. Please try again.');
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource from the digital repository?')) {
      try {
        await removePDF(id);
        onActivityChange?.();
      } catch (err) {
        setError('Error deleting PDF. Please try again.');
      }
    }
  };

  const filteredPDFs = getPDFsByNestedPath({
    category: filter.category,
    subdomain: filter.subdomain,
    subSubdomain: filter.subSubdomain,
  });

  const resetFilterSubdomain = (categoryValue) => {
    setFilter({ category: categoryValue, subdomain: '', subSubdomain: '' });
  };

  return (
    <div className="space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Resource Management</h2>
          <p className="text-xs text-text-gray">Upload, organize, and manage PDF publications across domains</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setShowUploadModal(true)}>
          + Upload New PDF
        </Button>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload PDF Resource"
        description="Select category, metadata, and PDF payload (max 50MB)"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-xs text-red-400 font-semibold">{error}</p>}
          {success && <p className="text-xs text-emerald-400 font-semibold">{success}</p>}

          <Input
            label="Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Supreme Court Judgment 2024"
          />

          <div className="w-full space-y-1.5">
            <label className="block text-xs font-semibold text-text-gray tracking-wider uppercase">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief summary of document content..."
              className="w-full rounded-lg border border-border-color bg-slate-900/60 text-text-dark px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-text-gray tracking-wider uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => {
                  const nextCategory = e.target.value;
                  const nextSubdomain = getDefaultSubdomain(nextCategory);
                  const nextSubSubdomain = getDefaultSubSubdomain(nextCategory, nextSubdomain);
                  setFormData({
                    ...formData,
                    category: nextCategory,
                    subdomain: nextSubdomain,
                    subSubdomain: nextSubSubdomain,
                  });
                }}
                className="w-full rounded-lg border border-border-color bg-slate-900/60 text-text-dark px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-gray tracking-wider uppercase mb-1">Subdomain</label>
              <select
                value={formData.subdomain}
                onChange={(e) => {
                  const nextSubdomain = e.target.value;
                  const nextSubSubdomain = getDefaultSubSubdomain(formData.category, nextSubdomain);
                  setFormData({
                    ...formData,
                    subdomain: nextSubdomain,
                    subSubdomain: nextSubSubdomain,
                  });
                }}
                className="w-full rounded-lg border border-border-color bg-slate-900/60 text-text-dark px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {availableSubdomains.map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-gray tracking-wider uppercase mb-1">Sub-subdomain</label>
            <select
              value={formData.subSubdomain}
              onChange={(e) => setFormData({ ...formData, subSubdomain: e.target.value })}
              className="w-full rounded-lg border border-border-color bg-slate-900/60 text-text-dark px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {availableSubSubdomains.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-gray tracking-wider uppercase mb-1">PDF File</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full text-xs text-text-gray file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
            />
            {formData.file && (
              <p className="text-xs text-emerald-400 font-semibold mt-1">✓ {formData.file.name}</p>
            )}
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={uploading}>
              Upload PDF
            </Button>
          </div>
        </form>
      </Modal>

      {/* Filter and PDF List Card */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>Repository Directory</CardTitle>
            <p className="text-xs text-text-gray mt-0.5">Filter uploaded resources by nested domain structure</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 w-full max-w-2xl">
            <div>
              <label className="block text-[10px] font-bold text-text-gray uppercase tracking-wider mb-1">Category</label>
              <select
                value={filter.category}
                onChange={(e) => resetFilterSubdomain(e.target.value)}
                className="w-full rounded-lg border border-border-color bg-slate-900 text-text-dark px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-text-gray uppercase tracking-wider mb-1">Subdomain</label>
              <select
                value={filter.subdomain}
                onChange={(e) => setFilter({ ...filter, subdomain: e.target.value, subSubdomain: '' })}
                className="w-full rounded-lg border border-border-color bg-slate-900 text-text-dark px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Subdomains</option>
                {availableFilterSubdomains.map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-text-gray uppercase tracking-wider mb-1">Sub-subdomain</label>
              <select
                value={filter.subSubdomain}
                onChange={(e) => setFilter({ ...filter, subSubdomain: e.target.value })}
                className="w-full rounded-lg border border-border-color bg-slate-900 text-text-dark px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={!availableFilterSubSubdomains.length}
              >
                <option value="">All Sub-subdomains</option>
                {availableFilterSubSubdomains.map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="text-xs text-text-gray">
          Showing <span className="font-bold text-white">{filteredPDFs.length}</span> of <span className="font-bold text-white">{pdfs.length}</span> uploaded PDFs.
        </div>

        {pdfsLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        ) : pdfsError ? (
          <ErrorState message={pdfsError} />
        ) : filteredPDFs.length === 0 ? (
          <EmptyState
            title="No PDFs match filter"
            description="There are currently no uploaded PDF resources matching your selected domain filters."
          />
        ) : (
          <div className="space-y-3">
            {filteredPDFs.map((pdf) => (
              <div
                key={pdf.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-border-color/40 hover:border-border-color transition-colors gap-3"
              >
                <div className="space-y-1 overflow-hidden">
                  <div className="flex items-center space-x-2">
                    <Badge variant="primary" size="sm">
                      {categories.find((cat) => cat.value === pdf.category)?.label || pdf.category}
                    </Badge>
                    <span className="text-[10px] text-text-gray font-mono">{pdf.uploadDate || 'Recent'}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white truncate">{pdf.title}</h4>
                  <p className="text-xs text-text-gray line-clamp-1">{pdf.description || pdf.fileName}</p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(pdf.id)}
                  >
                    Delete Resource
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminPDFManager;
