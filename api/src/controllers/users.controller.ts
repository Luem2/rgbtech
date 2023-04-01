import type { Request, Response } from 'express'

import authServices from '../services/auth.service'
import usersServices from '../services/users.service'

class UsersController {
    async updateProfile(req: Request, res: Response) {
        const profileEdited = await usersServices.updateProfile(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The profile was successfully updated',
            body: profileEdited,
        })
    }

    async updatePassword(req: Request, res: Response) {
        const userWithPasswordUpdated = await authServices.passwordUpdate(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The password was successfully updated',
            body: userWithPasswordUpdated,
        })
    }

    async changeProfilePhoto(req: Request, res: Response) {
        await usersServices.changeProfilePhoto(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The profile photo was successfully updated',
        })
    }

    async getShoppingCart(req: Request, res: Response) {
        const user = await usersServices.getShoppingCart(req)

        res.status(200).send({
            status: 'Success',
            msg: `The user's shopping cart was successfully submitted`,
            body: user?.shoppingCart,
        })
    }

    async addItemToCart(req: Request, res: Response) {
        await usersServices.addItemToCart(req)

        const product = req.body.productId as string

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been added to cart`,
        })
    }

    async modifyItemQuantity(req: Request, res: Response) {
        await usersServices.modifyItemQuantity(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The item quantity has been modified',
        })
    }

    async deleteItemFromCart(req: Request, res: Response) {
        const product = req.params.productId

        await usersServices.deleteItemFromCart(req)

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been deleted from cart`,
        })
    }

    async cleanShoppingCart(req: Request, res: Response) {
        await usersServices.cleanShoppingCart(req)

        res.status(201).send({
            status: 'Success',
            msg: `The user's shopping cart was cleaned`,
        })
    }

    async getFavorites(req: Request, res: Response) {
        const favorites = await usersServices.getFavorites(req)

        res.status(200).send({
            status: 'Success',
            msg: `The user's favorites was successfully submitted`,
            body: favorites,
        })
    }

    async addItemToFavorites(req: Request, res: Response) {
        await usersServices.addItemToFavorites(req)

        const product = req.body.productId as string

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been added to favorites`,
        })
    }

    async deleteItemFromFavorites(req: Request, res: Response) {
        const product = req.params.productId

        await usersServices.deleteItemFromFavorites(req)

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been deleted from favorites`,
        })
    }

    async cleanFavorites(req: Request, res: Response) {
        await usersServices.cleanFavorites(req)

        res.status(201).send({
            status: 'Success',
            msg: `The user's favorites was cleaned`,
        })
    }

    async getUserReviews(req: Request, res: Response) {
        const user = await usersServices.getUserReviews(req)

        res.status(201).send({
            status: 'Success',
            msg: `The user's reviews was successfully submitted`,
            body: user?.reviews,
        })
    }

    async addReview(req: Request, res: Response) {
        await usersServices.addReview(req)

        res.status(201).send({
            status: 'Success',
            msg: `The review has been posted`,
        })
    }

    async getTransactions(req: Request, res: Response) {
        const user = await usersServices.getTransactions(req)

        res.status(200).send({
            status: 'Success',
            msg: `The user's transactions was successfully submitted`,
            body: user?.transactions,
        })
    }

    async getHistory(req: Request, res: Response) {
        const user = await usersServices.getHistory(req)

        res.status(200).send({
            status: 'Success',
            msg: `The user's history was successfully submitted`,
            body: user?.history,
        })
    }

    async addLastVisitedToHistory(req: Request, res: Response) {
        await usersServices.addLastVisitedToHistory(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The last product visited has been added to history',
        })
    }
}
export default new UsersController()
