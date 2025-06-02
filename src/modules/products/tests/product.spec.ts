import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Mock } from 'vitest'
import * as repository from '../repository/product.repository'
import {
    createProductService,
    getProductByIdService,
    searchProductsService
} from '../service/product.service'
import { validProduct } from './__mocks__/product.mocks'
import type { Product } from '@/src/types/product'

vi.mock('../repository/product.repository', () => ({
    getProductById: vi.fn(),
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
    searchProducts: vi.fn(),
}))

beforeEach(() => {
    vi.clearAllMocks()
})

describe('createProductService', () => {
    it('should create product if it does not exist', async () => {
        (repository.getProductById as Mock).mockResolvedValue(null)
            ; (repository.createProduct as Mock).mockResolvedValue(validProduct)

        const response = await createProductService(validProduct)

        expect(response.status).toBe(201)
        expect(response.body).toEqual(validProduct)
    })

    it('should return 409 if product already exists', async () => {
        (repository.getProductById as Mock).mockResolvedValue(validProduct)

        const response = await createProductService(validProduct)

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty('error', 'Product already exists')
    })

    it('should return 400 if validation fails', async () => {
        const invalidProduct = { ...validProduct, price: 'not-a-number' }

        const response = await createProductService(invalidProduct)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })
})


describe('getProductByIdService', () => {
    it('should return product when it exists', async () => {
        (repository.getProductById as Mock).mockResolvedValue(validProduct)

        const response = await getProductByIdService(validProduct.id)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(validProduct)
    })

    it('should return 404 when product does not exist', async () => {
        ; (repository.getProductById as Mock).mockResolvedValue(null)

        const response = await getProductByIdService('non-existent-id')

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ error: 'Product not found' })
    })
})

describe('searchProductsService', () => {
    it('should return products matching name or producer_name', async () => {
        ; (repository.searchProducts as Mock).mockResolvedValue([validProduct])

        const response = await searchProductsService({
            name: 'valid',
            producerName: ''
        })

        expect(response.status).toBe(200)

        const products = response.body as Product[]
        expect(products).toHaveLength(1)
        expect(products[0]).toEqual(validProduct)
    })

    it('should return empty array if no products match', async () => {
        ; (repository.searchProducts as Mock).mockResolvedValue([])

        const response = await searchProductsService({
            name: 'notfound',
            producerName: ''
        })

        expect(response.status).toBe(200)
        const products = response.body as Product[]
        expect(products).toEqual([])
    })
})
