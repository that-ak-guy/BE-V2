import { GetData } from "../services/vault.service.js"

export const GetDataController = async (req, res) => {
    const { category = 'all', sort = "createdAt", page = '1', limit = '10' } = req.query
    const queryParams = { category, sort, page, limit }

    await GetData(queryParams)

    res.send({ category, sort, page, limit })
}

export const CreateDataController = async (req, res) => {

}

export const DeleteDataController = async (req, res) => {

}

export const UpdateDataController = async (req, res) => {

}