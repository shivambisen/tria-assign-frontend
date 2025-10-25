import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ContactCard from "../components/ContactCard";
import ContactModal from "../components/ContactModal";
import AddContactModal from "../components/AddContactModal";
import type { Contact } from "../types";
import { createContact, getContacts, searchContacts } from "../api/contactAPI";
import toast from "react-hot-toast";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "", number: "", location: "" });
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6; 

  const fetchContacts = async (reset = false) => {
    setLoading(true);
    try {
      const data = await getContacts(page, limit);
      if (reset) {
        setContacts(data.data);
      } else {
        setContacts((prev) => [...prev, ...data.data]);
      }
      setHasMore(page < data.totalPages);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(true);
  }, [page]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim() === "") {
        setPage(1);
        fetchContacts(true);
        return;
      }
      try {
        const results = await searchContacts(searchQuery);
        setContacts(results);
        setHasMore(false); // Disable load more when searching
      } catch (err) {
        console.error("Failed to search contacts", err);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newC = await createContact(newContact);
      setContacts([newC, ...contacts]);
      setShowAddForm(false);
      setNewContact({ name: "", email: "", number: "", location: "" });
      toast.success("Contact added successfully!");
    } catch (err: any) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Failed to add contact";
  
      toast.error(message);
      console.error("Failed to add contact:", message);
    }
  };
  

  const handleLoadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
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

        {loading && contacts.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No contacts found</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} onSelect={setSelectedContact} />
              ))}
            </div>

            {hasMore && !loading && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Load More
                </button>
              </div>
            )}

            {loading && hasMore && (
              <p className="text-center text-gray-500 mt-4">Loading more contacts...</p>
            )}
          </>
        )}
      </div>

          {selectedContact && (
            <ContactModal
              contact={selectedContact}
              onClose={() => setSelectedContact(null)}
              onUpdateLocal={(updated) => {
                setContacts((prev) =>
                  prev.map((c) => (c.id === updated.id ? updated : c))
                );
                setSelectedContact(updated);
              }}
              onDeleteLocal={(id) => {
                setContacts((prev) => prev.filter((c) => c.id !== id));
                setSelectedContact(null);
              }}
            />
          )}
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
