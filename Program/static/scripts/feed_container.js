"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var postArray = [{
    avatar: '../img/avatar1.png',
    name: 'мемблексы от пепликсов',
    content: {
        image: '../img/floppa_morgen.png'
    }
}, {
    avatar: '../img/avatar2.png',
    name: 'БУГУРТ-ТРЕД',
    content: {
        text: '\u0414\u0415\u041B\u0410\u0415\u0428\u042C \u041A\u0423\u041B\u0418\u0427\u0418\u041A\u0418 \u0412 \u041F\u0415\u0421\u041E\u0427\u041D\u0418\u0426\u0415\n            <br>@<br>\n            \u0421\u0414\u0415\u041B\u0410\u041B \u0418\u0414\u0415\u0410\u041B\u042C\u041D\u042B\u0419 \u041A\u0423\u041B\u0418\u0427\u0418\u041A\n            <br>@<br>\n            \u0417\u041E\u0412\u0415\u0428\u042C \u041C\u0410\u041C\u0423 \u041F\u041E\u041A\u0410\u0417\u0410\u0422\u042C \u042D\u0422\u041E\u0413\u041E \u0426\u0410\u0420\u042F \u0421\u0420\u0415\u0414\u0418 \u041A\u0423\u041B\u0418\u0427\u0418\u041A\u041E\u0412 \u0414\u0410\u0416\u0415 \u041D\u0415\u0411\u041E \u0414\u0410\u0416\u0415 \u0412\u0415\u0414\u0415\u0420\u041A\u041E \u0417\u0410\u0412\u0418\u0414\u0423\u042E\u0422\n            <br>@<br>\n            \u041A\u041E\u0413\u0414\u0410 \u041F\u0420\u0418\u0412\u0415\u041B \u041C\u0410\u041C\u0423 \u0415\u0420\u041E\u0428\u041A\u0410 \u0423\u0416\u0415 \u0421\u041B\u041E\u041C\u0410\u041B \u0422\u0412\u041E\u0419 \u041A\u0423\u041B\u0418\u0427\u0418\u041A',
        image: '../img/kulichiki.png'
    }
}];

var PostAuthorInformation = function (_React$Component) {
    _inherits(PostAuthorInformation, _React$Component);

    function PostAuthorInformation() {
        _classCallCheck(this, PostAuthorInformation);

        return _possibleConstructorReturn(this, (PostAuthorInformation.__proto__ || Object.getPrototypeOf(PostAuthorInformation)).apply(this, arguments));
    }

    _createClass(PostAuthorInformation, [{
        key: 'render',
        value: function render(props) {
            return React.createElement(
                'div',
                { className: 'post_author' },
                React.createElement('img', { className: 'author_avatar', src: props.author.avatar, alt: props.author.name }),
                React.createElement(
                    'h3',
                    { className: 'author_name user_name' },
                    props.author.name
                )
            );
        }
    }]);

    return PostAuthorInformation;
}(React.Component);

var PostContent = function (_React$Component2) {
    _inherits(PostContent, _React$Component2);

    function PostContent() {
        _classCallCheck(this, PostContent);

        return _possibleConstructorReturn(this, (PostContent.__proto__ || Object.getPrototypeOf(PostContent)).apply(this, arguments));
    }

    _createClass(PostContent, [{
        key: 'render',
        value: function render(props) {
            return React.createElement(
                'div',
                { className: 'post_content' },
                React.createElement('div', { className: 'post_image' })
            );
        }
    }]);

    return PostContent;
}(React.Component);

;

var PostWrapper = function (_React$Component3) {
    _inherits(PostWrapper, _React$Component3);

    function PostWrapper() {
        _classCallCheck(this, PostWrapper);

        return _possibleConstructorReturn(this, (PostWrapper.__proto__ || Object.getPrototypeOf(PostWrapper)).apply(this, arguments));
    }

    _createClass(PostWrapper, [{
        key: 'render',
        value: function render(props) {
            return React.createElement(
                'div',
                { className: 'post_wrapper feed_element' },
                React.createElement(PostAuthorInformation, { author: props.params.author }),
                React.createElement(PostContent, { content: props.params.content })
            );
        }
    }]);

    return PostWrapper;
}(React.Component);

;

