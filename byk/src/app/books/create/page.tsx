
import { AddBookForm } from "@/components/books/AddBookForm";


export default function CreateBooks() {

  async function handleAddBook(formData: FormData) {
    'use server';
    const isbn = formData.get('isbn')?.toString() || '';
    const title = formData.get('title')?.toString() || '';

    // Handle the added book (e.g., save to database or state)
    console.log("Book added:", { isbn, title });
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Create a New Book
        </h1>
        <div className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <AddBookForm />
        </div>
      </main>
    </div>
  );
}
