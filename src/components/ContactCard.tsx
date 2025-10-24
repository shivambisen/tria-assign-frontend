import { Mail, Phone, MapPin } from "lucide-react";
import type { Contact } from "../types";

interface ContactCardProps {
  contact: Contact;
  onSelect: (contact: Contact) => void;
}

export default function ContactCard({ contact, onSelect }: ContactCardProps) {
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      onClick={() => onSelect(contact)}
      className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 rounded-xl cursor-pointer hover:scale-[1.02] transition-transform"
    >
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-3 truncate">
            {contact.name}
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-500" />
              <span className="truncate">{contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-500" />
              <span className="truncate">{contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span className="truncate">{contact.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
