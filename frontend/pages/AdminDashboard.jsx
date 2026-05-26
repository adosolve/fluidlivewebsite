import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAdmin();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Admin'}</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {/* Blog Management Card */}
          <div
            onClick={() => navigate('/admin/blog')}
            className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-blue-100 rounded-xl">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Blog Management</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Create, edit, and manage your blog posts. Publish articles to the Insights section and engage with your audience.
            </p>
            <div className="flex items-center text-blue-600 font-medium">
              Manage Blog Posts
              <span className="ml-2">→</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-gray-600 text-sm mb-2">Admin Email</p>
              <p className="text-lg font-medium text-gray-900">{user?.email}</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-gray-600 text-sm mb-2">Role</p>
              <p className="text-lg font-medium text-gray-900 capitalize">{user?.role || 'Admin'}</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-gray-600 text-sm mb-2">Status</p>
              <p className="text-lg font-medium text-green-600">✓ Logged In</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
