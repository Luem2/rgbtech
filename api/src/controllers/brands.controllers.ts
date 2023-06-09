import type { Request, Response } from 'express'

import { BrandServices } from '../services/brands.services'
import { BaseControllers } from '../config/bases'

export class BrandControllers extends BaseControllers<BrandServices> {
    constructor() {
        super(BrandServices)
    }

    getAllBrands = async (_req: Request, res: Response) => {
        const brands = await this.services.getAllBrands()

        this.httpResponse.Ok(res, {
            msg: 'All brands have been successfully sent',
            brands_count: brands.length,
            brands,
        })
    }

    getBrand = async ({ body }: Request, res: Response) => {
        this.httpResponse.Ok(res, {
            msg: 'The brand has been successfully sent',
            brand: body,
        })
    }

    brandUpdate = async (req: Request, res: Response) => {
        const updatedBrand = await this.services.brandUpdate(req)

        this.httpResponse.Ok(res, {
            msg: 'Brand have been successfully updated',
            brand: updatedBrand,
        })
    }

    addBrand = async (req: Request, res: Response) => {
        const newBrand = await this.services.addBrand(req)

        this.httpResponse.Created(res, {
            msg: 'Brand have been successfully created',
            brand: newBrand,
        })
    }

    changeBrandAvailability = async (req: Request, res: Response) => {
        const brandUpdated = await this.services.changeBrandAvailability(req)

        this.httpResponse.Ok(res, {
            msg: 'Brand have been successfully updated',
            brand: brandUpdated,
        })
    }

    deleteBrand = async (req: Request, res: Response) => {
        const deletedBrand = await this.services.deleteBrand(req.body)

        this.httpResponse.Ok(res, {
            msg: 'Brand have been successfully deleted',
            brand: deletedBrand,
        })
    }
}
