export const ErrorCodes = {
    Expiredtoken: 'EXPIRED_TOKEN',
    Invalidtoken: 'INVALID_TOKEN',
    Notoken: 'NO_TOKEN',
    Internalerror: 'INTERNAL_ERROR',
    Userconflict: 'USER_CONFLICT',
    Usernotfound: 'USER_NOT_FOUND',

    InvalidPass: 'INVALID_PASSWORD',
}

export const ErrorMessages = {
    Expiredtoken: 'Your token has expired.',
    Invalidtoken: 'Invalid token.',
    Notoken: 'No token provided.',
    Internalerror: 'An internal error occurred.',
    Userconflict: 'Valid Session already exists.',
    Usernotfound: 'User not found.',

    InvalidPass: 'Wrong password.',

}

export const SuccessCodes = {
    TokenSigned: 'TOKEN_SIGNED',
    Loginsuccess: 'LOGIN_SUCCESS',
}

export const SuccessMessages = {
    TokenSigned: 'Token Signed successfully.',
    Loginsuccess: 'User login successful.',
}
