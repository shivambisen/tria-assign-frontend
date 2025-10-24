import { Search, Plus } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddClick: () => void;
}

export default function SearchBar({ searchQuery, setSearchQuery, onAddClick }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search contacts by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 h-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      <button
        onClick={onAddClick}
        className="h-12 px-6 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Contact
      </button>
    </div>
  );
}
