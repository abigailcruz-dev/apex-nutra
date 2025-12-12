export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#161616' }}>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-gray-300 mb-8">Page Not Found</p>
        <a href="/" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
          Go Home
        </a>
      </div>
    </div>
  );
}

