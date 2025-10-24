import { Users } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center mb-12">
      <div className="inline-flex items-center justify-center p-3 bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-2xl mb-4">
        <Users className="h-12 w-12 text-blue-600 dark:text-blue-300" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-linear-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Contact Universe
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
        Your personal contact manager — search, add, and organize your favorite people
      </p>
    </header>
  );
}
