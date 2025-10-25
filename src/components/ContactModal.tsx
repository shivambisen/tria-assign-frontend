import { X, Trash2, Edit2 } from "lucide-react";
import type { Contact } from "../types";
import { useState } from "react";
import { updateContact, deleteContact } from "../api/contactAPI";
import { toast } from "react-hot-toast";

interface Props {
  contact: Contact;
  onClose: () => void;
  onUpdateLocal: (updated: Contact) => void;
  onDeleteLocal: (id: number) => void;
}
interface FormState {
  name: string;
  email: string;
  number: string;
  location: string;
}




export default function ContactModal({ contact, onClose, onUpdateLocal, onDeleteLocal }: Props) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: contact.name,
    email: contact.email,
    number: contact.number,
    location: contact.location,
  });
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updated = await updateContact(contact.id, form);
      onUpdateLocal(updated);
      toast.success("Contact updated successfully!");
      setEditing(false);
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || "Failed to update contact";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    setLoading(true);
    try {
      await deleteContact(contact.id);
      onDeleteLocal(contact.id);
      toast.success("Contact deleted successfully!");
      onClose();
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || "Failed to delete contact";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl">
              {initials}
            </div>
            <div>
              {editing ? (
                <input
                  className="text-2xl w-[250px] font-bold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 p-1 rounded"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              ) : (
                <h2 className="text-2xl font-bold">{contact.name}</h2>
              )}
              <p className="text-gray-500 dark:text-gray-400">Contact Details</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-3">
        {(["name", "email", "number", "location"] as (keyof FormState)[]).map((field) => {
  const value = form[field];
  return (
    <div key={field}>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{field}</p>
      {editing ? (
        <input
          className="w-full text-sm bg-gray-200 dark:bg-gray-700 p-1 rounded"
          value={value}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        />
      ) : (
        <p className="text-sm">{value}</p>
      )}
    </div>
  );
})}

        </div>

        <div className="flex justify-end gap-3 mt-4">
          {editing ? (
            <button
              disabled={loading}
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-1"
            >
              <Edit2 className="h-4 w-4" /> Edit
            </button>
          )}
          <button
            disabled={loading}
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
