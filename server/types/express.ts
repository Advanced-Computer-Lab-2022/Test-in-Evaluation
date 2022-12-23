import {
    Express,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import { Session, SessionData } from "express-session";
import { Cookie } from "./cookies";
import * as core from "express-serve-static-core";
type CookieBypass = Cookie;

declare module "express-session" {
    interface Session {
        data: CookieBypass;
    }
}

export type RequestWithSession<ReqBody> = ExpressRequest<
    core.ParamsDictionary,
    any,
    ReqBody
> & { session: Session & Partial<SessionData> & { data: Cookie } };
export type Request<T = unknown> = RequestWithSession<T>;

export type Response = ExpressResponse;
