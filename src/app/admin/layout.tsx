import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-black dark:text-white">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <h1 className="font-bold text-lg">Admin</h1>
            <Link
              href="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-beebee-yellow dark:hover:text-beebee-yellow transition-colors"
            >
              Back to site
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
