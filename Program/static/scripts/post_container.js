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

        var _this4 = _possibleConstructorReturn(this, (PostComments.__proto__ || Object.getPrototypeOf(PostComments)).call(this, props));

        _this4.state = { isOpen: false };
        return _this4;
    }

    _createClass(PostComments, [{
        key: "render",
        value: function render(props) {
            var displayStatus = void 0;
            if (this.props.commentsState) displayStatus = "block";else displayStatus = "none";

            return React.createElement(
                "div",
                { className: "post_commentary feed_element", style: { display: displayStatus } },
                React.createElement("input", { type: "text", className: "comment_input", placeholder: "\u0412\u0430\u0448 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439..." }),
                React.createElement(
                    "div",
                    { className: "comment_wrapper" },
                    React.createElement(
                        "div",
                        { className: "comment" },
                        React.createElement("img", { src: "../img/avatar_nikita.png", alt: "\u041D\u0438\u043A\u0438\u0442\u0430 \u041F\u0430\u0432\u043B\u043E\u0432", className: "comment_author_avatar" }),
                        React.createElement(
                            "div",
                            { className: "comment_content" },
                            React.createElement(
                                "p",
                                { className: "comment_name" },
                                "\u041D\u0438\u043A\u0438\u0442\u0430 \u041F\u0430\u0432\u043B\u043E\u0432"
                            ),
                            React.createElement(
                                "p",
                                { className: "comment_text" },
                                "\u041E\u0447\u0435\u043D\u044C \u043B\u044E\u0431\u043B\u044E \u0434\u0435\u043B\u0430\u0442\u044C \u043A\u0443\u043B\u0438\u0447\u0438\u043A\u0438 \u0432 \u0441\u0432\u043E\u0451\u043C \u0433\u043E\u0440\u043E\u0434\u0435, \u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A, \u043A\u0440\u0430\u0439\u043D\u0435 \u0440\u0430\u0441\u0441\u043B\u0430\u0431\u043B\u044F\u0435\u0442"
                            ),
                            React.createElement(
                                "p",
                                { className: "comment_time" },
                                "02.04.2021 \u0432 12:30"
                            )
                        )
                    )
                )
            );
        }
    }]);

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
        value: function render(props) {
            var commentIcon = void 0;

            if (this.props.commentsState) commentIcon = React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0.438738 0.457933C0.719747 0.176726 1.10083 0.0187527 1.49817 0.0187527C1.89552 0.0187527 2.2766 0.176726 2.55761 0.457933L8.99063 6.89743L15.4237 0.457933C15.5619 0.314667 15.7272 0.200394 15.9101 0.12178C16.0929 0.0431668 16.2895 0.00178736 16.4885 5.66356e-05C16.6875 -0.00167409 16.8848 0.0362782 17.0689 0.111699C17.2531 0.187121 17.4204 0.2985 17.5611 0.43934C17.7018 0.580179 17.8131 0.747657 17.8884 0.932001C17.9638 1.11635 18.0017 1.31387 17.9999 1.51303C17.9982 1.7122 17.9569 1.90903 17.8783 2.09204C17.7998 2.27504 17.6856 2.44056 17.5425 2.57893L11.1095 9.01843L17.5425 15.4579C17.8155 15.7408 17.9665 16.1197 17.9631 16.513C17.9597 16.9063 17.8021 17.2825 17.5243 17.5607C17.2464 17.8388 16.8706 17.9965 16.4777 17.9999C16.0848 18.0034 15.7063 17.8522 15.4237 17.5789L8.99063 11.1394L2.55761 17.5789C2.27499 17.8522 1.89646 18.0034 1.50356 17.9999C1.11066 17.9965 0.734825 17.8388 0.456992 17.5607C0.179159 17.2825 0.0215641 16.9063 0.0181499 16.513C0.0147358 16.1197 0.165776 15.7408 0.438738 15.4579L6.87177 9.01843L0.438738 2.57893C0.157815 2.29764 0 1.91618 0 1.51843C0 1.12069 0.157815 0.739224 0.438738 0.457933Z", fill: "#555555" });else commentIcon = React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M18 2.25V11.25C18 11.8467 17.7629 12.419 17.341 12.841C16.919 13.2629 16.3467 13.5 15.75 13.5H10.125L4.5 18V13.5H2.25C1.65326 13.5 1.08097 13.2629 0.65901 12.841C0.237053 12.419 0 11.8467 0 11.25V2.25C0 1.65326 0.237053 1.08097 0.65901 0.65901C1.08097 0.237053 1.65326 0 2.25 0H15.75C16.3467 0 16.919 0.237053 17.341 0.65901C17.7629 1.08097 18 1.65326 18 2.25ZM5.625 5.625H3.375V7.875H5.625V5.625ZM7.875 5.625H10.125V7.875H7.875V5.625ZM14.625 5.625H12.375V7.875H14.625V5.625Z", fill: "#555555" });

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
                        { className: "action_button comment_btn", onClick: this.props.changeCommentsVisible },
                        React.createElement(
                            "svg",
                            { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                            commentIcon
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

        var _this6 = _possibleConstructorReturn(this, (PostContainer.__proto__ || Object.getPrototypeOf(PostContainer)).call(this, props));

        _this6.changeCommentsVisible = _this6.changeCommentsVisible.bind(_this6);
        _this6.state = { commentsVisible: false };
        return _this6;
    }

    _createClass(PostContainer, [{
        key: "changeCommentsVisible",
        value: function changeCommentsVisible() {
            this.setState(function (state) {
                return { commentsVisible: !state.commentsVisible };
            });
        }
    }, {
        key: "render",
        value: function render(props) {
            return React.createElement(
                "section",
                { className: "post", style: { paddingLeft: this.state.commentsVisible ? "0px" : "205px" } },
                React.createElement(PostWrapper, { author: this.props.author, content: this.props.content }),
                React.createElement(PostComments, { commentsState: this.state.commentsVisible }),
                React.createElement(PostActionBlock, { commentsState: this.state.commentsVisible, changeCommentsVisible: this.changeCommentsVisible })
            );
        }
    }]);

    return PostContainer;
}(React.Component);

export default PostContainer;