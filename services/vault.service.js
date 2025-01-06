import { GetPasswordsByQuery } from "../repositories/vault.repo.js"

export const GetData = async (queryParams) => {
    await GetPasswordsByQuery(queryParams)
}

export const PutData = () => {

}