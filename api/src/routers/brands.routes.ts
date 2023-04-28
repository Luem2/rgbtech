import { BrandControllers } from '../controllers/brands.controllers'
import { BrandMiddlewares } from '../middlewares/brands.middlewares'
import { parseBody, validateSchema } from '../middlewares'
import { brandSchema } from '../schemas'
import { BaseRouter } from '../config/bases'
import multer from '../config/multer'

export class BrandRouter extends BaseRouter<
    BrandControllers,
    BrandMiddlewares
> {
    constructor() {
        super(BrandControllers, BrandMiddlewares)
        this.routes()
    }

    routes() {
        this.router.get(
            '/',
            this.auth.checkAdminAuth,
            this.controllers.getAllBrands
        )

        this.router.get(
            '/:name',
            [this.auth.checkAdminAuth, this.middlewares.checkIfBrandExists],
            this.controllers.getBrand
        )

        this.router.put(
            '/:name',
            [
                multer.single('brand'),
                this.auth.checkAdminAuth,
                parseBody,
                validateSchema(brandSchema),
                this.middlewares.checkBodyEditBrand,
            ],
            this.controllers.brandUpdate
        )

        this.router.post(
            '/',
            [
                multer.single('brand'),
                this.auth.checkAdminAuth,
                parseBody,
                validateSchema(brandSchema),
                this.middlewares.checkBodyAddBrand,
            ],
            this.controllers.addBrand
        )

        this.router.patch(
            '/:name',
            [
                this.auth.checkAdminAuth,
                this.middlewares.checkUpdateBrandAvailability,
            ],
            this.controllers.changeBrandAvailability
        )

        this.router.delete(
            '/:name',
            [this.auth.checkAdminAuth, this.middlewares.checkIfBrandExists],
            this.controllers.deleteBrand
        )
    }
}
