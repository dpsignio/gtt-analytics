import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { TrendingUp, Users, School, Target } from 'lucide-react';
import MetricCard from '../common/MetricCard';

const AdoptionMetrics = ({ data, currentUser }) => {
  const [metrics, setMetrics] = useState({
    schoolActivationRate: 0,
    teacherActivationRate: 0,
    avgTeachersPerSchool: 0,
    totalSchools: 0,
    totalTeachers: 0,
    activeSchools: 0,
    activeTeachers: 0
  });
  
  const [chartData, setChartData] = useState({
    activationTrend: [],
    teacherDistribution: [],
    schoolStatus: []
  });
  
  // Generate sample data for charts
  useEffect(() => {
    // Calculate metrics
    const totalSchools = 45;
    const activeSchools = 38;
    const totalTeachers = 523;
    const activeTeachers = 412;
    
    setMetrics({
      schoolActivationRate: ((activeSchools / totalSchools) * 100).toFixed(1),
      teacherActivationRate: ((activeTeachers / totalTeachers) * 100).toFixed(1),
      avgTeachersPerSchool: (activeTeachers / activeSchools).toFixed(1),
      totalSchools,
      totalTeachers,
      activeSchools,
      activeTeachers
    });
    
    // Generate trend data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const activationTrend = months.map((month, index) => ({
      month,
      schoolRate: 70 + (index * 3) + Math.random() * 5,
      teacherRate: 65 + (index * 2.5) + Math.random() * 5
    }));
    
    // Teacher distribution data
    const teacherDistribution = [
      { range: '1 teacher', schools: 5, percentage: 11.1 },
      { range: '2-5 teachers', schools: 12, percentage: 26.7 },
      { range: '6-10 teachers', schools: 15, percentage: 33.3 },
      { range: '11-20 teachers', schools: 10, percentage: 22.2 },
      { range: '21+ teachers', schools: 3, percentage: 6.7 }
    ];
    
    // School status data
    const schoolStatus = [
      { name: 'Fully Active', value: 28, color: '#10b981' },
      { name: 'Partially Active', value: 10, color: '#f59e0b' },
      { name: 'Inactive', value: 7, color: '#ef4444' }
    ];
    
    setChartData({
      activationTrend,
      teacherDistribution,
      schoolStatus
    });
  }, [data]);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Adoption Metrics</h2>
        <p className="text-gray-600">Track school and teacher adoption of the Great Teaching Toolkit</p>
      </div>
      
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="School Activation Rate"
          value={`${metrics.schoolActivationRate}%`}
          subtitle={`${metrics.activeSchools} of ${metrics.totalSchools} schools`}
          icon={School}
          trend="+5.2%"
          trendPositive={true}
        />
        
        <MetricCard
          title="Teacher Activation Rate"
          value={`${metrics.teacherActivationRate}%`}
          subtitle={`${metrics.activeTeachers} of ${metrics.totalTeachers} teachers`}
          icon={Users}
          trend="+3.8%"
          trendPositive={true}
        />
        
        <MetricCard
          title="Avg Teachers per School"
          value={metrics.avgTeachersPerSchool}
          subtitle="Active teachers only"
          icon={Target}
          trend="+0.5"
          trendPositive={true}
        />
        
        <MetricCard
          title="Total Active Users"
          value={metrics.activeTeachers}
          subtitle="Last 30 days"
          icon={TrendingUp}
          trend="+12%"
          trendPositive={true}
        />
      </div>
      
      {/* Activation Trend Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Activation Rate Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData.activationTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="schoolRate" 
              stroke="#0ea5e9" 
              name="School Activation %" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="teacherRate" 
              stroke="#d946ef" 
              name="Teacher Activation %" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teacher Distribution Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Teachers per School Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.teacherDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="schools" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* School Status Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">School Activation Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.schoolStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.schoolStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Development Progress Table */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Teacher Development Progress</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Teachers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assessments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Goals Set
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Implementations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reflections
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Lincoln High School
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  24
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span>18</span>
                    <span className="ml-2 text-green-600">(75%)</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span>15</span>
                    <span className="ml-2 text-green-600">(63%)</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span>12</span>
                    <span className="ml-2 text-yellow-600">(50%)</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span>10</span>
                    <span className="ml-2 text-yellow-600">(42%)</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Riverside Academy
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  18
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span>16</span>
                    <span className="ml-2 text-green-600">(89%)</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span>14</span>
                    <span className="ml-2 text-green-600">(78%)</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span>11</span>
                    <span className="ml-2 text-yellow-600">(61%)</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span>9</span>
                    <span className="ml-2 text-yellow-600">(50%)</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdoptionMetrics;
