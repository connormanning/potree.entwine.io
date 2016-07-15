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
    This demo gallery demonstrates interconnectivity between the <a href='potree.org'>Potree</a> renderer and <a href='https://github.com/hobu/greyhound'>Greyhound</a>, which is a RESTful, LoD-based point cloud streaming server for <a href='https://github.com/connormanning/entwine'>Entwine</a>-indexed endpoints.
</p>
<p>
    This work was accomplished via collaboration by <a href='https://www.esciencecenter.nl/profile/maarten-van-meersbergen-msc'>Maarten van Meersbergen</a>, <a href='https://www.esciencecenter.nl/profile/oscar-martinez-rubi-msc'>Oscar Martinez Rubi</a>, and <a href='https://github.com/connormanning'>Connor Manning</a> during the <a href='https://wiki.osgeo.org/wiki/Paris_Code_Sprint_2016'>OSGeo Paris Code Sprint 2016</a>.
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
                                Greyhound
                                <span style={ { color: '#39B44A' } }> / </span>
                                Potree Demo
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
                                <Credit
                                    name='Autzen Stadium, St. Helens, Half Dome'
                                >
                                    Howard Butler, <a href="hobu.co">Hobu, Inc.</a>
                                </Credit>

                                <Credit name='Red Rocks Amphitheatre'>
                                    <a href="https://dronemapper.com/sample_data">
                                        DroneMapper
                                    </a> sample data
                                </Credit>

                                <Credit name='Nepal'>
                                    Vanuatu village, Nepal. <a href="http://www.globaldirt.org/">GlobalDIRT</a>
                                </Credit>

                                <Credit name='Lake Isabella'>
                                    David Finnegan, <a href="http://www.erdc.usace.army.mil/Locations/CRREL/Research.aspx">RS/GIS CRREL USACE</a>, 2015
                                </Credit>

                                <Credit name='Iowa Bridge'>
                                    University Ave., Cedar Falls, IA - Iowa DOT
                                </Credit>

                                <Credit name='Lone Star Geyser'>
                                    David Finnegan and Adam LeWinter, <a href="http://www.erdc.usace.army.mil/Locations/CRREL/Research.aspx">RS/GIS CRREL USACE</a>, 2015
                                </Credit>

                                <Credit name='Space Shuttle'>
                                    The Smithsonian National Air and Space Museum, Steven F. Udvar-Hazy Center, and <a href="http://www.crrel.usace.army.mil/">RS/GIS CRREL USACE</a>
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

