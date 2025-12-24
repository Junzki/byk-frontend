import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";

interface DeleteOneBookProps {
  bookId: string;
}


export function DeleteOneBookButton({
                                      bookId,
                                    }: DeleteOneBookProps) {

  const onDeleteBook = async (id: string) => {
    // Placeholder for delete logic
    console.log("Deleting book with id:", id);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onDeleteBook(bookId)}
      className="h-8 text-destructive hover:text-destructive"
    >
      <Trash2 className="w-4 h-4 mr-1"/>
      Delete
    </Button>
  );
}
