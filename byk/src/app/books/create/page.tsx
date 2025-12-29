import Navbar from "@/components/nav/navbar";
import { Book } from "@/lib/models/books";
import { OptimisticCreateBooks } from "@/components/books/OptimisticCreateBooks";

export default function CreateBooks() {
  async function handleAddBook(formData: FormData) {
    "use server";
    const isbn = formData.get("isbn")?.toString() || "";
    const title = formData.get("title")?.toString() || "";

    // Handle the added book (e.g., save to database or state)
    console.log("Book added:", { isbn, title });
  }

  const books: Book[] = [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Navbar />

        <OptimisticCreateBooks />
      </div>
    </div>
  );
}
