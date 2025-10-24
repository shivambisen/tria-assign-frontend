import { X, Mail, Phone, MapPin } from "lucide-react";
import type { Contact } from "../types";

interface Props {
  contact: Contact;
  onClose: () => void;
}

export default function ContactModal({ contact, onClose }: Props) {
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl">
              {initials}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{contact.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">Contact Details</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-3">
          {[["Email", contact.email, <Mail key="mail" className="h-5 w-5 text-blue-500" />],
            ["Phone", contact.phone, <Phone key="phone" className="h-5 w-5 text-blue-500" />],
            ["Location", contact.location, <MapPin key="map" className="h-5 w-5 text-blue-500" />]
          ].map(([label, value, icon], i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
              {icon}
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
