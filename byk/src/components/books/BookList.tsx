import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

export interface BookData {
  id: string;
  name: string;
  authors: string[];
  tags?: string[];
  isbn?: string;
}

interface BookListProps {
  books: BookData[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onEditBook: (book: BookData) => void;
  onDeleteBook: (id: string) => void;
}

export function BookList({
                           books,
                           selectedIds,
                           onToggleSelect,
                           onToggleSelectAll,
                           onEditBook,
                           onDeleteBook
                         }: BookListProps) {
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
              aria-label={`Select ${book.name}`}
            />

            <div className="flex-1 grid grid-cols-12 gap-4 items-center min-w-0">
              {/* Title */}
              <div className="col-span-4 min-w-0">
                <p className="truncate" title={book.name}>
                  {book.name}
                </p>
                {book.isbn && (
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {book.isbn}
                  </p>
                )}
              </div>

              {/* Authors */}
              <div className="col-span-3 min-w-0">
                <p className="text-sm truncate" title={book.authors.join(', ')}>
                  {book.authors.join(', ')}
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
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteBook(book.id)}
                  className="h-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
