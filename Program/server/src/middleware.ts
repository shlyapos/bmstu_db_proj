import * as jwt from 'jsonwebtoken'

const secret = 'sashka';

const withAuth = function (request: any, response: any, next: any): any {
    const token = request.body.token;

    if (!token) {
        response.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function (err: any, decoded: any) {
            if (err) {
                response.status(401).send('Unauthorized: Invalid token' + err);
            } else {
                request.user = {
                    id: decoded.user.id,
                    name: decoded.user.name,
                    role: decoded.user.role,
                    avatar: decoded.user.avatar
                }
                next();
            }
        });
    }
}

module.exports = withAuth;