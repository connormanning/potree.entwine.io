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
                                        src='resources/images/entwine-logo.png'
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
        var r = this.props.resource;
        var tooltip = r.locations.length == 2 ?
            'Served from NA or EU' :
            'Served from NA only';

        var flags = r.locations.map((v) =>
            <img
                className='flag'
                title={ tooltip }
                src={ 'resources/icons/' + v + '.svg' }/>
        );

        return <div className='col-xs-6 col-sm-4'>
            <a
                href={ '/data/' + r.page + '.html' }
            >
                <img
                    className='img-responsive thumb img-thumbnail'
                    src={ 'resources/images/' + r.page + '.jpg' }
                />
            </a>
            <p className='lead center-block'>{ r.name } { flags }</p>
        </div>;
    }
});

var Resource = function(name, page, locations) {
    this.name = name;
    this.page = page;
    this.locations = locations || ['na'];
};

var Page = React.createClass({
    render: function() {
        var eu = ['eu', 'na'];

        var resources = [
            new Resource('Denmark', 'denmark', eu),
            new Resource('Railway - France', 'sncf', eu),
            new Resource('Red Rocks Amphitheatre', 'red-rocks', eu),
            // new Resource('New Zealand', 'new-zealand'),
            new Resource('New York City', 'nyc'),
            new Resource('Iowa', 'iowa'),
            new Resource('Kentucky', 'kentucky'),
            new Resource('Lake Isabella', 'lake-isabella', eu),
            // new Resource('Washington DC', 'dc'),
            // new Resource('Netherlands', 'ahn'),
            // new Resource('Minnesota', 'mn'),
            new Resource('Autzen Stadium', 'autzen', eu),
            new Resource('Vanuatu Village - Nepal', 'vanuatu-village', eu),
            // new Resource('Dublin', 'dublin', eu),
            new Resource('Half Dome - Yosemite', 'half-dome', eu),
            // new Resource('Cedar Falls Bridge - Iowa', 'iowa-bridge', eu),
            new Resource('Mount St. Helens', 'st-helens', eu)
        ];

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
                            {
                                resources.map((v, i) =>
                                        <Thumb
                                            key={ i }
                                            resource={ v }
                                            name={ v.name }
                                            href={ v.page }
                                            src={ v.image }/>)
                            }
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>;
    }
});

ReactDOM.render(<Page/>, document.getElementById('app'));

