import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePDF } from '../../context/PDFContext';
import PDFGrid from '../../components/pdf/PDFGrid';
import { CATEGORIES } from '../../constants/categories';

const CategoryResourcePage = ({ categoryId, toggleFullScreen }) => {
  const navigate = useNavigate();
  const config = CATEGORIES[categoryId] || CATEGORIES.judicial;
  const { getPDFsByCategory, getPDFsByNestedPath } = usePDF();
  const [searchTerm, setSearchTerm] = useState('');

  const catParam = config.subdomainParam || categoryId;
  const categoryPDFs = getPDFsByCategory(catParam);

  const uploadedBySubdomain = categoryPDFs.reduce((acc, pdf) => {
    if (pdf.subdomain) {
      if (!acc[pdf.subdomain]) acc[pdf.subdomain] = new Set();
      if (pdf.subSubdomain) acc[pdf.subdomain].add(pdf.subSubdomain);
    }
    return acc;
  }, {});

  const pdfCountFor = (subdomain, subSub) =>
    getPDFsByNestedPath({ category: catParam, subdomain, subSubdomain: subSub }).length;

  const sections = (config.staticSections || []).map((section) => {
    const uploaded = uploadedBySubdomain[section.subdomain] ? [...uploadedBySubdomain[section.subdomain]] : [];
    const existingLower = section.items.map((i) => (typeof i === 'string' ? i.toLowerCase() : i.name.toLowerCase()));

    const newItems = uploaded
      .filter((u) => !existingLower.includes(u.toLowerCase()))
      .map((u) => {
        const count = pdfCountFor(section.subdomain, u);
        return typeof section.items[0] === 'object'
          ? { name: u, count: `${count} PDF${count !== 1 ? 's' : ''}` }
          : u;
      });

    return {
      ...section,
      items: [...section.items, ...newItems],
      uploadedNames: new Set(uploaded.map((n) => n.toLowerCase())),
    };
  });

  const knownSubs = new Set((config.staticSections || []).map((s) => s.subdomain));
  const dynamicSections = Object.keys(uploadedBySubdomain)
    .filter((s) => !knownSubs.has(s))
    .map((sub) => ({
      subdomain: sub,
      title: sub.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      icon: '📂',
      items: [...uploadedBySubdomain[sub]].map((u) =>
        typeof (config.staticSections[0]?.items[0]) === 'object'
          ? { name: u, count: `${pdfCountFor(sub, u)} PDFs` }
          : u
      ),
      uploadedNames: uploadedBySubdomain[sub],
    }));

  const allSections = [...sections, ...dynamicSections];

  const filteredSections = allSections
    .map((sec) => ({
      ...sec,
      items: sec.items.filter((item) => {
        const itemName = typeof item === 'string' ? item : item.name;
        return itemName.toLowerCase().includes(searchTerm.toLowerCase());
      }),
    }))
    .filter((sec) => sec.items.length > 0);

  return (
    <div className="flex flex-col w-full min-h-screen bg-ndl-dark transition-colors duration-500 font-sans text-white">
      {/* Top Utility Bar */}
      <div className={`z-[1050] bg-gradient-to-r ${config.gradient} text-white flex justify-between px-[5%] py-2.5 text-xs font-semibold tracking-wide sticky top-0 border-b border-white/5 backdrop-blur-sm shadow-lg`}>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1">
            <span className="text-sm group-hover:scale-110 transition-transform">{config.badgeIcon}</span>
            <span className="hidden sm:inline">{config.badge}</span>
          </button>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1">
            <span className="text-sm group-hover:-translate-x-1 transition-transform text-white">⬅️</span>
            <span className="hidden sm:inline text-white">Back to Dashboard</span>
          </button>
          {toggleFullScreen && (
            <button onClick={toggleFullScreen} className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:text-accent transition-all group p-1">
              <span className="text-sm group-hover:scale-110 transition-transform">⛶</span>
              <span className="hidden sm:inline">Fullscreen</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 px-[5%] py-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-black tracking-[0.2em] text-accent uppercase">{config.name}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{config.headerTitle}</h1>
            <p className="text-gray-400 text-sm leading-relaxed">{config.headerSubtitle}</p>
          </div>
          <div className="w-full md:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${config.name}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 bg-black/40 border border-white/15 rounded-2xl text-sm focus:outline-none focus:border-accent transition-all text-white placeholder-gray-400"
              />
              <span className="absolute right-4 top-3.5 text-sm opacity-60">🔍</span>
            </div>
          </div>
        </header>

        {/* Uploaded Documents Grid */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl">📄</span>
            <h2 className="text-xl font-bold tracking-tight">Repository Documents ({categoryPDFs.length})</h2>
          </div>
          <PDFGrid pdfs={categoryPDFs} category={catParam} />
        </section>

        {/* Category Sections */}
        <section className="space-y-10">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-gray-400 text-sm">No items matching "{searchTerm}"</p>
            </div>
          ) : (
            filteredSections.map((section, idx) => (
              <div key={section.subdomain || idx} className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="text-lg font-bold tracking-wide">{section.title}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {section.items.map((item, itemIdx) => {
                    const itemName = typeof item === 'string' ? item : item.name;
                    const itemSub = typeof item === 'object' ? item.count : null;
                    const isUploaded = section.uploadedNames && section.uploadedNames.has(itemName.toLowerCase());

                    return (
                      <div
                        key={itemIdx}
                        onClick={() => navigate(`/search?query=${encodeURIComponent(itemName)}`)}
                        className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                          isUploaded
                            ? 'bg-accent/10 border-accent/40 hover:border-accent hover:shadow-lg hover:shadow-accent/20'
                            : 'bg-black/20 border-white/5 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-sm font-semibold group-hover:text-accent transition-colors">{itemName}</span>
                          {isUploaded && <span className="text-[10px] bg-accent text-black font-extrabold px-1.5 py-0.5 rounded">NEW</span>}
                        </div>
                        {itemSub && <span className="text-xs text-gray-400 mt-2 font-mono">{itemSub}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default CategoryResourcePage;
