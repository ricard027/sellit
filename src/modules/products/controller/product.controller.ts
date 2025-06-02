import { Product } from '@/src/types/product'
import {
    createProductService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
} from '../service/product.service'

export async function createProductController(data: Partial<Product>) {
    return await createProductService(data)
}

export async function getProductController(id: string) {
    return await getProductByIdService(id)
}


export async function updateProductController(id: string, data: Partial<Product>) {
    return await updateProductService(id, data)
}

export async function deleteProductController(id: string) {
    return await deleteProductService(id)
}
