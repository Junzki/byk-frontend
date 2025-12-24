import {listBooks} from "@/lib/api/books";
import {BookList} from "@/components/books/BookList";


export async function BookListContainer() {
  const books = await listBooks();

  return (
    <BookList books={books} />
  );
}
