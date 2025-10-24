import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ContactCard from "../components/ContactCard";
import ContactModal from "../components/ContactModal";
import AddContactModal from "../components/AddContactModal";
import type { Contact } from "../types";
import { createContact, getContacts, searchContacts } from "../api/contactAPI";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "", number: "", location: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim() === "") {
        const allContacts = await getContacts();
        setContacts(allContacts);
        return;
      }
      const results = await searchContacts(searchQuery);
      setContacts(results);
    };
    handleSearch();
  }, [searchQuery]);

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newC = await createContact(newContact);
      setContacts([newC, ...contacts]);
      setShowAddForm(false);
      setNewContact({ name: "", email: "", number: "", location: "" });
    } catch (err) {
      console.error("Failed to add contact", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <Header />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddClick={() => setShowAddForm(true)}
        />

        {loading ? (
          <p className="text-center text-gray-500 mt-8">Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No contacts found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} onSelect={setSelectedContact} />
            ))}
          </div>
        )}
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
