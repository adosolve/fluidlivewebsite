import { useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { FileText, Briefcase, LayoutDashboard, LogOut, ChevronRight } from 'lucide-react';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, currentModule, breadcrumbs } = useAdmin();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
      id: 'dashboard'
    },
    {
      label: 'Blog Management',
      path: '/admin/blog',
      icon: FileText,
      id: 'blog'
    },
    {
      label: 'Jobs Management',
      path: '/admin/jobs',
      icon: Briefcase,
      id: 'jobs'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white pt-20 shadow-lg">
        <nav className="px-4 py-8 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="mb-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Logged in as</p>
            <p className="text-sm font-medium text-white truncate">{user?.email}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-20">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
          <div className="px-8 py-4">
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                    {crumb.path ? (
                      <button
                        onClick={() => navigate(crumb.path)}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {crumb.label}
                      </button>
                    ) : (
                      <span className="text-gray-900 font-medium">{crumb.label}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
