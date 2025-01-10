import { SuccessCodes, SuccessMessages } from "../config/codes.js"
import { CreateAccessToken, VerifyAccessToken } from "../services/session.service.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const RefreshController = asyncHandler(async (req, res) => {
    const { uuid, role } = req.tokenData

    const userData = { uuid: uuid, role: role }

    const tokenRes = await CreateAccessToken(userData)
    if (!tokenRes.state) {
        throw tokenRes.error
    }

    res.status(200).json(new ApiResponse(200, SuccessCodes.TokenSigned, SuccessMessages.TokenSigned, tokenRes.data))
})
