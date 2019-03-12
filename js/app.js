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
        var href = '/' + (r.old ? 'old/' : '') + 'data/' + r.page + '.html';
        var oldhref = '/old/data/' + r.page + '.html';

        var ext = [
                <img
                    className='flag'
                    title='Served via third-party'
                    src='resources/icons/goto.svg'
                />
        ];

        var na = [
            <a href={ href }>
                <img
                    className='flag'
                    title='Served from NA'
                    src='resources/icons/na.svg'
                />
            </a>
        ];

        // For now EU versions are not updated.
        var eu = [
            <a href={ ext ? href : oldhref + '?location=eu-c.entwine.io' }>
                <img
                    className='flag'
                    title='Served from EU'
                    src='resources/icons/eu.svg'
                />
            </a>
        ]

        var flags = []
        if (r.eu) flags = flags.concat(eu)
        if (r.na) flags = flags.concat(na)
        if (r.ext) flags = flags.concat(ext)

        return <div className='col-xs-6 col-sm-4'>
            <a href={ href }>
                <img
                    className='img-responsive thumb img-thumbnail'
                    src={ 'resources/images/' + r.page + '.jpg' }
                />
            </a>
            <p className='lead center-block'>{ r.name } { flags }</p>
        </div>;
    }
});

var Resource = function(name, page, params) {
    this.name = name;
    this.page = page;
    this.na = params.na;
    this.eu = params.eu;
    this.ext = params.ext;
};

var Page = React.createClass({
    render: function() {
        var na = { na: true };
        var eu = { eu: true };
        var both = { na: true, eu: true };

        var resources = [
            new Resource('Denmark', 'denmark', both),
            new Resource('Railway - France', 'sncf', both),
            new Resource('Red Rocks Amphitheatre', 'red-rocks', both),
            new Resource('Kentucky', 'kentucky', na),
            new Resource('New York City', 'nyc', both),
            new Resource('Salzburg', 'salzburg', { eu: true, ext: true }),
            new Resource('New Zealand', 'new-zealand', na),
            new Resource('Iowa', 'iowa', both),
            new Resource('Lake Isabella', 'lake-isabella', both),
            new Resource('Hanover', 'hanover', { na: true }),
            new Resource('Washington DC', 'dc', na),
            new Resource('Netherlands', 'ahn', na),
            new Resource('Minnesota', 'mn', na),
            new Resource('Iowa Beer Caves', 'beer-caves', na),
            new Resource('Autzen Stadium', 'autzen', both),
            new Resource('Vanuatu Village - Nepal', 'vanuatu-village', both),
            new Resource('Dublin', 'dublin', both),
            new Resource('Half Dome - Yosemite', 'half-dome', both),
            new Resource('Cedar Falls Bridge - Iowa', 'iowa-bridge', both),
            new Resource('Mount St. Helens', 'st-helens', both),
            new Resource('Space Shuttle Discovery', 'shuttle', both),
            new Resource('Lone Star Geyser', 'lone-star', both),
            new Resource('MH370', 'mh370', na),
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
                                className='center-block row'
                                style={ {
                                    color: '#192854',
                                    paddingTop: 36,
                                    paddingBottom: 24
                                } }
                            >
                                Entwine
                                <span style={ { color: '#39B44A' } }> / </span>
                                Potree
                            </h2>
                            <div className='row'>
                                <div className='col-xs-12'>
                                    <small style={ { color: '#888', paddingBottom: 24 } } className='text-right col-xs-12'>
                                        Use the EU flag links for data served from Frankfurt
                                    </small>
                                </div>
                            </div>
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

