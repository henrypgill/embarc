import { Module } from "@nestjs/common";

import { UtilityController } from "./utility.controller";
import { UtilityService } from "./utility.service";

@Module({
    imports: [],
    controllers: [UtilityController],
    providers: [UtilityService],
})
export class UtilityModule {}
