var maybeParse = function(key, val) {
    if (['s', 'server', 'r', 'resource'].includes(key) && val[0] != '"') {
        return val;
    }
    return JSON.parse(val);
};

var getQueryParam = function(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return true;

    return maybeParse(name, decodeURIComponent(results[2].replace(/\+/g, ' ')));
}

window.viewer = new Potree.Viewer(
        document.getElementById('potree_render_area'));

var defaults = {
    edl: true,
    edlStrength: 1,
    edlRadius: 1.4,
    pointSize: 3,
    pointType: 'Fixed',
    material: 'RGB',
    quality: 'Squares',
    pointBudget: 3 * 1000 * 1000,
    intensityRange: [0, 256],
    weightClassification: 1,
    fov: 60,
    opacity: 1,
    rgbGamma: 1, rgbContrast: 0, rgbBrightness: 0,
    intensityGamma: 1, intensityContrast: 0, intensityBrightness: 0,
};

var config = window.config;

var getDefault = (key) => config[key] || defaults[key];
var maybe = (key, val) => {
    // If the value is not equal to the default for this key, return the value.
    // Otherwise return null.

    var d = getDefault(key);

    if (Array.isArray(val)) {
        if (!d || val.some((v, i) => v != d[i])) return val;
        else return null;
    }
    return val != getDefault(key) ? val : null;
};

var get = () => {
    var era = [viewer.getElevationRange().min, viewer.getElevationRange().max];
    var state = {
        // Include these if they've changed from the initial state.
        ps: maybe('pointSize', viewer.getPointSize()),
        pt: maybe('pointType', viewer.getPointSizing()),
        fov: maybe('fov', viewer.getFOV()),
        op: maybe('opacity', viewer.getOpacity()),
        edl: maybe('edl', viewer.getEDLEnabled()),
        er: maybe('edlRadius', viewer.getEDLRadius()),
        es: maybe('edlStrength', viewer.getEDLStrength()),
        pb: maybe('pointBudget', viewer.getPointBudget()),
        m: maybe('material', viewer.getMaterialName()),
        q: maybe('quality', viewer.getQuality()),
        ir: maybe('intensityRange', viewer.getIntensityRange()),
        era: maybe('elevationRange', era),

        cg: maybe('rgbGamma', viewer.getRGBGamma()),
        cc: maybe('rgbContrast', viewer.getRGBContrast()),
        cb: maybe('rgbBrightness', viewer.getRGBBrightness()),
        ig: maybe('intensityGamma', viewer.getIntensityGamma()),
        ic: maybe('intensityContrast', viewer.getIntensityContrast()),
        ib: maybe('intensityBrightness', viewer.getIntensityBrightness()),

        // Always include these.
        p: viewer.scene.view.position.toArray(),
        t: viewer.scene.view.getPivot().toArray(),

        // For these, only include them if they are query overrides.
        s: getQueryParam('s') || getQueryParam('server'),
        r: getQueryParam('r') || getQueryParam('resource'),
    };

    return Object.keys(state).reduce((p, k) => {
        if (state[k] != null) p[k] = state[k];
        return p;
    }, { });
};

