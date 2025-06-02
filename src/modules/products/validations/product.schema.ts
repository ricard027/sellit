import { z } from "zod";

export const productSchema = z.object({
    id: z.string()
        .min(26, { message: "ID must be exactly 26 characters long" })
        .max(26, { message: "ID must be exactly 26 characters long" }),

    category_id: z.string()
        .min(26, { message: "Category ID must be exactly 26 characters long" })
        .max(26, { message: "Category ID must be exactly 26 characters long" }),

    name: z.string()
        .min(1, { message: "Name is required" })
        .max(255, { message: "Name must not exceed 255 characters" }),

    description: z.string()
        .min(1, { message: "Description is required" }),

    producer_name: z.string()
        .min(1, { message: "Producer name is required" })
        .max(255, { message: "Producer name must not exceed 255 characters" }),

    producer_email: z.string()
        .email({ message: "Invalid email address" }),

    cover: z.string()
        .url({ message: "Cover must be a valid URL" }),

    thumbnail: z.string()
        .url({ message: "Thumbnail must be a valid URL" }),

    price: z.number()
        .positive({ message: "Price must be a positive number" }),

    updated_at: z.string()
        .refine(val => !isNaN(Date.parse(val)), {
            message: "Updated at must be a valid ISO date string"
        }),

    created_at: z.string()
        .refine(val => !isNaN(Date.parse(val)), {
            message: "Created at must be a valid ISO date string"
        }),
});
