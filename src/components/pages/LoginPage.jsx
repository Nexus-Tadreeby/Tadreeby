export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 font-['Inter']">Sign In</h1>
        <form>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <a href="#" className="text-blue-600 font-bold">Register</a>
        </p>
      </div>
    </div>
  );
}