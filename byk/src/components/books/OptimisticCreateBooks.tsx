'use client';

import { AddBookForm } from "@/components/books/AddBookForm";
import { BookList } from "@/components/books/BookList";
import { useState } from "react";
import { Book } from "@/lib/models/books";


export function OptimisticCreateBooks() {

  const [books, setBooks] = useState<Book[]>([]);
  const [optimisticBooks, setOptimisticBooks] = useState<Book[]>([]);

  const handleAddBook = (b: Book) => {
    // Add the new book optimistically
    setOptimisticBooks((prev) => [b, ...prev]);

    // Simulate server confirmation after a delay
    setTimeout(() => {
      setBooks((prev) => [b, ...prev]);
      setOptimisticBooks((prev) => prev.filter((book) => book.id !== b.id));
    }, 2000); // Simulate 2 seconds server response time
  }
  
  
  return (
    <div className="flex">
      <div className="flex-none w-full md:w-1/2 lg:w-1/3">
        <div className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <AddBookForm />
        </div>
      </div>
      <div className="flex-none w-full md:w-1/2 lg:w-2/3 mt-10 md:mt-0 md:pl-10">
        <BookList
          books={books}
          emptyPlaceholder="The books you added will be listed here"
        />
      </div>
    </div>
  );
}
