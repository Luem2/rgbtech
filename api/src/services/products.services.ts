import type { Prisma } from '@prisma/client'
import type { Request } from 'express'
import type { IQueryParams, ProductSchema } from '../types'

import { db } from '../database'
import { deleteFile } from '../helpers/fsFunctions'
import { CORE } from '../helpers/constants'

export class ProductServices {
    readonly userInfoSelectedToSubmit: Prisma.ProductSelect
    readonly adminInfoIncludedToSubmit: Prisma.ProductInclude

    constructor() {
        this.userInfoSelectedToSubmit = {
            _count: {
                select: {
                    usersFavorite: true,
                    reviews: true,
                    tags: true,
                },
            },
            id: true,
            name: true,
            description: true,
            price: true,
            specifications: true,
            picture: true,
            stock: true,
            onDiscount: true,
            discountPercentage: true,
            freeShipping: true,
            rating: true,

            tags: true,
            brand: true,
            reviews: true,
        }
        this.adminInfoIncludedToSubmit = {
            _count: true,
            brand: true,
            reviews: true,
            shoppingCarts: true,
            tags: true,
            usersFavorite: true,
            usersHistory: true,
        }
    }

    async getAllProducts(userRole: Request['userRole']) {
        if (userRole !== 'ADMIN') {
            return await db.product.findMany({
                where: {
                    disabled: {
                        not: true,
                    },
                },
                select: this.userInfoSelectedToSubmit,
            })
        } else
            return await db.product.findMany({
                include: this.adminInfoIncludedToSubmit,
            })
    }

    async getQueryProducts({ parsedQuery, userRole }: Request) {
        const queryParams: IQueryParams = parsedQuery

        const wherePrismaFilter: Prisma.ProductWhereInput = {
            brand: {
                name: this.isNotEmpty(queryParams.brand)
                    ? {
                          equals: queryParams.brand,
                          mode: 'insensitive',
                      }
                    : undefined,
            },

            name: this.isNotEmpty(queryParams.name)
                ? {
                      contains: queryParams.name,
                      mode: 'insensitive',
                  }
                : undefined,

            price: this.isNotEmpty(queryParams.price)
                ? {
                      gte: queryParams.price?.greaterThan,
                      lte: queryParams.price?.lessThan,
                  }
                : undefined,

            rating: this.isNotEmpty(queryParams.rating)
                ? {
                      lte: queryParams.rating?.lessThan,
                      gte: queryParams.rating?.greaterThan,
                      equals: queryParams.rating?.equals,
                  }
                : undefined,

            tags: {
                some: {
                    name: queryParams.tags?.length
                        ? {
                              in: queryParams.tags,
                              mode: 'insensitive',
                          }
                        : undefined,
                },
            },

            stock: this.isNotEmpty(queryParams.stock)
                ? {
                      gte: queryParams.stock?.greaterThan,
                      lte: queryParams.stock?.lessThan,
                  }
                : undefined,

            onDiscount: {
                equals: queryParams.onDiscount,
            },

            freeShipping: {
                equals: queryParams.freeShipping,
            },
        }

        const orderByPrismaFilter: Prisma.ProductOrderByWithRelationInput = {
            brand: {
                name:
                    queryParams.orderBy?.value === 'brand'
                        ? queryParams.orderBy.order
                        : undefined,
            },
            name:
                queryParams.orderBy?.value === 'name'
                    ? queryParams.orderBy.order
                    : undefined,
            price:
                queryParams.orderBy?.value === 'price'
                    ? queryParams.orderBy.order
                    : undefined,
            rating:
                queryParams.orderBy?.value === 'rating'
                    ? queryParams.orderBy.order
                    : undefined,
            stock:
                queryParams.orderBy?.value === 'stock'
                    ? queryParams.orderBy.order
                    : undefined,
        }

        if (userRole === 'ADMIN') {
            return await db.product.findMany({
                where: wherePrismaFilter,
                orderBy: orderByPrismaFilter,
                include: this.adminInfoIncludedToSubmit,
            })
        } else
            return await db.product.findMany({
                where: {
                    ...wherePrismaFilter,
                    disabled: {
                        equals: false,
                    },
                },
                orderBy: orderByPrismaFilter,
                select: this.userInfoSelectedToSubmit,
            })
    }

