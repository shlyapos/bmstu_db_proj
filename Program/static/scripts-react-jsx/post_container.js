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
    }
}

class PostActionBlock extends React.Component {
    render() {
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
        
                    <button className="action_button comment_btn">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18 2.25V11.25C18 11.8467 17.7629 12.419 17.341 12.841C16.919 13.2629 16.3467 13.5 15.75 13.5H10.125L4.5 18V13.5H2.25C1.65326 13.5 1.08097 13.2629 0.65901 12.841C0.237053 12.419 0 11.8467 0 11.25V2.25C0 1.65326 0.237053 1.08097 0.65901 0.65901C1.08097 0.237053 1.65326 0 2.25 0H15.75C16.3467 0 16.919 0.237053 17.341 0.65901C17.7629 1.08097 18 1.65326 18 2.25ZM5.625 5.625H3.375V7.875H5.625V5.625ZM7.875 5.625H10.125V7.875H7.875V5.625ZM14.625 5.625H12.375V7.875H14.625V5.625Z" fill="#555555"/>
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
    }

    render(props) {
        return (
            <section className="post">
                <PostWrapper author={this.props.author} content={this.props.content}/>
                {/* <PostComments /> */}
                <PostActionBlock />
            </section>
        );
    }
}

export default PostContainer