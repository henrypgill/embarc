import { Injectable } from "@nestjs/common";
import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import type { Readable } from "stream";

@Injectable()
export class LumaService {
    // constructor(private readonly axios: AxiosInstance) {
    private readonly lumaApi: AxiosInstance = axios.create({
        baseURL: "https://api.lu.ma/public/v1/",
        timeout: 10000,
        headers: {
            accept: "application/json",
            "x-luma-api-key": process.env.LUMA_API_KEY,
        },
    });

    parseStream<T>(stream: Readable): Promise<T | null> {
        return new Promise((resolve, reject) => {

        const dataChunks: Buffer[] = [];
        stream.on("data", (chunk: Buffer) => {
            dataChunks.push(chunk);
        });


        stream.on("end", () => {
            const buffer: Buffer = Buffer.concat(dataChunks);

            try {
                const jsonResponse = JSON.parse(buffer.toString());
                resolve(jsonResponse);
            } catch (err) {
                reject(err);
            }
        });

        stream.on('error', (err: Error) => {
            reject(err);
        });
        })
    }

    async getAllLumaEvents() {
        const response: AxiosResponse<Readable> = await this.lumaApi.get(
            "calendar/list-events",
            { responseType: "stream",
                headers: {
                    'Accept-Encoding': 'gzip, deflate' // Exclude 'br' from accepted encodings
                }
            },
        );
        const stream = response.data;
        const data = await this.parseStream<{entries: LumaEvent[]}>(stream)
        if (!data) return null
        const events = data.entries

        if (events) {
            return events;
        } else {
            return null;
        }
    }

    // async getEventGuests(eventId: string, cursor = undefined) {
    //     if (!cursor) {
    //     const guests = await this.lumaApi.get(
    //         `https://api.lu.ma/public/v1/event/get-guests?event_api_id=${eventId}`,
    //         {
    //         headers: {
    //             "x-luma-api-key": "secret-gMdGZK5bQ0sTckQQ6ERtHPpWa",
    //             accept: "application/json",
    //             //  'Accept-Encoding': 'gzip',
    //         },
    //         }
    //     );
    //     return guests.data;
    //     }
    //     const guests = await axios.get(
    //     `https://api.lu.ma/public/v1/event/get-guests?event_api_id=${eventId}`,
    //     {
    //         params: { pagination_cursor: cursor },
    //         headers: {
    //         "x-luma-api-key": "secret-gMdGZK5bQ0sTckQQ6ERtHPpWa",
    //         accept: "application/json",
    //         //  'Accept-Encoding': 'gzip',
    //         },
    //     }
    //     );
    //     return guests.data;
    // }

    // async getAllEventGuests(eventId: string) {
    //     let hasMore = true;
    //     let cursor;
    //     const guestList = [];
    //     while (hasMore) {
    //     const guests = await getEventGuests(eventId, cursor);
    //     hasMore = guests.has_more;
    //     cursor = guests.next_cursor;
    //     guestList.push(...guests.entries);
    //     }
    //     return guestList;
    // }
}

