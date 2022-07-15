import * as jwt from 'jsonwebtoken'

export type JWTSecret = jwt.Secret
export const privateKey = process.env.SECRET_REFRESH as JWTSecret || 'secrettt'
export const publicKey = process.env.SECRET_ACCESS as JWTSecret || 'secrettt'

export function signAccessToken(payload: object) {
    return jwt.sign(payload, publicKey, {
        expiresIn: '5m'
    })
}

export function signRefreshToken(payload: object) {
    return jwt.sign(payload, privateKey, {
        expiresIn: '7d'
    })
}

export function verifyToken<T>(token: string, key: JWTSecret): T | null {

    try {
        const decoded = jwt.verify(token, key)
        return decoded as T
    } catch (error) {
        return null
    }
    
}