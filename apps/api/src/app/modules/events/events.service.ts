import { Injectable } from "@nestjs/common";
import { database } from "api/src";

@Injectable()
export class EventsService {
    // constructor(private readonly notificationsService: NotificationsService) {}

    async getAllEvents() {
        const events = await database.events.find().toArray();
        if (events) {
            return events;
        } else {
            return null;
        }
    }
}
