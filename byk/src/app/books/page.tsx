import { BookOpen, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookList } from "@/components/books/BookList";
import { Book } from "@/lib/models/books";
import { uuidv7 } from "uuidv7";
import { SearchAndCreateBooks } from "@/components/books/SearchAndCreateBook";
import { listBooks } from "@/lib/api/books";
import Navbar from "@/components/nav/navbar";

export default async function BooksPage() {
  const books = await listBooks();
  // const [books, setBooks] = useState<Book[]>([]);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
  // const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // const [showBatchDeleteDialog, setShowBatchDeleteDialog] = useState(false);
  //
  // const handleAddBook = (bookData: {
  //   title: string;
  //   authors: string[];
  //   tags: string[];
  //   isbn?: string;
  // }) => {
  //   const newBook: Book = {
  //     id: uuidv7(),
  //     ...bookData,
  //   };
  //
  //   setBooks((prevBooks) => [newBook, ...prevBooks]);
  //   toast.success('Book added successfully!');
  // };
  //
  // const handleUpdateBook = (id: string, bookData: {
  //   title: string;
  //   authors: string[];
  //   tags: string[];
  //   isbn?: string;
  // }) => {
  //   setBooks((prevBooks) =>
  //     prevBooks.map((book) =>
  //       book.id === id ? { ...book, ...bookData } : book
  //     )
  //   );
  //   toast.success('Book updated successfully!');
  //   setEditingBook(undefined);
  // };
  //
  // const handleDeleteBook = (id: string) => {
  //   setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  //   setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
  //   toast.success('Book removed successfully!');
  // };
  //
  // const handleBatchDelete = () => {
  //   setBooks((prevBooks) => prevBooks.filter((book) => {
  //     return ! (book.id != undefined && selectedIds.includes(book.id!));
  //   }));
  //   toast.success(`${selectedIds.length} book(s) removed successfully!`);
  //   setSelectedIds([]);
  //   setShowBatchDeleteDialog(false);
  // };
  //
  // const handleToggleSelect = (id: string) => {
  //   // setSelectedIds((prev) =>
  //   //   prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
  //   // );
  // };
  //
  // const handleToggleSelectAll = () => {
  //   // if (selectedIds.length === filteredBooks.length) {
  //   //   setSelectedIds([]);
  //   // } else {
  //   //   setSelectedIds(filteredBooks.map((book) => book.id));
  //   // }
  // };
  //
  const handleAddNewBookClick = () => {
    // setEditingBook(undefined);
    // if (searchQuery.trim()) {
    //   setModalInitialValue(searchQuery.trim());
    // } else {
    //   setModalInitialValue(undefined);
    // }
    // setIsModalOpen(true);
  };
  //
  // const handleEditBook = (book: Book) => {
  //   // setEditingBook(book);
  //   // setModalInitialValue(undefined);
  //   // setIsModalOpen(true);
  // };
  //
  // const handleCloseModal = () => {
  //   // setIsModalOpen(false);
  //   // setModalInitialValue(undefined);
  //   // setEditingBook(undefined);
  // };
  //
  // const filteredBooks = books.filter((book) => {
  //   const query = searchQuery.toLowerCase();
  //   return (
  //     book.title.toLowerCase().includes(query) ||
  //     book.authors?.some(author => author.toLowerCase().includes(query)) ||
  //     book.isbn?.toLowerCase().includes(query) ||
  //     book.tags?.some(tag => tag.toLowerCase().includes(query))
  //   );
  // });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <Navbar />


        {/* Search Bar and Add Button */}
        <div className="mb-4">
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/books/create">
                <Plus className="w-4 h-4 mr-2" />
                Add New Book
              </Link>
            </Button>

            <SearchAndCreateBooks />
          </div>
        </div>

        {/* Batch Operations Bar */}
        {/*{selectedIds.length > 0 && (*/}
        {/*  <div className="mb-4 p-3 bg-muted/50 rounded-lg flex items-center justify-between">*/}
        {/*  <span className="text-sm">*/}
        {/*    {selectedIds.length} book(s) selected*/}
        {/*  </span>*/}
        {/*    <Button*/}
        {/*      variant="destructive"*/}
        {/*      size="sm"*/}
        {/*      onClick={() => setShowBatchDeleteDialog(true)}*/}
        {/*    >*/}
        {/*      <Trash2 className="w-4 h-4 mr-2" />*/}
        {/*      Delete Selected*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*)}*/}

        {/* Books List */}
        <div className="mb-8">
          <div className="mb-4">
            <h2>
              {/*{searchQuery ? `Search Results (${filteredBooks.length})` : `Your Books (${books.length})`}*/}
            </h2>
          </div>
          <BookList books={books} />
        </div>
      </div>
    </div>
  );
}
