class PostAuthor extends React.Component {
    constructor(props) {
        super(props)
    }

    render(props) {
        return (
            <div className="post_author">
                <img className="author_avatar" src={this.props.avatar} alt={this.props.name} />
                <h3 className="author_name user_name">{this.props.name}</h3>
            </div>
        );
    }
}

class PostContent extends React.Component {
    constructor(props) {
        super(props)
    }

    render(props) {
        return (
            <div className="post_content">
                <p className="post_text" style={{whiteSpace: "pre-line"}}>{this.props.text}</p>
                <img className="post_image" src={this.props.image} alt="" />
            </div>
        );
    }
}

class PostWrapper extends React.Component {
    render(props) {
        return (
            <div className="post_wrapper feed_element">
                <PostAuthor avatar={this.props.author.avatar} name={this.props.author.name}/>
                <PostContent text={this.props.content.text} image={this.props.content.image}/>
            </div>
        );
    }
}

class PostComments extends React.Component {
    constructor(props) {
        super(props)

        this.state = { isOpen: false }
    }

    render(props) {
        let displayStatus;
        if (this.props.commentsState) 
            displayStatus = "block"
        else 
            displayStatus = "none";

        return (
            <div className="post_commentary feed_element" style={{display: displayStatus}}>
                <div className="comment_send_wrapper">
                    <input type="text" className="comment_input" placeholder="Ваш комментарий..." />
                    <button className="comment_send">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 7L14 10L11 7ZM14 10L11 13L14 10ZM14 10H6H14ZM19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>    
                <div className="comment_wrapper">
                    <div className="comment">
                        <img src="../img/avatar_nikita.png" alt="Никита Павлов" className="comment_author_avatar" />
                        <div className="comment_content">
                            <p className="comment_name">Никита Павлов</p>
                            <p className="comment_text">Очень люблю делать куличики в своём городе, Новосибирск, крайне расслабляет</p>
                            <p className="comment_time">02.04.2021 в 12:30</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PostActionBlock extends React.Component {
    render(props) {
        let commentIcon

        if (this.props.commentsState)
            commentIcon = <path fillRule="evenodd" clipRule="evenodd" d="M0.438738 0.457933C0.719747 0.176726 1.10083 0.0187527 1.49817 0.0187527C1.89552 0.0187527 2.2766 0.176726 2.55761 0.457933L8.99063 6.89743L15.4237 0.457933C15.5619 0.314667 15.7272 0.200394 15.9101 0.12178C16.0929 0.0431668 16.2895 0.00178736 16.4885 5.66356e-05C16.6875 -0.00167409 16.8848 0.0362782 17.0689 0.111699C17.2531 0.187121 17.4204 0.2985 17.5611 0.43934C17.7018 0.580179 17.8131 0.747657 17.8884 0.932001C17.9638 1.11635 18.0017 1.31387 17.9999 1.51303C17.9982 1.7122 17.9569 1.90903 17.8783 2.09204C17.7998 2.27504 17.6856 2.44056 17.5425 2.57893L11.1095 9.01843L17.5425 15.4579C17.8155 15.7408 17.9665 16.1197 17.9631 16.513C17.9597 16.9063 17.8021 17.2825 17.5243 17.5607C17.2464 17.8388 16.8706 17.9965 16.4777 17.9999C16.0848 18.0034 15.7063 17.8522 15.4237 17.5789L8.99063 11.1394L2.55761 17.5789C2.27499 17.8522 1.89646 18.0034 1.50356 17.9999C1.11066 17.9965 0.734825 17.8388 0.456992 17.5607C0.179159 17.2825 0.0215641 16.9063 0.0181499 16.513C0.0147358 16.1197 0.165776 15.7408 0.438738 15.4579L6.87177 9.01843L0.438738 2.57893C0.157815 2.29764 0 1.91618 0 1.51843C0 1.12069 0.157815 0.739224 0.438738 0.457933Z" fill="#555555"/>
        else
            commentIcon = <path fillRule="evenodd" clipRule="evenodd" d="M18 2.25V11.25C18 11.8467 17.7629 12.419 17.341 12.841C16.919 13.2629 16.3467 13.5 15.75 13.5H10.125L4.5 18V13.5H2.25C1.65326 13.5 1.08097 13.2629 0.65901 12.841C0.237053 12.419 0 11.8467 0 11.25V2.25C0 1.65326 0.237053 1.08097 0.65901 0.65901C1.08097 0.237053 1.65326 0 2.25 0H15.75C16.3467 0 16.919 0.237053 17.341 0.65901C17.7629 1.08097 18 1.65326 18 2.25ZM5.625 5.625H3.375V7.875H5.625V5.625ZM7.875 5.625H10.125V7.875H7.875V5.625ZM14.625 5.625H12.375V7.875H14.625V5.625Z" fill="#555555"/>        
        
        return (
            <div className="post_action_block">
                <div className="action_move_block feed_element">
                    <button className="action_button plus">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="8.09998" width="1.8" height="18" fill="#C4C4C4"/>
                            <rect y="9.89999" width="1.8" height="18" transform="rotate(-90 0 9.89999)" fill="#C4C4C4"/>
                        </svg>
                    </button>
        
                    <p className="rating">3872</p>
        
                    <button className="action_button minus">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="9.89999" width="1.8" height="18" transform="rotate(-90 0 9.89999)" fill="#C4C4C4"/>
                        </svg>
                    </button>
        
                    <button className="action_button comment_btn" onClick={this.props.changeCommentsVisible}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {commentIcon}
                        </svg>
                    </button>
                </div>
            </div>
        );
    }
}

class PostContainer extends React.Component {
    constructor(props) {
        super(props)

        this.changeCommentsVisible = this.changeCommentsVisible.bind(this);
        this.state = { commentsVisible: false };
    }

    changeCommentsVisible() {
        this.setState(state => {
            return { commentsVisible: !state.commentsVisible }
        });
    }

    render(props) {
        return (
            <section className="post" style={{paddingLeft: this.state.commentsVisible ? "0px" : "205px"}}>
                <PostWrapper author={this.props.author} content={this.props.content}/>
                <PostComments commentsState={this.state.commentsVisible}/>
                <PostActionBlock commentsState={this.state.commentsVisible} changeCommentsVisible={this.changeCommentsVisible}/>
            </section>
        );
    }
}

export default PostContainer