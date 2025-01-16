import { configDotenv } from "dotenv";
import { FindUserByEmail, FindUserByUuid } from "./repositories/auth.repo.js";
import { marshall } from "@aws-sdk/util-dynamodb";
import { ErrorMessages } from "./config/codes.js";
import { ContinuousBackupsUnavailableException, QueryCommand } from "@aws-sdk/client-dynamodb";
import DBClient from "./config/initDB.js";
configDotenv()

const uuid = 'ea6eed10-06d8-48fd-b375-c2983fbdd6ef'

const data = await FindUserByUuid(uuid);
console.log(process.env.PUBLIC_KEY)
