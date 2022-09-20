"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autheticate = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = tslib_1.__importDefault(require("../config/config"));
const autheticate = async (req, res, next) => {
    const authorization = req.headers["authorization"];
    if (!authorization)
        return res.status(401).send({ ok: false });
    const token = authorization.split(" ")[1];
    (0, jsonwebtoken_1.verify)(token, config_1.default.app.PRIVATE_KEY, (error, decodeToken) => {
        if (error)
            return res.status(401).send({ ok: false });
        if (decodeToken !== null) {
            req.user = decodeToken;
            next();
        }
    });
};
exports.autheticate = autheticate;
//# sourceMappingURL=authenticate.js.map