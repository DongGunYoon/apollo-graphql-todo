import * as jwt from "jsonwebtoken"

export const validationToken = (token: string) => {
    try {
    const decoded = jwt.verify(token, 'asdf1234');
    return decoded
} catch(err) {
    return false
}
}