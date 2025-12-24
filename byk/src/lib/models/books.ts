
export interface Book {
  id: string,
  title: string,
  authors?: string[],
  isbn?: string,
  tags?: string[],
  createdAt?: string,
  updatedAt?: string
}
