import { configDotenv } from "dotenv";
import { DeleteRefreshToken } from "./repositories/session.repo.js";
import { GenerateLogID } from "./utils/LogidUtil.js";
configDotenv()


const test = async (token) => {
    const res = await DeleteRefreshToken(token)

    console.log(res)
}

const token = 'dummydata'
await test(token)