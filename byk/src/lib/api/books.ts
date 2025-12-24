import { api } from "@/lib/api/client";
import type { components } from "@/lib/schemas/gateway-api-schema";
import { Book } from "@/lib/models/books";




export async function listBooks(): Promise<Book[]> {
  const { data, error } = await api.GET("/book-manager/api/books/", {});
  if (error) {
    // rethrow so callers can handle it (could be a network or API error from openapi-fetch)
    throw error;
  }
  // data may be undefined; return an empty array in that case to simplify callers
  const origin = (data ?? []) as components['schemas']['BookSchema'][];
  const result = origin.map((item) => ({
    id: item.id,
    title: item.title,
    authors: item.authors,
    isbn: item.isbn_number,
    tags: item.tags,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  } as Book ));

  return result;
}


export async function deleteOneBook(id: string): Promise<void> {
  const { error } = await api.DELETE("/book-manager/api/books/{book_id}/", {
    params: {
      path: {
        book_id: id
      },
    }
  });
  if (error) {
    throw error;
  }
}
