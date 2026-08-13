import React from 'react';

export const AdminSidebar = ({ activeTab, setActiveTab, unreadCount }) => {
  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'resources', name: 'Manage Resources', icon: '📚' },
    { id: 'feedback', name: 'User Feedback', icon: '💬', badge: unreadCount },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 border-r border-border-color/60 hidden lg:flex flex-col p-5 space-y-1.5 transition-all duration-300 bg-slate-900/60 backdrop-blur-md">
      <p className="text-[10px] font-bold text-text-gray uppercase tracking-widest mb-4 px-3">Administration</p>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-between px-4 py-3 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white shadow-sm ring-1 ring-cyan-400/30'
                : 'text-text-gray hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-base">{tab.icon}</span>
              <span>{tab.name}</span>
            </div>
            {tab.badge > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </aside>
  );
};

export default AdminSidebar;
