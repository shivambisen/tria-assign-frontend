import { X } from "lucide-react";

interface Props {
  newContact: { name: string; email: string; phone: string; location: string };
  setNewContact: (c: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function AddContactModal({ newContact, setNewContact, onSubmit, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Add New Contact</h2>
            <p className="text-gray-500 dark:text-gray-400">Fill in the details below</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {["name", "email", "phone", "location"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-2 capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                placeholder={`Enter ${field}`}
                value={(newContact as any)[field]}
                onChange={(e) => setNewContact({ ...newContact, [field]: e.target.value })}
                required
                className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full h-10 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90"
          >
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}
