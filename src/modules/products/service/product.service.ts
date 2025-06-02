import { z } from 'zod'
import { Product } from '@/src/types/product'
import { productSchema } from '@/src/modules/products/validations/product.schema'
import * as productRepository from '@/src/modules/products/repository/product.repository'

const { createProduct, getProductById, updateProduct, deleteProduct, searchProducts } = productRepository

export async function createProductService(data: unknown) {
    try {
        const product = productSchema.parse(data)
        const existing = await getProductById(product.id)
        if (existing) {
            return { status: 409, body: { error: 'Product already exists' } }
        }
        const created = await createProduct(product)
        return { status: 201, body: created }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: 400, body: { errors: error.errors } }
        }
        return { status: 500, body: { error: 'Internal Server Error' } }
    }
}

export async function getProductByIdService(id: string) {
    const product = await getProductById(id)
    if (!product) return { status: 404, body: { error: 'Product not found' } }
    return { status: 200, body: product }
}

export async function updateProductService(id: string, data: Partial<Product>) {
    try {
        const updated = await updateProduct(id, data)
        return { status: 200, body: updated }
    } catch (error) {
        return { status: 500, body: { error: 'Internal Server Error' } }
    }
}

export async function deleteProductService(id: string) {
    try {
        await deleteProduct(id)
        return { status: 204, body: null }
    } catch (error) {
        return { status: 500, body: { error: 'Internal Server Error' } }
    }
}

export async function searchProductsService(query: { name?: string; producerName?: string }) {
    try {
        const products = await searchProducts(query)
        return { status: 200, body: products }
    } catch (error) {
        return { status: 500, body: { error: 'Internal Server Error' } }
    }
}
