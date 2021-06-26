import { IAccountRecord } from './repository/Account';
import { IReviewRecord } from './repository/Review';

import AccountService from './service/Account';
import { PostService, IPost } from './service/Post';
import ReviewService, { IReview } from './service/Review';

import PgStorage from "./storage/PgStorage";

export default class Manager {
    private accountService: AccountService;
    private postService: PostService;
    private reviewService: ReviewService;

    private role: string = 'guest';

    constructor() {
        let storage = new PgStorage();

        this.accountService = new AccountService(storage);
        this.postService = new PostService(storage);
        this.reviewService = new ReviewService(storage);
    }

    public async signin(userData: any): Promise<IAccountRecord> {
        return await this.accountService.checkUser(userData, this.role)
    }

    public async signup(userData: any): Promise<IAccountRecord> {
        userData.role = 'log_user';

        const newUserData = await this.accountService.addUser(userData, this.role);
        return await this.accountService.checkUser(newUserData, this.role)
    }

    public async addAdmin(userData: any): Promise<IAccountRecord> {
        userData.role = 'admin';
        return await this.accountService.addUser(userData, this.role);
    }

    public async loadNewPosts(lastDate: Date): Promise<IPost[]> {
        let postArray = await this.postService.takeNewPosts(lastDate, this.role);
        return await this.searchPostAuthor(postArray);
    }

    public async loadOldPosts(lastDate: Date, count: number): Promise<IPost[]> {
        let postArray = await this.postService.takeOldPosts(lastDate, count, this.role);
        return await this.searchPostAuthor(postArray);
    }

    public async addPost(newData: any): Promise<void> {
        let publicDate: Date = new Date(newData.publicDate);
        publicDate.setHours(publicDate.getHours() + 3);

        newData.publicDate = publicDate;

        await this.postService.addPost(newData, this.role);
    }

    public async deletePost(id: number): Promise<void> {
        await this.reviewService.deleteReviewByPostId(id, this.role);
        await this.postService.deletePost(id, this.role);
    }

    public async incRating(id: number): Promise<void> {
        await this.postService.incRatingPost(id, this.role);
    }

    public async decRating(id: number): Promise<void> {
        await this.postService.decRatingPost(id, this.role);
    }

    public async addReview(newData: any): Promise<void> {
        await this.reviewService.addReview(newData, this.role);
    }

    public async deleteReview(id: number): Promise<void> {
        await this.reviewService.deleteById(id, this.role);
    }

    public setRole(newRole: string): void {
        this.role = newRole;
    }

    private async searchPostAuthor(posts: IPost[]): Promise<IPost[]> {
        for await (let post of posts) {
            let author: IAccountRecord;
            let review: IReviewRecord[];
            let reviewArray: IReview[];

            await this.accountService.takeRecordById(post.postInfo.author_id, this.role)
                .then(result => author = result)
                .catch(error => { throw new Error("\n\nError: in file " + __filename + 'err: ' + error) });

            await this.reviewService.takeByPostId(post.postInfo.id, this.role)
                .then(async result => review = result)
                .catch(error => { throw new Error("\n\nError: in file " + __filename + 'err: ' + error) });

            await this.searchReviewsAuthor(review)
                .then(result => reviewArray = result)

            post.postAuth = author;
            post.postReview = reviewArray;
        }

        return posts;
    }

    private async searchReviewsAuthor(reviews: IReviewRecord[]): Promise<IReview[]> {
        let reviewArray: IReview[] = [];

        for await (let review of reviews) {
            let author: IAccountRecord;

            await this.accountService.takeRecordById(review.auth_id, this.role)
                .then(result => author = result)
                .catch(error => { throw new Error("\n\nError: in file " + __filename + 'err: ' + error) });

            reviewArray.push({
                reviewInfo: review,
                reviewAuth: author
            });
        }

        return reviewArray.reverse();
    }
};