var maybeParse = function(key, val) {
    if (['r', 'resource', 'b', 'base'].includes(key)) {
        if (val[0] == '[') return JSON.parse(val);
        if (val[0] != '"') return val;
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
    pointSize: 1,
    pointType: Potree.PointSizeType.ADAPTIVE,
    material: Potree.PointColorType.RGB,
    shape: Potree.PointShape.SQUARE,
    pointBudget: 3 * 1000 * 1000,
    intensityRange: [0, 256],
    weightClassification: 1,
    fov: 80,
    opacity: 1,
    rgbGamma: 1, rgbContrast: 0, rgbBrightness: 0,
    intensityGamma: 1, intensityContrast: 0, intensityBrightness: 0,
    classificationFilter: []
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

var getClassificationFilters = () => {
    var list = viewer.scene.pointclouds[0].material.classification;
    return Object.keys(list).reduce((p, c, i) => {
        if (c != 'DEFAULT' && !list[c].w) return p.concat(parseInt(c));
        else return p;
    }, []);
};

var get = () => {
    var pc = viewer.scene.pointclouds[0];
    var mt = pc.material;

    var state = {
        // Include these if they've changed from the initial state.
        ps: maybe('pointSize', mt.size),
        pt: maybe('pointType', mt.pointSizeType),
        fov: maybe('fov', viewer.fov),
        op: maybe('opacity', mt.opacity),
        edl: maybe('edl', viewer.getEDLEnabled()),
        er: maybe('edlRadius', viewer.getEDLRadius()),
        es: maybe('edlStrength', viewer.getEDLStrength()),
        pb: maybe('pointBudget', viewer.getPointBudget()),
        m: maybe('material', mt.pointColorType),
        sh: maybe('shape', mt.shape),
        ir: maybe('intensityRange',
                [mt.intensityRange[0], mt.intensityRange[1]]),
        era: maybe('elevationRange',
                [mt.elevationRange[0], mt.elevationRange[1]]),
        cg: maybe('rgbGamma', mt.rgbGamma),
        cc: maybe('rgbContrast', mt.rgbContrast),
        cb: maybe('rgbBrightness', mt.rgbBrightness),
        ig: maybe('intensityGamma', mt.intensityGamma),
        ic: maybe('intensityContrast', mt.intensityContrast),
        ib: maybe('intensityBrightness', mt.intensityBrightness),

        cf: maybe('classificationFilter', getClassificationFilters()),

        // Always include these.
        p: viewer.scene.view.position.toArray(),
        t: viewer.scene.view.getPivot().toArray(),

        // For these, only include them if they are query overrides.
        r: getQueryParam('r') || getQueryParam('resource'),
        b: getQueryParam('b') || getQueryParam('base')
    };

    return Object.keys(state).reduce((p, k) => {
        if (state[k] != null) p[k] = state[k];
        return p;
    }, { });
};

var set = (k, v) => {
    switch (k) {
        case 'pointSize': case 'ps':
            viewer.scene.pointclouds.forEach((p) => p.material.size = v);
            break;
        case 'pointSizing': case 'pointType': case 'pt':
            viewer.scene.pointclouds.forEach((p) => p.material.pointSizeType = v);
            break;
        case 'fov': case 'FOV':
            viewer.setFOV(v);
            break;
        case 'opacity': case 'op':
            viewer.scene.pointclouds.forEach((p) => p.material.opacity = v);
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
        /*
        case 'clipMode': case 'cm':
            var mode;
            if (v == 'HIGHLIGHT_INSIDE') mode = Potree.ClipMode.HIGHLIGHT_INSIDE;
            else if (v === 'CLIP_OUTSIDE') mode = Potree.ClipMode.CLIP_OUTSIDE;
            else if (v === 'DISABLED')  mode = Potree.ClipMode.DISABLED;
            if (mode) viewer.setClipMode(mode);
            break;
        */
        case 'pointBudget': case 'pb':
            viewer.setPointBudget(v);
            break;
        case 'showBoundingBox': case 'sbb':
            viewer.setShowBoundingBox(v);
            break;
        case 'material': case 'm': case 'color': case 'c':
            viewer.scene.pointclouds.forEach((p) => p.material.pointColorType = v);
            break;
        case 'shape': case 'sh':
            viewer.scene.pointclouds.forEach((p) => p.material.shape = v);
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
            viewer.scene.pointclouds.forEach((p) =>
                    p.material.intensityRange = [v[0], v[1]]);
            break;
        case 'elevationRange': case 'era':
            viewer.scene.pointclouds.forEach((p) =>
                    p.material.elevationRange = [v[0], v[1]]);
            break;
        case 'rgbGamma': case 'cg':
            viewer.scene.pointclouds.forEach((p) => p.material.rgbGamma = v);
            break;
        case 'rgbContrast': case 'cc':
            viewer.scene.pointclouds.forEach((p) => p.material.rgbContrast = v);
            break;
        case 'rgbBrightness': case 'cb':
            viewer.scene.pointclouds.forEach((p) => p.material.rgbBrightness = v);
            break;
        case 'intensityGamma': case 'ig':
            viewer.scene.pointclouds.forEach((p) =>
                    p.material.intensityGamma = v);
            break;
        case 'intensityContrast': case 'ic':
            viewer.scene.pointclouds.forEach((p) =>
                    p.material.intensityContrast = v);
            break;
        case 'intensityBrightness': case 'ib':
            viewer.scene.pointclouds.forEach((p) =>
                    p.material.intensityBrightness = v);
            break;
        case 'weightClassification': case 'wc':
            viewer.scene.pointclouds.forEach((p) =>
                    p.material.weightClassification = v);
            break;
        case 'classificationFilter': case 'cf':
            for (var i = 0; i < v.length; ++i) {
                var c = document.getElementById('chkClassification_' + v[i]);
                if (c) {
                    c.checked = false;
                    viewer.setClassificationVisibility(v[i], false);
                }
            }
            break;
        case 'language': case 'l': case 'lang':
            viewer.setLanguage(v);
            break;
        case 'description':
            viewer.setDescription(v);
            break;
        case 'resource': case 'r':
        case 'base': case 'b':
        case 'near': case 'far':
        case 'debug':
        case 'annotations':
            // Handled elsewhere.
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

    if (typeof(Storage) !== 'undefined') {
        var pb = parseInt(localStorage.getItem('pointBudget'));
        if (Number.isInteger(pb)) {
            console.log('Setting pointBudget from localStorage');
            viewer.setPointBudget(pb);
        }
    }
};

// Only allow resource override if the config doesn't specify one - this avoids
// things like /data/autzen.html?resource=half-dome
var resources =
    config.resource ||
    getQueryParam('r') ||
    getQueryParam('resource');

if (!Array.isArray(resources)) resources = [resources];

if (!resources) throw new Error('No resource supplied');

var mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

if (mobileRegex.test(navigator.userAgent)) {
    console.log('Using mobile settings');
    config.pointBudget = 700000;
    config.edl = false;
}

window.Vec = (x, y, z) => {
    if (Array.isArray(x)) return new THREE.Vector3(x[0], x[1], x[2]);
    else return new THREE.Vector3(x, y, z);
};

window.addAnnotation = (v) => {
    viewer.scene.addAnnotation(Vec(v.pos), {
        title: v.name,
        cameraPosition: Vec(v.cpos),
        cameraTarget: Vec(v.ctgt),
        actions: v.actions
    });
};

var init = (name) => {
    viewer.loadGUI(() => {
        $('#menu_appearance').next().show();
        if (config.debug || defaults.debug || getQueryParam('debug')) {
            viewer.toggleSidebar();
        }

        configure();

        var q = '';
        var r = getQueryParam('r') || getQueryParam('resource');
        var b = getQueryParam('b') || getQueryParam('base');
        if (r) q += (q ? '&' : '?') + 'r=' + JSON.stringify(r);
        if (b) q += (q ? '&' : '?') + 'b=' + JSON.stringify(b);

        history.replaceState(null, null, location.pathname + q);

        viewer.useHQ = true;

        viewer.addEventListener('point_budget_changed', (e) => {
            if (typeof(Storage) !== 'undefined') {
                console.log('Storing pointBudget');
                localStorage.setItem('pointBudget', viewer.getPointBudget());
            }
        });

        if (config.annotations) config.annotations.forEach((a) => {
            addAnnotation(a);
        });

        $('#menu_scene').click();
        if (name) $("a:contains('" + name + "')").click();
    });
};

var loaded = 0;

var http = 'http';
var base = 'https://na-c.entwine.io/'
if (getQueryParam('b')) {
    base = getQueryParam('b');
    if (base[base.length - 1] != '/') base += '/';
}

var post = 'entwine.json';

resources.forEach((path) => {
    if (path.substring(0, http.length) != http) path = base + path;
    if (path.indexOf(post) == -1) {
        if (path[path.length - 1] != '/') path += '/';
        path += post;
    }

    var name = path.replace('/entwine.json', '').split('/');
    name = name[name.length - 1];

    console.log('Loading', name, path);

    Potree.loadPointCloud(path, name, (e) => {
        console.log('Loaded', name);
        viewer.scene.addPointCloud(e.pointcloud);
        console.log(e.pointcloud);

        if (++loaded == resources.length) {
            console.log('All point clouds loaded');
            viewer.fitToScreen();
            // viewer.scene.camera.near = 10;

            // var elevObj = viewer.getElevationRange();
            // defaults.elevationRange = [elevObj.min, elevObj.max];
            // if (config.near) viewer.scene.camera.near = config.near;
            // if (config.far) viewer.scene.camera.far = config.far;

            init(resources.length == 1 ? name : null);
        }
    });
});

document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    console.log(charStr);
};

window.toggleAnnotations = () => {
    var el = $('#entwine_toggle');
    var turningOn = el.attr('state') == 'off';

    if (turningOn) {
        $('.annotation').each(function() { $(this).removeClass('display_none') })
        el.attr('state', 'on');
        el.attr('src', '/resources/icons/entwine-annotations-on.svg');
    }
    else {
        $('.annotation').each(function() { $(this).addClass('display_none') })
        el.attr('state', 'off');
        el.attr('src', '/resources/icons/entwine-annotations-off.svg');
    }
}

new Clipboard('#entwine_copy', {
    text: function() {
        var state = get();
        var keys = Object.keys(state);
        var moveToFront = function(k) {
            if (state[k]) keys = [k].concat(keys.filter((v) => v != k));
        };
        moveToFront('r');
        moveToFront('b');
        var q = keys.reduce((p, k) => {
            return p + (p.length ? '&' : '?') +
                k + '=' + JSON.stringify(state[k]);
        }, '');
        return window.location.origin + window.location.pathname + encodeURI(q);
    }
});

