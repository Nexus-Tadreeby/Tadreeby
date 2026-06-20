export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 font-['Inter']">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
          <p className="text-3xl font-bold text-gray-800">1,234</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Trainings</h3>
          <p className="text-3xl font-bold text-gray-800">56</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Approvals</h3>
          <p className="text-3xl font-bold text-gray-800">12</p>
        </div>
      </div>
    </div>
  );
}