import { IAccountRecord } from "../repository/Account";
import { IReviewRecord, ReviewRepository } from "../repository/Review";
import { BaseStorage } from "../storage/BaseStorage";

export interface IReview {
    reviewInfo: IReviewRecord,
    reviewAuth?: IAccountRecord
}

export default class ReviewService {
    private repository: ReviewRepository;

    constructor(currentStorage: BaseStorage) {
        this.repository = new ReviewRepository(currentStorage);
    }

    public async addReview(data: any, role: string): Promise<void> {
        const review: IReviewRecord = {
            post_id: data.postId,
            auth_id: data.userId,
            review_data: data.review,
            public_date: data.date,
        };

        await this.repository.create(review, role);
    }

    public async takeByPostId(id: number, role: string): Promise<IReviewRecord[]> {
        return await this.repository.filterByPostId(id, role);
    }

    public async deleteReviewByPostId(id: number, role: string): Promise<void> {
        await this.repository.deleteFKRecordsByPostId(id, role);
    }

    public async deleteById(id: number, role: string): Promise<void> {
        await this.repository.delete(id, role);
    }
};