var PostActionBlock = function (_React$Component4) {
    _inherits(PostActionBlock, _React$Component4);

    function PostActionBlock() {
        _classCallCheck(this, PostActionBlock);

        return _possibleConstructorReturn(this, (PostActionBlock.__proto__ || Object.getPrototypeOf(PostActionBlock)).apply(this, arguments));
    }

    _createClass(PostActionBlock, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'post_action_block' },
                React.createElement(
                    'div',
                    { className: 'action_move_block feed_element' },
                    React.createElement(
                        'button',
                        { className: 'action_button plus' },
                        React.createElement(
                            'svg',
                            { width: '18', height: '18', viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
                            React.createElement('rect', { x: '8.09998', width: '1.8', height: '18', fill: '#C4C4C4' }),
                            React.createElement('rect', { y: '9.89999', width: '1.8', height: '18', transform: 'rotate(-90 0 9.89999)', fill: '#C4C4C4' })
                        )
                    ),
                    React.createElement(
                        'p',
                        { className: 'rating' },
                        '3872'
                    ),
                    React.createElement(
                        'button',
                        { className: 'action_button minus' },
                        React.createElement(
                            'svg',
                            { width: '18', height: '18', viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
                            React.createElement('rect', { y: '9.89999', width: '1.8', height: '18', transform: 'rotate(-90 0 9.89999)', fill: '#C4C4C4' })
                        )
                    ),
                    React.createElement(
                        'button',
                        { className: 'action_button comment_btn' },
                        React.createElement(
                            'svg',
                            { width: '18', height: '18', viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
                            React.createElement('path', { 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', d: 'M18 2.25V11.25C18 11.8467 17.7629 12.419 17.341 12.841C16.919 13.2629 16.3467 13.5 15.75 13.5H10.125L4.5 18V13.5H2.25C1.65326 13.5 1.08097 13.2629 0.65901 12.841C0.237053 12.419 0 11.8467 0 11.25V2.25C0 1.65326 0.237053 1.08097 0.65901 0.65901C1.08097 0.237053 1.65326 0 2.25 0H15.75C16.3467 0 16.919 0.237053 17.341 0.65901C17.7629 1.08097 18 1.65326 18 2.25ZM5.625 5.625H3.375V7.875H5.625V5.625ZM7.875 5.625H10.125V7.875H7.875V5.625ZM14.625 5.625H12.375V7.875H14.625V5.625Z', fill: '#555555' })
                        )
                    )
                )
            );
        }
    }]);

    return PostActionBlock;
}(React.Component);

;

var Post = function (_React$Component5) {
    _inherits(Post, _React$Component5);

    function Post(props) {
        _classCallCheck(this, Post);

        return _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, props));
    }

    _createClass(Post, [{
        key: 'render',
        value: function render(props) {
            return React.createElement(
                'section',
                { className: 'post' },
                React.createElement(PostWrapper, { params: props.params }),
                React.createElement(PostActionBlock, null)
            );
        }
    }]);

    return Post;
}(React.Component);

;

var App = function (_React$Component6) {
    _inherits(App, _React$Component6);

    function App(props) {
        _classCallCheck(this, App);

        var _this6 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this6.addChild = _this6.addChild.bind(_this6);

        _this6.state = {
            components: [{
                id: 1,
                author: {
                    avatar: '../img/avatar1.png',
                    name: 'мемблексы от пепликсов'
                },
                content: {
                    image: '../img/floppa_morgen.png'
                }
            }]
        };
        return _this6;
    }

    _createClass(App, [{
        key: 'addChild',
        value: function addChild() {
            this.setState(this.state.components.concat([{
                id: 2,
                author: {
                    avatar: '../img/avatar2.png',
                    name: 'БУГУРТ-ТРЕД'
                },
                content: {
                    text: '\u0414\u0415\u041B\u0410\u0415\u0428\u042C \u041A\u0423\u041B\u0418\u0427\u0418\u041A\u0418 \u0412 \u041F\u0415\u0421\u041E\u0427\u041D\u0418\u0426\u0415\n                           <br>@<br>\n                           \u0421\u0414\u0415\u041B\u0410\u041B \u0418\u0414\u0415\u0410\u041B\u042C\u041D\u042B\u0419 \u041A\u0423\u041B\u0418\u0427\u0418\u041A\n                           <br>@<br>\n                           \u0417\u041E\u0412\u0415\u0428\u042C \u041C\u0410\u041C\u0423 \u041F\u041E\u041A\u0410\u0417\u0410\u0422\u042C \u042D\u0422\u041E\u0413\u041E \u0426\u0410\u0420\u042F \u0421\u0420\u0415\u0414\u0418 \u041A\u0423\u041B\u0418\u0427\u0418\u041A\u041E\u0412 \u0414\u0410\u0416\u0415 \u041D\u0415\u0411\u041E \u0414\u0410\u0416\u0415 \u0412\u0415\u0414\u0415\u0420\u041A\u041E \u0417\u0410\u0412\u0418\u0414\u0423\u042E\u0422\n                           <br>@<br>\n                           \u041A\u041E\u0413\u0414\u0410 \u041F\u0420\u0418\u0412\u0415\u041B \u041C\u0410\u041C\u0423 \u0415\u0420\u041E\u0428\u041A\u0410 \u0423\u0416\u0415 \u0421\u041B\u041E\u041C\u0410\u041B \u0422\u0412\u041E\u0419 \u041A\u0423\u041B\u0418\u0427\u0418\u041A',
                    image: '../img/kulichiki.png'
                }
            }]));
        }
    }, {
        key: 'render',
        value: function render(props) {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'App main component! '
                ),
                React.createElement(
                    'button',
                    { onClick: this.addChild },
                    'Add component'
                ),
                // здесь будет отрисовано необходимое кол-во компонентов
                this.state.components.map(function (item) {
                    return React.createElement(Post, { key: item.id, params: item });
                })
            )
            // <button onClick={this.addChild}>Add component</button>
            // {
            //     this.state.components.map((item) => (
            //         <Post params={item} />
            //     ))
            // }
            ;
        }
    }]);

    return App;
}(React.Component);

;

var feedArray = 3;

var domContainer = document.querySelector('#feed_container');
ReactDOM.render(React.createElement(App, null), domContainer);