    isNotEmpty(arg: string | Record<string, unknown> | undefined) {
        switch (typeof arg) {
            case 'string':
                return Boolean(arg)
            case 'object':
                return Boolean(Object.keys(arg).length)
            default:
                return false
        }
    }

    async getProduct({ userRole, params }: Request) {
        if (userRole !== 'ADMIN') {
            return await db.product.findFirst({
                where: {
                    id: params.productId,
                    AND: {
                        disabled: {
                            not: true,
                        },
                    },
                },
                select: {
                    _count: {
                        select: {
                            usersFavorite: true,
                            reviews: true,
                            tags: true,
                        },
                    },
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    specifications: true,
                    picture: true,
                    stock: true,
                    onDiscount: true,
                    discountPercentage: true,
                    freeShipping: true,
                    rating: true,

                    tags: true,
                    brand: true,
                    reviews: true,
                },
            })
        } else {
            return await db.product.findUnique({
                where: {
                    id: params.productId,
                },
                include: {
                    _count: true,
                    brand: true,
                    reviews: true,
                    shoppingCarts: true,
                    tags: true,
                    usersFavorite: true,
                    usersHistory: true,
                },
            })
        }
    }

    async productUpdate(product: ProductSchema) {
        const { id, ...body } = product

        return await db.product.update({
            where: {
                id,
            },
            data: {
                ...body,
                brand: {
                    connect: {
                        name: product.brand,
                    },
                },
                tags: {
                    connectOrCreate: product.tags.map((tag) => ({
                        where: {
                            name: tag,
                        },
                        create: {
                            name: tag,
                        },
                    })),
                },
            },
        })
    }

    async productPictureUpdate({ file, query }: Request) {
        // REFACTOR: REFACTORIZAR PARA PONER EL FILE EN MIDDLEWARES, Y LA VALIDACION DE SI EXISTE EL PRODUCTO
        const id = query.id as string

        const product = await db.product.findUnique({
            where: {
                id,
            },
            select: {
                picture: true,
            },
        })

        if (!product) return null

        const oldFileName = product.picture.split('/').pop() as string
        const fileName = (file as Express.Multer.File).filename

        deleteFile({
            nameFolder: CORE,
            fileName: oldFileName,
        })

        return await db.product.update({
            where: {
                id,
            },
            data: {
                picture: `/uploads/${CORE}/${fileName}`,
            },
        })
    }

    async addProduct(body: Request['body']) {
        const newProduct = body as ProductSchema

        return await db.product.create({
            data: {
                ...newProduct,
                brand: {
                    connect: {
                        name: newProduct.brand,
                    },
                },
                tags: {
                    connectOrCreate: newProduct.tags.map((tag) => ({
                        where: {
                            name: tag,
                        },
                        create: {
                            name: tag,
                        },
                    })),
                },
            },
        })
    }

    async changeProductAvailability({ params, body }: Request) {
        return await db.product.update({
            where: {
                id: params.productId,
            },
            data: {
                disabled: body.disabled,
            },
        })
    }

    async deleteProduct({ params }: Request) {
        // REFACTOR: REFACTORIZAR PARA PONER ELIMINAR EL FILE EN MIDDLEWARES, Y LA VALIDACION DE SI EXISTE EL PRODUCTO
        const product = await db.product.findUnique({
            where: {
                id: params.productId,
            },
            select: {
                picture: true,
            },
        })

        if (!product) return null

        const fileName = product.picture.split('/').pop() as string

        deleteFile({
            nameFolder: CORE,
            fileName,
        })

        return await db.product.delete({
            where: {
                id: params.productId,
            },
        })
    }
}
