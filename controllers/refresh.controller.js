import { VerifyAccessToken } from "../services/session.service.js"

export const RefreshController = async (req, res) => {
//     if (req.TokenState === false) {
//         res.status(401).send('No refresh token found.')
//     }
//     else {
//         const token = req.header('Authorization')
//         await VerifyAccessToken(token)
//         res.status(200).send('Refresh token found')
//     }
// }

res.send('Refresh')
}
