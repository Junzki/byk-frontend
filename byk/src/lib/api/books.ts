
import { api } from "@/lib/api/client";


export async function listBooks() {
  const { data, error } = await api.GET("/book-manager/api/books/", {

  });
}