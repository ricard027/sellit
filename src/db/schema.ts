import { pgTable, varchar, text, decimal, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: varchar("id", { length: 36 }).primaryKey(),
    category_id: varchar("category_id", { length: 36 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    producer_name: varchar("producer_name", { length: 255 }).notNull(),
    producer_email: varchar("producer_email", { length: 255 }).notNull(),
    cover: varchar("cover", { length: 500 }).notNull(),
    thumbnail: varchar("thumbnail", { length: 500 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).notNull(),
});
