import { NextRequest, NextResponse } from 'next/server'
import {
    getProductController,
    createProductController
} from '@/src/modules/products/controller/product.controller'


export async function POST(request: NextRequest) {
    const data = await request.json()
    const result = await createProductController(data)
    return NextResponse.json(result.body, { status: result.status })
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const result = await getProductController(params.id)
    return NextResponse.json(result.body, { status: result.status })
}

