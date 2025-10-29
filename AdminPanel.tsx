import React, { useState, useEffect } from 'react';
import { UserWithStatus, FollowUp, SiteContent, SystemSettings, Statistics } from '../types';
import { Shield, Users, TrendingUp, Calendar, Search, Filter, Download, CreditCard as Edit3, Trash2, Eye, Settings, FileText, BarChart3, Database, ToggleLeft as Toggle, Save, X, Plus, AlertTriangle, CheckCircle, Upload } from 'lucide-react';
import { apiService } from '../services/api';

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [users, setUsers] = useState<UserWithStatus[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [content, setContent] = useState<SiteContent[]>([]);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserWithStatus | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'followups' | 'content' | 'settings' | 'analytics'>('users');
  const [loading, setLoading] = useState(false);
  const [editingContent, setEditingContent] = useState<SiteContent | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // For demo purposes, using localStorage data
      // In production, these would be API calls
      const storedUsers = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
      const storedFollowUps = JSON.parse(localStorage.getItem('ayurveda_followups') || '[]');
      
      const usersWithStatus: UserWithStatus[] = storedUsers.map((user: any) => ({
        ...user,
        active: true,
        lastLogin: new Date().toISOString(),
        doshaAssessmentCompleted: !!localStorage.getItem(`dosha_result_${user.id}`),
        followUpCount: storedFollowUps.filter((f: FollowUp) => f.userId === user.id).length
      }));

      setUsers(usersWithStatus);
      setFollowUps(storedFollowUps);
      
      // Mock content data
      setContent([
        {
          id: '1',
          title: 'Welcome to AyurVeda',
          description: 'Main landing page content',
          content: 'Discover your unique constitution through ancient wisdom...',
          type: 'page',
          published: true,
          lastModified: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Understanding Doshas',
          description: 'Educational content about doshas',
          content: 'The three doshas - Vata, Pitta, and Kapha...',
          type: 'article',
          published: true,
          lastModified: new Date().toISOString()
        }
      ]);

      // Mock settings
      setSettings({
        siteName: 'AyurVeda Wellness',
        maintenanceMode: false,
        registrationEnabled: true,
        emailNotifications: true,
        maxUsersPerDay: 100,
        sessionTimeout: 30,
        backupFrequency: 'daily'
      });

      // Calculate statistics
      const stats: Statistics = {
        totalUsers: usersWithStatus.length,
        activeUsers: usersWithStatus.filter(u => u.active).length,
        completedAssessments: usersWithStatus.filter(u => u.doshaAssessmentCompleted).length,
        totalFollowUps: storedFollowUps.length,
        doshaDistribution: getDoshaDistribution(usersWithStatus),
        userGrowth: {
          thisWeek: Math.floor(usersWithStatus.length * 0.1),
          thisMonth: Math.floor(usersWithStatus.length * 0.3),
          lastMonth: Math.floor(usersWithStatus.length * 0.2)
        },
        averageRatings: {
          energy: storedFollowUps.length > 0 ? 
            storedFollowUps.reduce((sum: number, f: FollowUp) => sum + f.energyLevel, 0) / storedFollowUps.length : 0,
          sleep: storedFollowUps.length > 0 ? 
            storedFollowUps.reduce((sum: number, f: FollowUp) => sum + f.sleepQuality, 0) / storedFollowUps.length : 0,
          digestion: storedFollowUps.length > 0 ? 
            storedFollowUps.reduce((sum: number, f: FollowUp) => sum + f.digestiveHealth, 0) / storedFollowUps.length : 0
        }
      };
      setStatistics(stats);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDoshaDistribution = (users: UserWithStatus[]) => {
    const distribution = { vata: 0, pitta: 0, kapha: 0 };
    users.forEach(user => {
      const result = localStorage.getItem(`dosha_result_${user.id}`);
      if (result) {
        const doshaResult = JSON.parse(result);
        distribution[doshaResult.dominant]++;
      }
    });
    return distribution;
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        const updatedUsers = users.filter(u => u.id !== userId);
        setUsers(updatedUsers);
        
        // Update localStorage
        const storedUsers = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
        const filteredUsers = storedUsers.filter((u: any) => u.id !== userId);
        localStorage.setItem('ayurveda_users', JSON.stringify(filteredUsers));
        
        // Remove user's dosha result
        localStorage.removeItem(`dosha_result_${userId}`);
        
        alert('User deleted successfully');
      } catch (error) {
        alert('Error deleting user');
      }
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    try {
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, active: !user.active } : user
      );
      setUsers(updatedUsers);
      alert('User status updated successfully');
    } catch (error) {
      alert('Error updating user status');
    }
  };

  const handleSaveContent = async (contentData: SiteContent) => {
    try {
      const updatedContent = content.map(c => 
        c.id === contentData.id ? { ...contentData, lastModified: new Date().toISOString() } : c
      );
      setContent(updatedContent);
      setEditingContent(null);
      alert('Content saved successfully');
    } catch (error) {
      alert('Error saving content');
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    
    try {
      localStorage.setItem('ayurveda_settings', JSON.stringify(settings));
      alert('Settings saved successfully');
    } catch (error) {
      alert('Error saving settings');
    }
  };

  const exportData = async () => {
    try {
      const data = {
        users: users.map(u => ({ ...u, password: undefined })),
        followUps,
        content,
        settings,
        statistics,
        exportDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ayurveda_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } catch (error) {
      alert('Error exporting data');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-emerald-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your AyurVeda platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportData}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{statistics.totalUsers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{statistics.activeUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Assessments</p>
                  <p className="text-2xl font-semibold text-gray-900">{statistics.completedAssessments}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <BarChart3 className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Follow-ups</p>
                  <p className="text-2xl font-semibold text-gray-900">{statistics.totalFollowUps}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'users', label: 'User Management', icon: Users },
                { id: 'followups', label: 'Follow-ups', icon: Calendar },
                { id: 'content', label: 'Content Management', icon: FileText },
                { id: 'settings', label: 'System Settings', icon: Settings },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>Age: {user.age}</div>
                            <div>Location: {user.location || 'Not specified'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              {user.doshaAssessmentCompleted ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              )}
                              <span>
                                {user.doshaAssessmentCompleted ? 'Assessed' : 'Pending'}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400">
                              {user.followUpCount} follow-ups
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setSelectedUser(user)}
                                className="text-emerald-600 hover:text-emerald-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleToggleUserStatus(user.id)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Toggle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Content Management Tab */}
            {activeTab === 'content' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Content Management</h2>
                  <button
                    onClick={() => setEditingContent({
                      id: Date.now().toString(),
                      title: '',
                      description: '',
                      content: '',
                      type: 'page',
                      published: false,
                      lastModified: new Date().toISOString()
                    })}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Content</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.map(item => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {item.content}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                          Modified: {new Date(item.lastModified).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => setEditingContent(item)}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Settings Tab */}
            {activeTab === 'settings' && settings && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
                  <button
                    onClick={handleSaveSettings}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Settings</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site Name
                        </label>
                        <input
                          type="text"
                          value={settings.siteName}
                          onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Maintenance Mode
                        </label>
                        <button
                          onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.maintenanceMode ? 'bg-emerald-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Registration Enabled
                        </label>
                        <button
                          onClick={() => setSettings({...settings, registrationEnabled: !settings.registrationEnabled})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.registrationEnabled ? 'bg-emerald-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.registrationEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Users Per Day
                        </label>
                        <input
                          type="number"
                          value={settings.maxUsersPerDay}
                          onChange={(e) => setSettings({...settings, maxUsersPerDay: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <input
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Backup Frequency
                        </label>
                        <select
                          value={settings.backupFrequency}
                          onChange={(e) => setSettings({...settings, backupFrequency: e.target.value as any})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && statistics && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Dashboard</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Dosha Distribution</h3>
                    <div className="space-y-3">
                      {Object.entries(statistics.doshaDistribution).map(([dosha, count]) => {
                        const total = Object.values(statistics.doshaDistribution).reduce((a, b) => a + b, 0);
                        const percentage = total > 0 ? (count / total) * 100 : 0;
                        
                        return (
                          <div key={dosha} className="flex items-center justify-between">
                            <span className="capitalize font-medium">{dosha}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-emerald-500 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>This Week</span>
                        <span className="font-medium text-green-600">+{statistics.userGrowth.thisWeek}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>This Month</span>
                        <span className="font-medium text-blue-600">+{statistics.userGrowth.thisMonth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Month</span>
                        <span className="font-medium text-gray-600">+{statistics.userGrowth.lastMonth}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Average Health Ratings</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Energy Level</span>
                        <span className="font-medium">{statistics.averageRatings.energy.toFixed(1)}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sleep Quality</span>
                        <span className="font-medium">{statistics.averageRatings.sleep.toFixed(1)}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Digestive Health</span>
                        <span className="font-medium">{statistics.averageRatings.digestion.toFixed(1)}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Follow-ups Tab */}
            {activeTab === 'followups' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Follow-up Management</h2>
                <div className="space-y-4">
                  {followUps.map(followUp => {
                    const user = users.find(u => u.id === followUp.userId);
                    return (
                      <div key={followUp.id} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium text-gray-900">{user?.name || 'Unknown User'}</h3>
                            <p className="text-sm text-gray-500">{new Date(followUp.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex space-x-4 text-sm">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              Energy: {followUp.energyLevel}/10
                            </span>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                              Sleep: {followUp.sleepQuality}/10
                            </span>
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              Digestion: {followUp.digestiveHealth}/10
                            </span>
                          </div>
                        </div>
                        
                        {followUp.symptoms.length > 0 && (
                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-700">Symptoms: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {followUp.symptoms.map((symptom, index) => (
                                <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {followUp.improvements.length > 0 && (
                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-700">Improvements: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {followUp.improvements.map((improvement, index) => (
                                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                  {improvement}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {followUp.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Notes: </span>
                            <p className="text-sm text-gray-600 mt-1">{followUp.notes}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Edit Modal */}
      {editingContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingContent.id ? 'Edit Content' : 'Add New Content'}
              </h3>
              <button
                onClick={() => setEditingContent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingContent.title}
                  onChange={(e) => setEditingContent({...editingContent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={editingContent.description}
                  onChange={(e) => setEditingContent({...editingContent, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={editingContent.content}
                  onChange={(e) => setEditingContent({...editingContent, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={editingContent.type}
                    onChange={(e) => setEditingContent({...editingContent, type: e.target.value as any})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="page">Page</option>
                    <option value="article">Article</option>
                    <option value="faq">FAQ</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Published</label>
                  <button
                    onClick={() => setEditingContent({...editingContent, published: !editingContent.published})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      editingContent.published ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingContent.published ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingContent(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveContent(editingContent)}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Save Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};