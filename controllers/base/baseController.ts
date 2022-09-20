import { Model, Types } from "mongoose"
import { NextFunction, Request, Response } from "express"
import AuthRequest from '../../middleware/authenticate';

const create = <T>(model: Model<T>) => async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const body = { ...req.body } as T
    try {
        const doc = await model.create(body)
        res.status(200).send({ ok: true, data: doc })
    } catch (error) {
        res.send({ ok: false, msg: 'Element cannot be created' })
    }
}

const read = <T>(model: Model<T>) => async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const { id } = req.params

    try {
        const doc = await model.findById(id).lean().exec()
        res.status(200).send({ ok: true, data: doc })
    } catch (error) {
        console.log(error)
        res.send({ ok: false, msg: 'Element cannot be found' })
    }
}

const readAll = <T>(model: Model<T>) => async (_req: AuthRequest, res: Response, _next: NextFunction) => {

    try {
        const doc = await model.find({}).lean().exec()
        res.status(200).send({ ok: true, data: doc })
    } catch (error) {
        res.send({ ok: false, msg: 'Elements cannot be found' })
    }
}

const update = <T>(model: Model<T>) => async (req: AuthRequest, res: Response, _next: NextFunction) => {

    const { id } = req.params
    const body = { ...req.body } as T;

    try {
        const doc = await model.findByIdAndUpdate(id, { $set: { ...body } }, { new: true }).lean().exec()
        res.status(200).send({ ok: true, data: doc })
    } catch (error) {

        res.status(400).send({ ok: false, msg: 'Element cannot be updated' })
    }

}

const remove = <T>(model: Model<T>) => async (req: Request, res: Response, _next: NextFunction) => {

    const { id } = req.params

    try {
        const doc = await model.findByIdAndDelete(id);
        res.status(200).send({ ok: true, msg: "Element deleted succesfully" });
    } catch (error) {
        res.send({ ok: false, msg: 'Element cannot be deleted' })
    }
}

export { create, read, update, remove, readAll }

