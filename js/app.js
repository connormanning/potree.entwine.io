var Nav = React.createClass({
    render: function() {
        return <div className='col-xs-12 col-sm-5' id='navbar'>
            <ul
                id='navbarUl'
                className=
                    'nav navbar-nav navbar-right nav-pills'
            >
                <li>
                    { this.props.children }
                </li>
            </ul>
        </div>;
    }
});

var Header = React.createClass({
    render: function() {
        return (
            <div className='navbar navbar-default' id='header'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-7'>
                            <a href='/'>
                                <img
                                    id='banner'
                                    src='resources/images/banner.png'
                                />
                            </a>
                        </div>
                        <Nav>
                            <a href='/about.html'>
                                <span style={ { color: '#888' } }>
                                    About
                                </span>
                            </a>
                        </Nav>
                    </div>
                </div>
            </div>
        );
    }
});

var Footer = React.createClass({
    render: function() {
        return (
            <footer className='footer'>
                <div className='container-fluid'>
                    <div className='footer-content'>
                        <div className='row'>
                            <div className='col-xs-5'></div>
                            <div className='col-xs-2'>
                                <a href='/'>
                                    <img
                                        className='center-block'
                                        id='footer-icon'
                                        src='resources/images/icon.png'
                                    />
                                </a>
                            </div>
                            <div className='col-xs-5'>
                                <p id='copyright'>
                                    Entwine © Hobu, Inc.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
});

var Thumb = React.createClass({
    render: function() {
        return <a href={ this.props.href } className='col-xs-6 col-sm-4'>
            <img
                className='img-responsive thumb img-thumbnail'
                src={ 'resources/images/' + this.props.src }
            />
            <p className='lead center-block'>{ this.props.name }</p>
        </a>;
    }
});

var Page = React.createClass({
    render: function() {
        return <div>
            <Header/>
                <div className='container-fluid'>
                    <div className='row'>
                        <div
                            className='col-xs-12'
                            style={ { paddingBottom: 64 } }
                        >
                            <h2
                                className='center-block'
                                style={ {
                                    color: '#192854',
                                    paddingTop: 36,
                                    paddingBottom: 24
                                } }
                            >
                                Greyhound
                                <span style={ { color: '#39B44A' } }> / </span>
                                Potree Demo
                            </h2>
                            <Thumb
                                href='/data/nyc.html'
                                src='nyc.jpg'
                                name='New York City'
                            />
                            <Thumb
                                href='/data/redrock.html'
                                src='redrock.jpg'
                                name='Red Rocks Amphitheatre'
                            />
                            <Thumb
                                href='/data/isabella.html'
                                src='isabella.jpg'
                                name='Lake Isabella'
                            />
                            <Thumb
                                href='/data/autzen.html'
                                src='autzen.jpg'
                                name='Autzen Stadium'
                            />
                            <Thumb
                                href='/data/nepal.html'
                                src='nepal.jpg'
                                name='Nepal'
                            />
                            <Thumb
                                href='/data/half-dome.html'
                                src='half-dome.jpg'
                                name='Half Dome - Yosemite'
                            />
                            <Thumb
                                href='/data/iowa-bridge.html'
                                src='iowa-bridge.jpg'
                                name='Iowa Bridge'
                            />
                            <Thumb
                                href='/data/st-helens.html'
                                src='st-helens.jpg'
                                name='Mount St. Helens'
                            />
                            <Thumb
                                href='/data/shuttle.html'
                                src='shuttle.jpg'
                                name='Space Shuttle'
                            />
                            <Thumb
                                href='/data/lone-star.html'
                                src='lone-star.jpg'
                                name='Lone Star Geyser'
                            />
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>;
    }
});

ReactDOM.render(<Page/>, document.getElementById('app'));

