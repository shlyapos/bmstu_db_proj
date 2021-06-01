import PostRepository from "../repository/Post";
import PostTextRepository from "../repository/PostText";
import PostPictureRepository from "../repository/PostPicture";

import { BaseStorage } from "../storage/BaseStorage";

export default class PostService {
    private postRep: PostRepository;
    private textRep: PostTextRepository;
    private pictRep: PostPictureRepository;

    constructor(currentStorage: BaseStorage) {
        this.postRep = new PostRepository(currentStorage);
        this.textRep = new PostTextRepository(currentStorage);
        this.pictRep = new PostPictureRepository(currentStorage);
    }

    public async addPost(date: any) {
        this.postRep.create(date);
    }

    public async takePost() {

    }

    public async editPost() {

    }

    public async deletePost() {

    }

    public async takeNewPosts(date: Date): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.postRep.filterByDateEarly(date)
                .then(async result => {
                    let posts = [];

                    for await (let post of result) {
                        let text, pics;

                        await this.textRep.takeByPostId(post.id)
                            .then(result => {
                                if (result.length === 0) text = 'none';
                                else text = result[0];
                            })
                            .catch(error => { throw error })

                        await this.pictRep.takeByPostId(post.id)
                            .then(result => {
                                if (result.length === 0) pics = 'none';
                                else pics = result;
                            })
                            .catch(error => { throw error });

                        posts.push({
                            postInfo: post,
                            postText: text,
                            postPics: pics
                        });
                    }
                    resolve(posts);
                })
                .catch(error => reject(error));
        });
    }

    public async takeOldPosts(date: Date, count: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.postRep.filterByDateLater(date)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    private buidPost() {

    }
};