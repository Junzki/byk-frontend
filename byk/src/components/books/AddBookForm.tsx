'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Book } from "@/lib/models/books";


export const formSchema = z.object({
  isbn: z.string().length(13, {
    message: "Username must be at least 13 characters.",
  }),
  title: z.string().optional()
});

export interface AddBookFormProps {
  externalOnSubmit?: (data: Book) => void;
  // You can extend with additional props if needed
}


export function AddBookForm({
  externalOnSubmit,
                            } : AddBookFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isbn: "",
      title: ""
    },
  })

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.debug(values);
    if (externalOnSubmit) {
      externalOnSubmit({
        isbn: values.isbn,
        title: values.title || '',
      } as Book);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input placeholder="978-0-451-524935" {...field} />
              </FormControl>
              <FormDescription>
                ISBN must be 13 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Nineteen Eighty-Four" {...field} />
              </FormControl>
              <FormDescription>
                Title can be left empty.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}