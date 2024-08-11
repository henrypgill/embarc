import { Controller, Get } from "@nestjs/common";

import { LumaService } from "./luma.service";

@Controller("luma")
export class LumaController {
    constructor(private readonly lumaService: LumaService) {}

    @Get("events")
    async getAllLumaEvents() {
        const events = await this.lumaService.getAllLumaEvents();

        if (events) {
            return events;
        } else {
            return null;
        }
    }
}
