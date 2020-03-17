import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';

interface IPayload {

    header: { alg: string; typ: string },
    payload: {
        _id: string;
        iat: number;
        exp: number;
    },
    signature: string;
}

export const TokenValidacion = (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = (req.headers.authorization + '').split(" ")[1];
        // console.log("req.headers  ", req.headers);
        console.log("token", token);
        if (!token || token === "null") {
            console.log("null");
            return res.status(400).json({ message: 'Access denied' })
        }

        const decoded = jwt.decode(token, { complete: true }) as IPayload;

        console.log(decoded);
        console.log(decoded.signature);

        // console.log(new Date(+decoded.exp*1000));
        // console.log(new Date(+decoded.iat*1000));
        // console.log(new Date(new Date().setHours(new Date().getHours()+1)));

        console.log((+decoded.payload.exp) - (new Date().getTime() / 1000));

        if (decoded) {
            req.userId = decoded.payload._id;
        }
        if ((+decoded.payload.exp) - (new Date().getTime() / 1000) <= 0) {
            throw new Error("token expired");
        }

        // const payload = jwt.verify(token, process.env.TOKEN_SECRET || "text") as IPayload;
        // console.log(payload);
        // // console.log( new Date(+payload.iat*1000));
        // console.log( new Date(+payload.exp*1000));
        // //  req.userId = payload._id;
        next();
    }
    catch (er) {
        if (er.message === "invalid signature") {
            next();
        }
      //  console.log("er.message  ", er);
        return res.status(400).json({ er })
    }
}