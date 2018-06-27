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

var Credit = React.createClass({
    render: function() {
        return <div className='row'>
            <div className='col-xs-12 col-sm-4'/>
            <div className='col-xs-12 col-sm-4 center-text'>
                <h4>{ this.props.name }</h4>
                <p>{ this.props.children }</p>
            </div>
            <div className='col-xs-12 col-sm-4'/>
        </div>;
    }
});

var Content = React.createClass({
    render: function() {
        return <div className='center-block lead row'>
            <div className='col-xs-12 col-sm-2'/>
            <div className='col-xs-12 col-sm-8'>
<p>
    This demo gallery demonstrates interconnectivity between the <a href='potree.org'>Potree</a> renderer and <a href='https://entwine.io'>Entwine</a>.  The source code for this repository is available on <a href='https://github.com/connormanning/potree.entwine.io'>GitHub</a>.
</p>
            </div>
            <div className='col-xs-12 col-sm-2'/>
        </div>
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
                                Entwine
                                <span style={ { color: '#39B44A' } }> / </span>
                                Potree
                            </h2>
                            <h3
                                className='center-block'
                                style={ { color: '#192854', paddingBottom: 24 } }
                            >
                                About
                            </h3>
                            <Content/>
                            <h3
                                className='center-block'
                                style={ { color: '#192854',
                                    paddingBottom: 24, paddingTop: 32 } }
                            >
                                Data credits
                            </h3>
                            <div className='center-block'>
                                <Credit name='SNCF Railway'>
                                    <a href='https://ressources.data.sncf.com/explore/dataset/nuage-points-3d/'>SNCF Open Data</a>
                                </Credit>

                                <Credit name='Denmark'>
                                    <a href='http://kortforsyningen.dk/'>Kortforsyningen</a>
                                </Credit>

                                <Credit name='Red Rocks Amphitheatre'>
                                    <a href="https://dronemapper.com/sample_data">
                                        DroneMapper
                                    </a> sample data
                                </Credit>

                                <Credit name='Lake Isabella'>
                                    David Finnegan, <a href="http://www.erdc.usace.army.mil/Locations/CRREL/Research.aspx">RS/GIS CRREL USACE</a>, 2015
                                </Credit>

                                <Credit name='Dublin'>
                                    NYU Research Data, <a href="https://geo.nyu.edu/catalog?f%5Bdct_isPartOf_sm%5D%5B%5D=2015+Dublin+LiDAR">2015 Survey of Dublin City</a>
                                </Credit>

                                <Credit
                                    name='Autzen Stadium, St. Helens, Half Dome'
                                >
                                    Howard Butler, <a href="hobu.co">Hobu, Inc.</a>
                                </Credit>

                                <Credit name='Vanuatu Village, Nepal'>
                                    <a href="http://www.globaldirt.org/">GlobalDIRT</a>
                                </Credit>

                                <Credit name='Iowa Bridge'>
                                    University Ave., Cedar Falls, IA - Iowa DOT
                                </Credit>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>;
    }
});

ReactDOM.render(<Page/>, document.getElementById('app'));

