const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function checkAuth(req, res, next) {

    // 1. get the auth and refresh token from the cookies, if they dont exist return error
    // 2. check expiry of auth token, if auth token is not expired then all is well exit function
    // 3. check expiry of refresh token, if refresh token is expired then ask for re login 
    // 4. if refresh token is not expired but auth token is expired then regenerate both token and refresh token 

    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;

    console.log("check auth token MIDDLEWARE CALLED");

    if (!authToken || !refreshToken) {
        return res.status(401).json({
            message: 'Authentication failed : no authToken or refreshToken provided'
        })
    }

    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        // expired
        if (err) {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (refreshErr, refreshDecoded) => {
                // refresh token is expired & access token is expired
                if (refreshErr) {
                    // both tokens are invalid, access token is expired
                    return res.status(401).json({
                        message: 'Authentication failed : both tokens are INVALID'
                    });
                }
                // refresh token is not expired but access token is expired
                else {
                    const newAuthToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' })
                    const newRefreshToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_REFRESH_KEY, { expiresIn: '1d' })

                    res.cookie('authToken', newAuthToken, {httpOnly: true})
                    res.cookie('refreshToken', newRefreshToken, {httpOnly: true})
                    req.userId = refreshDecoded.userId;
                    next();
                }
            })
        }
        // not expired
        else {
            req.userId = decoded.userId;
            next();
        }
    })
}

module.exports = checkAuth; 