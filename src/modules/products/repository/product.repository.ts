import { db } from '@/src/db'
import { products } from '@/src/db/schema'
import { Product } from '@/src/types/product'
import { eq, ilike, or } from 'drizzle-orm'

export async function createProduct(product: Product) {
    return await db.insert(products).values({
        ...product,
        price: product.price.toFixed(2),
        created_at: new Date(product.created_at),
        updated_at: new Date(product.updated_at),
    })
}

export async function getProductById(id: string): Promise<Product | null> {
    const result = await db.select().from(products).where(eq(products.id, id))
    const raw = result[0]
    if (!raw) return null

    return {
        ...raw,
        price: Number(raw.price),
        created_at: new Date(raw.created_at),
        updated_at: new Date(raw.updated_at),
    }
}

export async function updateProduct(id: string, updates: Partial<Product>) {
    const updatesToApply = {
        ...updates,
        price: updates.price ? updates.price.toString() : undefined,
        updated_at: updates.updated_at ? new Date(updates.updated_at) : undefined,
        created_at: updates.created_at ? new Date(updates.created_at) : undefined,
    }

    Object.keys(updatesToApply).forEach((key) => {
        if (updatesToApply[key as keyof typeof updatesToApply] === undefined) {
            delete updatesToApply[key as keyof typeof updatesToApply]
        }
    })

    return await db.update(products).set(updatesToApply).where(eq(products.id, id))
}

export async function deleteProduct(id: string) {
    return await db.delete(products).where(eq(products.id, id))
}

export async function searchProducts({
    name,
    producerName,
    limit = 10,
    skip = 0,
}: {
    name?: string
    producerName?: string
    limit?: number
    skip?: number
}): Promise<Product[]> {

    let query = db.select().from(products) as any

    if (name || producerName) {
        query = query.where(
            or(
                ilike(products.name, `%${name || ''}%`),
                ilike(products.producer_name, `%${producerName || ''}%`)
            )
        )
    }

    query = query.limit(limit).offset(skip)

    const result = await query

    return result.map((raw: Product) => ({
        ...raw,
        price: Number(raw.price),
        created_at: new Date(raw.created_at),
        updated_at: new Date(raw.updated_at),
    }))
}
