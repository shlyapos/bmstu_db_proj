import React from "react";
import PostContainer from './PostContainer'

import InfiniteScroll from 'react-infinite-scroller';

class RefreshButton extends React.Component {
    render() {
        return (
            <button className="refresh_button feed_element" onClick={this.props.refreshFeed}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.14286 0C1.44596 0 1.73665 0.118526 1.95098 0.329505C2.16531 0.540483 2.28571 0.826631 2.28571 1.125V3.48862C3.23662 2.53381 4.41878 1.83297 5.72085 1.45213C7.02292 1.07129 8.40205 1.02298 9.72832 1.31176C11.0546 1.60053 12.2844 2.21688 13.3018 3.10275C14.3193 3.98862 15.0909 5.11486 15.544 6.37537C15.599 6.51573 15.6248 6.66551 15.6199 6.81585C15.6151 6.9662 15.5796 7.11406 15.5157 7.25069C15.4518 7.38732 15.3607 7.50995 15.2478 7.61131C15.1349 7.71267 15.0025 7.79072 14.8584 7.84083C14.7143 7.89094 14.5615 7.9121 14.4089 7.90306C14.2564 7.89401 14.1073 7.85495 13.9703 7.78817C13.8334 7.7214 13.7115 7.62827 13.6117 7.5143C13.512 7.40032 13.4365 7.26782 13.3897 7.12463C13.0447 6.16479 12.4417 5.31508 11.6448 4.66602C10.8479 4.01697 9.88706 3.5929 8.86464 3.43899C7.84223 3.28509 6.79655 3.40712 5.83904 3.79208C4.88152 4.17705 4.04805 4.81052 3.42743 5.625H6.85714C7.16025 5.625 7.45094 5.74353 7.66527 5.9545C7.87959 6.16548 8 6.45163 8 6.75C8 7.04837 7.87959 7.33452 7.66527 7.5455C7.45094 7.75647 7.16025 7.875 6.85714 7.875H1.14286C0.839753 7.875 0.549062 7.75647 0.334735 7.5455C0.120408 7.33452 0 7.04837 0 6.75V1.125C0 0.826631 0.120408 0.540483 0.334735 0.329505C0.549062 0.118526 0.839753 0 1.14286 0ZM1.152 10.1891C1.29353 10.1399 1.44351 10.1186 1.5934 10.1265C1.74328 10.1344 1.89012 10.1712 2.02554 10.2349C2.16096 10.2986 2.2823 10.388 2.38263 10.4979C2.48296 10.6078 2.56032 10.7361 2.61029 10.8754C2.95527 11.8352 3.55834 12.6849 4.35522 13.334C5.1521 13.983 6.11294 14.4071 7.13536 14.561C8.15777 14.7149 9.20345 14.5929 10.161 14.2079C11.1185 13.823 11.952 13.1895 12.5726 12.375H9.14286C8.83975 12.375 8.54906 12.2565 8.33474 12.0455C8.12041 11.8345 8 11.5484 8 11.25C8 10.9516 8.12041 10.6655 8.33474 10.4545C8.54906 10.2435 8.83975 10.125 9.14286 10.125H14.8571C15.1602 10.125 15.4509 10.2435 15.6653 10.4545C15.8796 10.6655 16 10.9516 16 11.25V16.875C16 17.1734 15.8796 17.4595 15.6653 17.6705C15.4509 17.8815 15.1602 18 14.8571 18C14.554 18 14.2633 17.8815 14.049 17.6705C13.8347 17.4595 13.7143 17.1734 13.7143 16.875V14.5114C12.7634 15.4662 11.5812 16.167 10.2792 16.5479C8.97708 16.9287 7.59796 16.977 6.27168 16.6882C4.9454 16.3995 3.71563 15.7831 2.69818 14.8973C1.68074 14.0114 0.909119 12.8851 0.456 11.6246C0.406012 11.4853 0.384392 11.3377 0.392374 11.1901C0.400356 11.0426 0.437784 10.898 0.502521 10.7647C0.567258 10.6314 0.658036 10.512 0.76967 10.4132C0.881305 10.3145 1.01161 10.2383 1.15314 10.1891H1.152Z" fill="black" />
                </svg>
            </button>
        );
    }
}

class PostCreator extends React.Component {
    constructor(props) {
        super(props);

        this.openPostCreate = this.openPostCreate.bind(this);
        this.buildNewPost = this.buildNewPost.bind(this);
        this.createRequest = this.createRequest.bind(this);

        this.state = {
            text: '',
            textTag: '',
            pics: '',
            picsTag: '',
            isCreate: false,
            userId: this.props.userId
        };
    }

    openPostCreate() {
        this.setState({ isCreate: true });
    }

    buildNewPost() {
        const text = document.getElementById('text_content');
        const textTags = document.getElementById('text_tags');

        const image = document.getElementById('image_content');
        const picsTags = document.getElementById('pics_tags');

        const newPost = {
            userId: this.state.userId,
            text: text.value,
            image: image.value,
            textTags: textTags.value,
            picsTags: picsTags.value,
            publicDate: new Date()
        };

        text.value = '';
        textTags.value = '';
        image.value = '';
        picsTags.value = '';

        return newPost;
    }

