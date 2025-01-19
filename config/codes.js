export const ErrorCodes = {
    Expiredtoken: 'EXPIRED_TOKEN',
    Invalidtoken: 'INVALID_TOKEN',
    Notoken: 'NO_TOKEN',
    Internalerror: 'INTERNAL_ERROR',
    Userconflict: 'USER_CONFLICT',
    Usernotfound: 'USER_NOT_FOUND',
    Emailexists: 'UNIQUE_EMAIL',
    InvalidPass: 'INVALID_PASSWORD',
    Datanotfound: 'NO_DATA',
    InvalidData: 'INVALID_DATA'
}

export const ErrorMessages = {
    Expiredtoken: 'Your token has expired.',
    Invalidtoken: 'Invalid token.',
    Notoken: 'No token provided.',
    Internalerror: 'An internal error occurred.',
    Userconflict: 'Valid Session already exists.',
    Usernotfound: 'User not found.',
    Emailexists: 'Email already exists.',
    InvalidPass: 'Wrong password.',
    Datanotfound: 'No data was found in the request.',
    InvalidData: 'Invalid data was received.'
}

export const SuccessCodes = {
    TokenSigned: 'TOKEN_SIGNED',
    Loginsuccess: 'LOGIN_SUCCESS',
    Registersuccess: 'REGISTER_SUCCESS',
    Logoutsuccess: 'LOGOUT_SUCCESS'
}

export const SuccessMessages = {
    TokenSigned: 'Token Signed successfully.',
    Loginsuccess: 'User login successful.',
    Registersuccess: 'User Registered successfully.',
    Logoutsuccess: 'User successfully logged out.'
}
