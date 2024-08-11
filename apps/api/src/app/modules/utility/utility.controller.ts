import { Controller, Get } from "@nestjs/common";
import { Public } from "../../../core/authGuard";
import { UtilityService } from "./utility.service";

@Controller()
export class UtilityController {
    constructor(private readonly utilityService: UtilityService) {}

    @Public()
    @Get()
    async hello() {
        return {
            message: "hello",
        };
    }

    @Public()
    @Get("healthcheck")
    async healthCheck() {
        return "HEALTHY"; //TODO: implement a proper healthcheck
    }
}