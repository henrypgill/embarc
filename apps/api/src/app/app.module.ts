import { Module, type MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AppLoggerMiddleware } from "../core/AppLogger";
import { AuthGuard } from "../core/authGuard";
import { EventsModule } from "./modules/events/events.module";
import { UserModule } from "./modules/user/user.module";
import { UtilityModule } from "./modules/utility/utility.module";
import { LumaModule } from "./modules/luma/luma.module";
// import admin from "firebase-admin";

@Module({
    imports: [
        UserModule,
        EventsModule,
        LumaModule,
        UtilityModule,
        ConfigModule.forRoot({ cache: true }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    // exports: [NotificationsModule]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes("*");
    }
}
