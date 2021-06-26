import { PostRepository, IPostRecord } from "../repository/Post";
import { PostTextRepository, IPostTextRecord } from "../repository/PostText";
import { PostPictureRepository, IPostPicsRecord } from "../repository/PostPicture";

import { IAccountRecord } from '../repository/Account';
import { IReview } from "./Review";

import { BaseStorage } from "../storage/BaseStorage";
import { ITagRecord, TagRepository } from "../repository/Tag";

export interface IPost {
    postInfo: IPostRecord,
    postText: IPostTextRecord,
    postAuth?: IAccountRecord,
    postPics: IPostPicsRecord[],
    postTags?: ITagRecord[],
    postReview?: IReview[]
};

export class PostService {
    private postRep: PostRepository;
    private textRep: PostTextRepository;
    private pictRep: PostPictureRepository;
    private tagRep: TagRepository;

    constructor(currentStorage: BaseStorage) {
        this.postRep = new PostRepository(currentStorage);
        this.textRep = new PostTextRepository(currentStorage);
        this.pictRep = new PostPictureRepository(currentStorage);
        this.tagRep = new TagRepository(currentStorage);
    }

    public async addPost(data: any, role: string): Promise<void> {
        await this.postRep.create({
            author_id: data.userId,
            rating: 0,
            public_date: data.publicDate
        }, role);

        const authorPosts = await this.postRep.filterByAuthorId(data.userId, role);
        const currentPostId = authorPosts[authorPosts.length - 1].id;   // Take last post

        if (data.text !== '') {
            await this.textRep.create({ data: data.text }, role);
            const currentTextId = (await this.textRep.filterByData(data.text, role))[0].id;

            await this.textRep.createFKPost(currentPostId, currentTextId, role);

            const textTags = data.textTags.split(' ');

            this.tagValidation(textTags);

            for await (let tag of textTags) {
                try {
                    await this.tagRep.create({ name: tag }, role);
                } catch {
                    continue;
                }
            }

            await this.connectTextWithTag(currentTextId, textTags, role);
        }

        if (data.image !== '') {
            await this.pictRep.create({ path: data.image }, role);

            const imagesWithPath = await this.pictRep.filterByPath(data.image, role);
            const currentImageId = imagesWithPath[imagesWithPath.length - 1].id;

            await this.pictRep.createFKPost(currentPostId, currentImageId, role)

            const picsTags = data.picsTags.split(' ');

            for await (let tag of picsTags) {
                try {
                    await this.tagRep.create({ name: tag }, role);
                } catch {
                    continue;
                }
            }

            await this.connectImageWithTag(currentImageId, picsTags, role);
        }
    }

    public async deletePost(id: number, role: string) {
        await this.textRep.deleteFKRecordsByPostId(id, role);
        await this.pictRep.deleteFKRecordsByPostId(id, role);

        await this.postRep.delete(id, role);
    }

    public async takeNewPosts(date: Date, role: string): Promise<any> {
        const postInfoArray = await this.postRep.filterByDateEarly(date, role);

        if (postInfoArray.length === 0)
            throw new Error('There is no data ');

        return await this.buildPost(postInfoArray, role);
    }

    public async takeOldPosts(date: Date, count: number, role: string): Promise<any> {
        const postInfoArray = await this.postRep.filterByDateLater(date, count, role);

        if (postInfoArray.length === 0)
            throw new Error('There is no data ');

        return await this.buildPost(postInfoArray, role);
    }

    public async incRatingPost(id: number, role: string): Promise<void> {
        const post = await this.postRep.takeById(id, role);
        await this.postRep.updatePostRating(id, post.rating + 1, role);
    }

    public async decRatingPost(id: number, role: string): Promise<void> {
        const post = await this.postRep.takeById(id, role);
        await this.postRep.updatePostRating(id, post.rating - 1, role);
    }


    // Private methods
    private buildPost(postInfoArray: IPostRecord[], role: string): Promise<IPost[]> {
        return new Promise<IPost[]>(async (resolve, reject) => {
            let posts: IPost[] = [];

            for await (let post of postInfoArray) {
                let text: IPostTextRecord;
                let pics: IPostPicsRecord[];
                let tags: ITagRecord[] = [];

                await this.textRep.takeByPostId(post.id, role)
                    .then(async result => {
                        if (result.length === 0)
                            text = null;
                        else {
                            text = result[0];
                            const textTags = await this.tagRep.takeByTextId(text.id, role);

                            textTags.map((item: any) => tags.push({ id: item.tag_id, name: item.name }));
                        }
                    })
                    .catch(error => { throw error })

                await this.pictRep.takeByPostId(post.id, role)
                    .then(async result => {
                        if (result.length === 0)
                            pics = null;
                        else {
                            pics = [result[0]]; // This is bad!
                            const pictText = await this.tagRep.takeByPictureId(pics[0].id, role);

                            pictText.map((item: any) => tags.push({ id: item.tag_id, name: item.name }));
                        }
                    })
                    .catch(error => { throw error });

                posts.push({
                    postInfo: post,
                    postText: text,
                    postPics: pics,
                    postTags: tags
                });
            }
            resolve(posts);
        });
    }

    private async connectTextWithTag(textId: number, tags: string[], role: string): Promise<void> {
        for await (let tag of tags) {
            const currentTagId = (await this.tagRep.takeByName(tag, role))[0].id;
            await this.tagRep.createFKByTextId(textId, currentTagId, role);
        }
    }

    private async connectImageWithTag(imageId: number, tags: string[], role: string): Promise<void> {
        for await (let tag of tags) {
            const currentTagId = (await this.tagRep.takeByName(tag, role))[0].id;
            await this.tagRep.createFKByImageId(imageId, currentTagId, role);
        }
    }

    private tagValidation(tags: string[]): void {
        // let len = tags.length;

        // for (let i = 0; i < len; i++) {
        //     if (tags[i] === ' ' || tags[i] === '') {
        //         tags.s
        //     }
        // }
    }
};