var set = (k, v) => {
    switch (k) {
        case 'pointSize': case 'ps':
            viewer.setPointSize(v);
            break;
        case 'pointSizing': case 'pointType': case 'pt':
            viewer.setPointSizing(v);
            break;
        case 'fov': case 'FOV':
            viewer.setFOV(v);
            break;
        case 'opacity': case 'op':
            viewer.setOpacity(v);
            break;
        case 'edlEnabled': case 'edl':
            viewer.setEDLEnabled(v);
            break;
        case 'edlRadius': case 'er':
            viewer.setEDLRadius(v);
            break;
        case 'edlStrength': case 'es':
            viewer.setEDLStrength(v);
            break;
        case 'clipMode': case 'cm':
            var mode;
            if (v == 'HIGHLIGHT_INSIDE') mode = Potree.ClipMode.HIGHLIGHT_INSIDE;
            else if (v === 'CLIP_OUTSIDE') mode = Potree.ClipMode.CLIP_OUTSIDE;
            else if (v === 'DISABLED')  mode = Potree.ClipMode.DISABLED;
            if (mode) viewer.setClipMode(mode);
            break;
        case 'pointBudget': case 'pb':
            viewer.setPointBudget(v);
            break;
        case 'showBoundingBox': case 'sbb':
            viewer.setShowBoundingBox(v);
            break;
        case 'material': case 'm': case 'color': case 'c':
            viewer.setMaterial(v);
            break;
        case 'quality': case 'q':
            viewer.setQuality(v);
            break;
        case 'position': case 'pos': case 'p':
            viewer.scene.view.position.set(v[0], v[1], v[2]);
            break;
        case 'target': case 'tgt': case 't':
            viewer.scene.view.lookAt(new THREE.Vector3(v[0], v[1], v[2]));
            break;
        case 'background': case 'bg':
            viewer.setBackground(v);
            break;
        case 'intensityRange': case 'ir':
            viewer.setIntensityRange(v[0], v[1]);
            break;
        case 'elevationRange': case 'era':
            viewer.setElevationRange(v[0], v[1]);
            break;
        case 'rgbGamma': case 'cg':
            viewer.setRGBGamma(v);
            break;
        case 'rgbContrast': case 'cc':
            viewer.setRGBContrast(v);
            break;
        case 'rgbBrightness': case 'cb':
            viewer.setRGBBrightness(v);
            break;
        case 'intensityGamma': case 'ig':
            viewer.setIntensityGamma(v);
            break;
        case 'intensityContrast': case 'ic':
            viewer.setIntensityContrast(v);
            break;
        case 'intensityBrightness': case 'ib':
            viewer.setIntensityBrightness(v);
            break;
        case 'weightClassification': case 'wc':
            viewer.setWeightClassification(v);
            break;
        case 'language': case 'l': case 'lang':
            viewer.setLanguage(v);
            break;
        case 'server': case 's': case 'resource': case 'r':
        case 'near': case 'far': case 'debug':
            // Greyhound server/resource selections - handled elsewhere.
            break;
        default:
            console.log('Unrecognized query parameter:', k);
            break;
    }
};

var configure = () => {
    var configureFrom = (o) => {
        if (!o) return;
        Object.keys(o).forEach((k) => set(k, o[k]));
    };

    var configureFromQuery = (qs) => {
        qs = qs || window.location.search;
        if (!qs) return;
        var tokens = qs.substring(1).split('&');
        var decode = (v) => decodeURIComponent(v).trim();

        tokens.forEach((c) => {
            if (c.indexOf('=') == -1) set([decode(c)], true);
            else {
                var keyVal = c.split('=');
                var key = decode(keyVal[0]);
                var val = maybeParse(key, decode(keyVal[1]));

                set(key, val);
            }
        }, { });
    };

    configureFrom(defaults);
    configureFrom(config);
    configureFromQuery();
};

var protocol = 'greyhound://';
var server =
    getQueryParam('s') ||
    getQueryParam('server') ||
    config.server ||
    protocol + 'cache.greyhound.io/';

// Only allow resource override if the config doesn't specify one - this avoids
// things like /data/autzen.html?resource=half-dome
var resource =
    config.resource ||
    getQueryParam('r') ||
    getQueryParam('resource');

if (!resource) throw new Error('No resource supplied');

if (server.substring(0, protocol.length) != protocol) {
    server = protocol + server;
}
if (server.slice(-1) != '/') server = server + '/';

var root = server + 'resource/' + resource + '/';

viewer.loadGUI(() => {
    $('#menu_appearance').next().show();
    if (config.debug || defaults.debug || getQueryParam('debug')) {
        viewer.toggleSidebar();
    }
});

configure();
Potree.loadPointCloud(root, resource, (e) => {
    viewer.scene.addPointCloud(e.pointcloud);
    viewer.fitToScreen();
    viewer.scene.camera.near = 10;

    var elevObj = viewer.getElevationRange();
    defaults.elevationRange = [elevObj.min, elevObj.max];
    if (config.near) viewer.scene.camera.near = config.near;
    if (config.far) viewer.scene.camera.far = config.far;
    configure();

    var q = '';
    var s = getQueryParam('s') || getQueryParam('server');
    var r = getQueryParam('r') || getQueryParam('resource');
    if (s) q += '?s=' + JSON.stringify(s);
    if (r) q += (q ? '&' : '?') + 'r=' + JSON.stringify(r);

    history.replaceState(null, null, location.pathname + q);
});

window.captureUrl = () => {
    var state = get();
    var keys = Object.keys(state);
    var moveToFront = (k) => {
        if (state[k]) keys = [k].concat(keys.filter((v) => v != k));
    };
    moveToFront('r');
    moveToFront('s');
    var q = keys.reduce((p, k) => {
        return p + (p.length ? '&' : '?') + k + '=' + JSON.stringify(state[k]);
    }, '');
    return window.location.origin + window.location.pathname + q;
};

