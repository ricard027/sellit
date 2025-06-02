export interface Product {
    id: string;
    category_id: string;
    name: string;
    description: string;
    producer_name: string;
    producer_email: string;
    cover: string;
    thumbnail: string;
    price: number;
    created_at: string | Date;
    updated_at: string | Date;
}
