import { Controller, Get } from "@nestjs/common";

import { EventsService } from "./events.service";
import { Public } from "../../../core/authGuard";

@Controller("events")
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Public()
    @Get()
    async getAllEvents() {
        const events = await this.eventsService.getAllEvents();

        if (events) {
            return events;
        } else {
            return null;
        }
    }
}
