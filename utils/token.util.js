import { randomBytes } from "crypto"

export const GenerateToken = () => {
    return randomBytes(32).toString('hex')
}
