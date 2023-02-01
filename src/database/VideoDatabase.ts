import { TVideoDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";


export class VideoDatabase extends BaseDatabase {

    public static TABLE_VIDEOS = "videos"

    dadosConnection = BaseDatabase.connection

    public async findVideos(q: string | undefined) {

        let videosDB

        if (q) {
            const result: TVideoDB[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .where("title", "LIKE", `%${q}%`)
            videosDB = result
        } else {
            const result: TVideoDB[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            videosDB = result
        }
        return videosDB
    }

    public async findVideoById(id : string | undefined): Promise <TVideoDB | undefined>{
        const [ videoDBExists ]: TVideoDB[] | undefined[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .where({ id })
        return videoDBExists
    }

    public async insertVideo(newVideoDB: TVideoDB): Promise<void>{
        await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .insert(newVideoDB)
    }

}