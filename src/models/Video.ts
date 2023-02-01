export class Video {
    constructor(
        private id: string,
        private title: string,
        private duration: number,
        private createdAt: string
    ) {}

    public getId = (): string => {
        return this.id
    }

    public getTitle = (): string => {
        return this.title
    }

    public getDuration = (): number => {
        return this.duration
    }

    public getCreatedAt = (): string => {
        return this.createdAt
    }

    public setId = (newId: string): void => {
        this.id = newId
    }
    public setTitle = (newTitle: string): void => {
        this.title = newTitle
    }
    public setDuration = (newDuration: number): void => {
        this.duration = newDuration
    }
    public setCreatedAt = (newCreatedAt: string): void => {
        this.createdAt = newCreatedAt
    }
}