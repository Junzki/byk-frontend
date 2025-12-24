'use client';

import {useState} from 'react';
import {Edit} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Checkbox} from '@/components/ui/checkbox';
import {Book} from "@/lib/models/books";
import {DeleteOneBookButton} from "@/components/books/DeleteOneBookButton";

interface BookListProps {
  books: Book[];
}


function formatISBN(isbn: string): string {
  // Simple formatting: add hyphens at standard positions for ISBN-13
  if (isbn.length === 13) {
    return `${isbn.slice(0, 3)}-${isbn.slice(3, 4)}-${isbn.slice(4, 7)}-${isbn.slice(7, 12)}-${isbn.slice(12)}`;
  }
  // For ISBN-10 or other lengths, return as is
  return isbn;
}

// interface BookListProps {
//   // selectedIds: string[];
//   // onToggleSelect: (id: string) => void;
//   // onToggleSelectAll: () => void;
//   // onEditBook: (book: Book) => void;
//   // onDeleteBook: (id: string) => void;
// }

export function BookList({
                           books,
                         }: BookListProps) {

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        // Deselect
        return prev.filter((selectedId) => selectedId !== id);
      } else {
        // Select
        return [...prev, id];
      }
    })
  }

  const onToggleSelectAll = () => {
    if (selectedIds.length === books.length) {
      // Deselect all
      setSelectedIds([]);
    } else {
      // Select all
      setSelectedIds(books.map((book) => book.id));
    }
  }

  const onEditBook = (book: Book) => {
    console.log("Edit book:", book);
  }

  const onDeleteBook = (id: string) => {
    console.log("Delete book with id:", id);
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg">
        <p className="text-muted-foreground">No books found. Add your first book to get started!</p>
      </div>
    );
  }

  const allSelected = books.length > 0 && selectedIds.length === books.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < books.length;

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-muted/50 border-b">
        <div className="flex items-center gap-4 px-4 py-3">
          <Checkbox
            checked={allSelected}
            onCheckedChange={onToggleSelectAll}
            aria-label="Select all books"
            className={someSelected ? "data-[state=checked]:bg-primary/50" : ""}
          />
          <div className="flex-1 grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <span className="font-medium text-sm">Title</span>
            </div>
            <div className="col-span-3">
              <span className="font-medium text-sm">Authors</span>
            </div>
            <div className="col-span-3">
              <span className="font-medium text-sm">Tags</span>
            </div>
            <div className="col-span-2 text-right">
              <span className="font-medium text-sm">Actions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Book List */}
      <div className="divide-y">
        {books.map((book) => (
          <div
            key={book.id}
            className={`flex items-center gap-4 px-4 py-3 hover:bg-muted/30 transition-colors ${
              selectedIds.includes(book.id) ? 'bg-muted/20' : ''
            }`}
          >
            <Checkbox
              checked={selectedIds.includes(book.id)}
              onCheckedChange={() => onToggleSelect(book.id)}
              aria-label={`Select ${book.title}`}
            />

            <div className="flex-1 grid grid-cols-12 gap-4 items-center min-w-0">
              {/* Title */}
              <div className="col-span-4 min-w-0">
                <p className="truncate" title={book.title}>
                  {book.title}
                </p>
                {book.isbn && (
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    ISBN: {formatISBN(book.isbn)}
                  </p>
                )}
              </div>

              {/* Authors */}
              <div className="col-span-3 min-w-0">
                <p className="text-sm truncate" title={book.authors?.join(', ') || 'Unknown Author'}>
                  {book.authors?.join(', ') || 'Unknown Author'}
                </p>
              </div>

              {/* Tags (first 3) */}
              <div className="col-span-3 min-w-0">
                {book.tags && book.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {book.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {book.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{book.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditBook(book)}
                  className="h-8"
                >
                  <Edit className="w-4 h-4 mr-1"/>
                  Edit
                </Button>
                <DeleteOneBookButton bookId={book.id}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
