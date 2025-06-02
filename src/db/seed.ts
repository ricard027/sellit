import { v4 as uuid } from 'uuid'

import 'dotenv/config'
import { products } from './schema'
import { db } from '.'

type DummyProduct = {
    id: number
    title: string
    description: string
    price: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

type DummyResponse = {
    products: DummyProduct[]
}

async function seed() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('Seed só pode ser rodado em desenvolvimento. Abortando...');
        return;
    }

    const res = await fetch(`${process.env.API_DEV_URL}products?limit=100`)
    const data = (await res.json()) as DummyResponse

    const rows = data.products.map((p) => ({
        id: uuid(),
        category_id: uuid(),
        name: p.title,
        description: p.description,
        producer_name: p.brand ?? 'unknown',
        producer_email: `${(p.brand ?? 'unknown').toLowerCase().replace(/\s+/g, '')}@email.com`,
        thumbnail: p.thumbnail,
        cover: p.images?.[0] ?? p.thumbnail,
        price: String(p.price),
        created_at: new Date(),
        updated_at: new Date()
    }))


    console.log(`Inserting ${rows.length} products...`)

    await db.insert(products).values(rows)

    console.log('✅ Seed finshed.')
}

seed().catch((err) => {
    console.error('[Error to try run seed]:', err)
    process.exit(1)
})
