import { ProductControllers } from '../controllers/products.controllers'
import { ProductMiddlewares } from '../middlewares/products.middlewares'
import { querySchema, productSchema } from '../schemas'
import { validateSchema, parseRequest } from '../middlewares'
import { BaseRouter } from '../config/bases'
import multer from '../config/multer'

export class ProductRouter extends BaseRouter<
    ProductControllers,
    ProductMiddlewares
> {
    constructor() {
        super(ProductControllers, ProductMiddlewares)
        this.routes()
    }

    routes() {
        this.router.get(
            '/',
            [
                this.middlewares.checkIfUserIsLogged,
                parseRequest('query'),
                validateSchema(querySchema),
                this.middlewares.checkQuerySchema,
            ],
            this.controllers.getAllProducts
        )

        this.router.get(
            '/:id',
            [
                this.middlewares.checkIfUserIsLogged,
                this.middlewares.checkIfProductExists,
                this.middlewares.ifUserLoggedPushToHistory,
            ],
            this.controllers.getProduct
        )

        this.router.post(
            '/',
            this.auth.checkAdminAuth,
            [
                multer.single('product'),
                parseRequest('body'),
                validateSchema(productSchema),
                this.middlewares.checkBrandAndTags,
                this.middlewares.checkBodyAddProduct,
            ],
            this.controllers.addProduct
        )

        this.router.put(
            '/picture/:id',
            this.auth.checkAdminAuth,
            [
                multer.single('product'),
                this.middlewares.checkUpdatePictureProduct,
            ],
            this.controllers.productPictureUpdate
        )

        this.router.put(
            '/:id',
            this.auth.checkAdminAuth,
            [
                parseRequest('body'),
                validateSchema(productSchema),
                this.middlewares.checkBrandAndTags,
                this.middlewares.checkBodyEditProduct,
            ],
            this.controllers.productUpdate
        )

        this.router.delete(
            '/:id',
            this.auth.checkAdminAuth,
            this.middlewares.checkIfProductExists,
            this.controllers.deleteProduct
        )

        this.router.patch(
            '/:id',
            this.auth.checkAdminAuth,
            [
                parseRequest('body'),
                this.middlewares.checkIfProductExists,
                this.middlewares.checkUpdateProductAvailability,
            ],
            this.controllers.changeProductAvailability
        )
    }
}
