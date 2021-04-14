var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostAuthor = function (_React$Component) {
    _inherits(PostAuthor, _React$Component);

    function PostAuthor(props) {
        _classCallCheck(this, PostAuthor);

        return _possibleConstructorReturn(this, (PostAuthor.__proto__ || Object.getPrototypeOf(PostAuthor)).call(this, props));
    }

    _createClass(PostAuthor, [{
        key: "render",
        value: function render(props) {
            return React.createElement(
                "div",
                { className: "post_author" },
                React.createElement("img", { className: "author_avatar", src: this.props.avatar, alt: this.props.name }),
                React.createElement(
                    "h3",
                    { className: "author_name user_name" },
                    this.props.name
                )
            );
        }
    }]);

    return PostAuthor;
}(React.Component);

var PostContent = function (_React$Component2) {
    _inherits(PostContent, _React$Component2);

    function PostContent(props) {
        _classCallCheck(this, PostContent);

        return _possibleConstructorReturn(this, (PostContent.__proto__ || Object.getPrototypeOf(PostContent)).call(this, props));
    }

    _createClass(PostContent, [{
        key: "render",
        value: function render(props) {
            return React.createElement(
                "div",
                { className: "post_content" },
                React.createElement(
                    "p",
                    { className: "post_text", style: { whiteSpace: "pre-line" } },
                    this.props.text
                ),
                React.createElement("img", { className: "post_image", src: this.props.image, alt: "" })
            );
        }
    }]);

    return PostContent;
}(React.Component);

var PostWrapper = function (_React$Component3) {
    _inherits(PostWrapper, _React$Component3);

    function PostWrapper() {
        _classCallCheck(this, PostWrapper);

        return _possibleConstructorReturn(this, (PostWrapper.__proto__ || Object.getPrototypeOf(PostWrapper)).apply(this, arguments));
    }

    _createClass(PostWrapper, [{
        key: "render",
        value: function render(props) {
            return React.createElement(
                "div",
                { className: "post_wrapper feed_element" },
                React.createElement(PostAuthor, { avatar: this.props.author.avatar, name: this.props.author.name }),
                React.createElement(PostContent, { text: this.props.content.text, image: this.props.content.image })
            );
        }
    }]);

    return PostWrapper;
}(React.Component);

var PostComments = function (_React$Component4) {
    _inherits(PostComments, _React$Component4);

    function PostComments(props) {
        _classCallCheck(this, PostComments);

        return _possibleConstructorReturn(this, (PostComments.__proto__ || Object.getPrototypeOf(PostComments)).call(this, props));
    }

    return PostComments;
}(React.Component);

var PostActionBlock = function (_React$Component5) {
    _inherits(PostActionBlock, _React$Component5);

    function PostActionBlock() {
        _classCallCheck(this, PostActionBlock);

        return _possibleConstructorReturn(this, (PostActionBlock.__proto__ || Object.getPrototypeOf(PostActionBlock)).apply(this, arguments));
    }

    _createClass(PostActionBlock, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "post_action_block" },
                React.createElement(
                    "div",
                    { className: "action_move_block feed_element" },
                    React.createElement(
                        "button",
                        { className: "action_button plus" },
                        React.createElement(
                            "svg",
                            { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                            React.createElement("rect", { x: "8.09998", width: "1.8", height: "18", fill: "#C4C4C4" }),
                            React.createElement("rect", { y: "9.89999", width: "1.8", height: "18", transform: "rotate(-90 0 9.89999)", fill: "#C4C4C4" })
                        )
                    ),
                    React.createElement(
                        "p",
                        { className: "rating" },
                        "3872"
                    ),
                    React.createElement(
                        "button",
                        { className: "action_button minus" },
                        React.createElement(
                            "svg",
                            { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                            React.createElement("rect", { y: "9.89999", width: "1.8", height: "18", transform: "rotate(-90 0 9.89999)", fill: "#C4C4C4" })
                        )
                    ),
                    React.createElement(
                        "button",
                        { className: "action_button comment_btn" },
                        React.createElement(
                            "svg",
                            { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                            React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M18 2.25V11.25C18 11.8467 17.7629 12.419 17.341 12.841C16.919 13.2629 16.3467 13.5 15.75 13.5H10.125L4.5 18V13.5H2.25C1.65326 13.5 1.08097 13.2629 0.65901 12.841C0.237053 12.419 0 11.8467 0 11.25V2.25C0 1.65326 0.237053 1.08097 0.65901 0.65901C1.08097 0.237053 1.65326 0 2.25 0H15.75C16.3467 0 16.919 0.237053 17.341 0.65901C17.7629 1.08097 18 1.65326 18 2.25ZM5.625 5.625H3.375V7.875H5.625V5.625ZM7.875 5.625H10.125V7.875H7.875V5.625ZM14.625 5.625H12.375V7.875H14.625V5.625Z", fill: "#555555" })
                        )
                    )
                )
            );
        }
    }]);

    return PostActionBlock;
}(React.Component);

var PostContainer = function (_React$Component6) {
    _inherits(PostContainer, _React$Component6);

    function PostContainer(props) {
        _classCallCheck(this, PostContainer);

        return _possibleConstructorReturn(this, (PostContainer.__proto__ || Object.getPrototypeOf(PostContainer)).call(this, props));
    }

    _createClass(PostContainer, [{
        key: "render",
        value: function render(props) {
            return React.createElement(
                "section",
                { className: "post" },
                React.createElement(PostWrapper, { author: this.props.author, content: this.props.content }),
                React.createElement(PostActionBlock, null)
            );
        }
    }]);

    return PostContainer;
}(React.Component);

export default PostContainer;