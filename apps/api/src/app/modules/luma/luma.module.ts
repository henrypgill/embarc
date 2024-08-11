import { Module } from "@nestjs/common";

import { LumaController } from "./luma.controller";
import { LumaService } from "./luma.service";

@Module({
    controllers: [LumaController],
    providers: [LumaService],
})
export class LumaModule {}
