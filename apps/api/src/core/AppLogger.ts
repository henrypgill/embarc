import { Injectable, type NestMiddleware, Logger } from "@nestjs/common";

import type { Request, Response, NextFunction } from "express";

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    private logger = new Logger("HTTP");

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request; //TODO: Log who made the request (e.g. the user_id)
        const userAgent = request.get("user-agent") || "";
        response.on("close", () => {
            const { statusCode } = response;
            const contentLength = response.get("content-length");

            this.logger.log(
                `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
            );
        });

        next();
    }
}
