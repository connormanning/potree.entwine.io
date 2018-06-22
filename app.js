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
        var href = '/data/' + r.page + '.html';

        return <div>
            <a className='lead row center-block' href={ '/data/' + r.page + '.html' }>
                <img
                    className='img-responsive thumb img-thumbnail'
                    src={ 'resources/images/' + r.page + '.jpg' }
                />
            </a>
        </div>;
    }
});

var Resource = function(name, page, eu) {
    this.name = name;
    this.page = page;
    this.eu = eu;
};

var Credit = React.createClass({
    render: function() {
        return <div className='lead row'>
            <div className='col-xs-3'/>
            <div className='col-xs-3'>
                <a href='https://www.erdc.usace.army.mil/Locations/CRREL/Research.aspx'>
                    <img style={ { height: 100 } } className='img-responsive' src='resources/images/rsgis-logo.jpg'/>
                </a>
            </div>
            <div className='col-xs-3'>
                <a href='https://volcanoes.usgs.gov/vhp/observatories.html'>
                    <img style={ { height: 100 } } className='img-responsive' src='resources/images/usgs-logo.jpg'/>
                </a>
            </div>
            <div className='col-xs-3'/>
        </div>;
    }
});

var Content = React.createClass({
    render: function() {
        return <div className='lead row'>
            <div className='col-xs-12 col-sm-2'/>
            <div className='col-xs-12 col-sm-8'>
                <h4>LiDAR tiles</h4>
                <pre>{ 's3://grid-partner-share/Kilawea_1kmtiles/Pointclouds' }</pre>
                <h4>0.5m DTM</h4>
                <pre>{ 's3://grid-partner-share/Kilawea_1kmtiles/DTM_0.5m' }</pre>
                <h4>0.5m DTM filled</h4>
                <pre>{ 's3://grid-partner-share/Kilawea_1kmtiles/DTM_0.5m_filled' }</pre>
                <h4>LiDAR flight lines</h4>
                <pre>{ 's3://grid-partner-share/Kilawea' }</pre>
            </div>
            <div className='col-xs-12 col-sm-2'/>
        </div>
    }
});

var Page = React.createClass({
    render: function() {
        var eu = true;

        var resources = [new Resource('Kīlauea', 'kilauea')];

        return <div>
            <Header/>
            <div className='container-fluid'>
                <div className='row'>
                    <div
                        className='col-xs-12'
                        style={ { paddingBottom: 64 } }
                    >
                        <h1
                            className='center-block'
                            style={ {
                                color: '#192854',
                                paddingTop: 36,
                                paddingBottom: 24
                            } }
                        >
                            Kīlauea lidar
                        </h1>
                        {
                            resources.map((v, i) =>
                                    <Thumb
                                        key={ i }
                                        resource={ v }
                                        name={ v.name }
                                        href={ v.page }
                                        src={ v.image }/>)
                        }
                        <Credit/>
                        <Content/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>;
    }
});

ReactDOM.render(<Page/>, document.getElementById('app'));

