import { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ContactCard from "../components/ContactCard";
import ContactModal from "../components/ContactModal";
import AddContactModal from "../components/AddContactModal";
import type { Contact } from "../types";

const INITIAL_CONTACTS: Contact[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", phone: "+1 (555) 123-4567", location: "New York, NY" },
  { id: 2, name: "Michael Chen", email: "michael.chen@example.com", phone: "+1 (555) 234-5678", location: "San Francisco, CA" },
];

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "", location: "" });

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const contact: Contact = { ...newContact, id: contacts.length + 1 };
    setContacts([contact, ...contacts]);
    setShowAddForm(false);
    setNewContact({ name: "", email: "", phone: "", location: "" });
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen  bg-gray-50 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      <div className="w-full">
        <Header />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddClick={() => setShowAddForm(true)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} onSelect={setSelectedContact} />
          ))}
        </div>
      </div>

      {selectedContact && <ContactModal contact={selectedContact} onClose={() => setSelectedContact(null)} />}
      {showAddForm && (
        <AddContactModal
          newContact={newContact}
          setNewContact={setNewContact}
          onSubmit={handleAddContact}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}