    createRequest() {
        let newPostContent = this.buildNewPost();
        this.props.fetchCreatePost(newPostContent);
    }

    render(props) {
        let createPostVisible = this.state.isCreate         ? 'flex' : 'none'
        let createVisible = this.props.userRole === 'guest' ? 'none' : 'flex';

        return (
            <div className="feed_element post_create" style={{display: createVisible}}>
                <textarea id="text_content" className="post_create__textarea post__create_text" onFocus={this.openPostCreate} placeholder="Расскажите что-то новенькое..."></textarea>
                
                <div className="post_create__wrapper" style={{display: createPostVisible}}>
                    <input id="text_tags" className="post_create__text_tag post__create_text" placeholder="Теги для вашего текста" />

                    <input id="image_content" className="post_create__text_tag post__create_text" placeholder="Url изображения" />
                    <input id="pics_tags" className="post_create__text_tag post__create_text" placeholder="Теги для вашего изображения" />
                    
                    <div className="post_create__btn_wrapper">
                        <button className="post_create__btn_accept" onClick={this.createRequest}>Accept</button>
                    </div>
                </div>
            </div>
        );
    }
};

class FeedContainer extends React.Component {
    constructor(props) {
        super(props);

        this.refreshFeed = this.refreshFeed.bind(this);
        this.supplyFeed = this.supplyFeed.bind(this);

        this.updateAllFeed = this.updateAllFeed.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
        this.addOldPost = this.addOldPost.bind(this);

        this.newPostsProcessing = this.newPostsProcessing.bind(this);

        this.fetchCreatePost = this.fetchCreatePost.bind(this);
        this.fetchDeletePost = this.fetchDeletePost.bind(this);

        this.placeholderDate = new Date();
        this.placeholderDate.setDate(this.placeholderDate.getDate() - 1);

        this.state = {
            posts: [],
            firstDate: this.placeholderDate,
            lastDate: this.placeholderDate,
            postInc: 10,
            userId: this.props.userId,
            userRole: this.props.userRole
        };
    }

    async componentDidMount() {
        await this.refreshFeed();
    }

    async updateAllFeed() {
        this.setState({
            posts: [],
            firstDate: this.placeholderDate,
            lastDate: this.placeholderDate, 
        });
    }

    async refreshFeed() {
        await fetch('/api/refresh', {
            method: 'POST',
            body: JSON.stringify({ 
                date: this.state.firstDate,
                role: this.state.userRole
            }),
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(async result => { 
            if (result.status === 200) {
                result.json().then(data => this.newPostsProcessing(data, this.addNewPost))
            }
            await this.supplyFeed();
        })
        .catch(error => console.log(error));
    }

    async supplyFeed() {
        await fetch('/api/supply', {
            method: 'POST',
            body: JSON.stringify({ 
                date: this.state.lastDate, 
                count: this.state.postInc,
                role: this.state.userRole
            }),
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(result => { 
            if (result.status === 200) 
                result.json().then(data => this.newPostsProcessing(data, this.addOldPost))
        })
        .catch(error => console.log(error));
    }

    addNewPost(feed, newPosts) {
        // newPosts.reverse();
        return newPosts.concat(feed);
    }

    addOldPost(feed, newPosts) {
        return feed.concat(newPosts);
    }

    newPostsProcessing(data, concatFunc) {
        this.setState((state) => {
            const newPostList = concatFunc(state.posts, data);

            const firstDate = newPostList[0].postInfo.public_date;
            const lastDate = newPostList[data.length - 1].postInfo.public_date;

            let newState = {
                posts: newPostList,
                firstDate: firstDate,
                lastDate: lastDate
            }

            return newState;
        })
    }

    async fetchCreatePost(newPost) {
        await fetch('/api/add/post', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(this.updateAllFeed())
        .catch(error => console.log(error));
    }

    async fetchDeletePost(postId) {
        await fetch('/api/del/post', {
            method: 'POST',
            body: JSON.stringify({ id: postId }),
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(this.updateAllFeed())
        .catch(error => console.log(error));
    }

    render(props) {
        document.querySelector("title").innerHTML = 'Shlyapka';
        
        return (
            <div className="feed_wrapper">
                <PostCreator userId={this.props.userId} userRole={this.props.userRole} fetchCreatePost={this.fetchCreatePost} />
                <RefreshButton refreshFeed={this.refreshFeed} />
                <InfiniteScroll pageStart={0} loadMore={this.supplyFeed} hasMore={true} initialLoad={false}>
                    {
                        this.state.posts.map(item => <PostContainer key={item.postInfo.id} 
                                                                    userId={this.props.userId} 
                                                                    userRole={this.props.userRole} 
                                                                    postId={item.postInfo.id} 
                                                                    rating={item.postInfo.rating} 
                                                                    author={item.postAuth} 
                                                                    text={item.postText} 
                                                                    picture={item.postPics}
                                                                    tags={item.postTags}
                                                                    reviews={item.postReview}
                                                                    fetchDeletePost={this.fetchDeletePost}
                                                    />)
                    }
                </InfiniteScroll>
            </div>
        );
    }
};

export default FeedContainer;