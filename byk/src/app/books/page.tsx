'use client';

import { useState, useEffect } from 'react';

import {
  BookOpen,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookList, BookData } from '@/components/books/BookList';

export default function BooksPage() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState<BookData | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBatchDeleteDialog, setShowBatchDeleteDialog] = useState(false);

  const handleAddBook = (bookData: {
    name: string;
    authors: string[];
    tags: string[];
    isbn?: string;
  }) => {
    const newBook: BookData = {
      id: crypto.randomUUID(),
      ...bookData,
    };

    setBooks((prevBooks) => [newBook, ...prevBooks]);
    toast.success('Book added successfully!');
  };

  const handleUpdateBook = (id: string, bookData: {
    name: string;
    authors: string[];
    tags: string[];
    isbn?: string;
  }) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...bookData } : book
      )
    );
    toast.success('Book updated successfully!');
    setEditingBook(undefined);
  };

  const handleDeleteBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    toast.success('Book removed successfully!');
  };

  const handleBatchDelete = () => {
    setBooks((prevBooks) => prevBooks.filter((book) => !selectedIds.includes(book.id)));
    toast.success(`${selectedIds.length} book(s) removed successfully!`);
    setSelectedIds([]);
    setShowBatchDeleteDialog(false);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredBooks.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredBooks.map((book) => book.id));
    }
  };

  const handleAddNewBookClick = () => {
    // setEditingBook(undefined);
    // if (searchQuery.trim()) {
    //   setModalInitialValue(searchQuery.trim());
    // } else {
    //   setModalInitialValue(undefined);
    // }
    // setIsModalOpen(true);
  };

  const handleEditBook = (book: BookData) => {
    // setEditingBook(book);
    // setModalInitialValue(undefined);
    // setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // setIsModalOpen(false);
    // setModalInitialValue(undefined);
    // setEditingBook(undefined);
  };

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.name.toLowerCase().includes(query) ||
      book.authors.some(author => author.toLowerCase().includes(query)) ||
      book.isbn?.toLowerCase().includes(query) ||
      book.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8" />
            <h1>System &#34;ByK&#34;</h1>
          </div>

          {/* Search Bar and Add Button */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search books by name, author, ISBN, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={handleAddNewBookClick}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Book
            </Button>
          </div>

          {/* Batch Operations Bar */}
          {selectedIds.length > 0 && (
            <div className="mb-4 p-3 bg-muted/50 rounded-lg flex items-center justify-between">
            <span className="text-sm">
              {selectedIds.length} book(s) selected
            </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowBatchDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          )}

          {/* Books List */}
          <div>
            <div className="mb-4">
              <h2>
                {searchQuery ? `Search Results (${filteredBooks.length})` : `Your Books (${books.length})`}
              </h2>
            </div>
            <BookList
              books={filteredBooks}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
            />
          </div>
        </div>


      </div>
    </div>
  );
}

