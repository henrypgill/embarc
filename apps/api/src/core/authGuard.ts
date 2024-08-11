import {
    type CanActivate,
    type ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import type { Request } from "express";
import { SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (process.env.NODE_ENV === "development") {
            return true;
        }

        if (isPublic) {
            // 💡 See this condition
            // make this typesafe so that the header is declared as not having a uid or user_id property
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            console.error("Unauthorized Exception 1");
            throw new UnauthorizedException();
        }

        try {
            // verify token in here
        } catch (error) {
            console.error("Unauthorized Exception 2", error);
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
