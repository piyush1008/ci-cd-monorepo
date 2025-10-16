import { JWT_SECRET } from "@repo/backend-common/index";
import * as jwt from "jsonwebtoken"


export const authMiddleware=(req:any,res:any,next:any)=>{
    try {
        const token=req.headers["authorization"];
        const decoded=jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        if(decoded)
        {
            //@ts-ignore
            req.userId=decoded.id;
            next();

        }
        else{
            res.status(403).json({
                message:"Unauthorized"
            })
        }
    } catch (error) {
        console.log(error);
    }
}