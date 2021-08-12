"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var path = require("path");
var fs = require("fs");
var http_proxy_middleware_1 = require("http-proxy-middleware");
var glob_1 = require("glob");
var setupProxy = function (dcl, app) {
    // first resolve all dependencies in the local current working directory
    // second try to resolve dependencies in decentraland-ecs folder
    /**
     * to test locally with linked packages:
     *
     * 1. go to explorer/kernel/static and run `npm link`
     * 2. in an empty folder create a test scene with `dcl init`
     * 3. in that folder run `npm install folder-to/decentraland-ecs`
     * 4. install whatever version of `@dcl/unity-renderer` you want to test
     * 5. link kernel using `npm link @dcll/kernel` this will use the folder from step 1
     */
    var ecsPath = path.dirname(require.resolve('decentraland-ecs/package.json', {
        paths: [dcl.getWorkingDir(), __dirname + '/../../', __dirname + '/../']
    }));
    var dclKernelPath = path.dirname(require.resolve('@dcl/kernel/package.json', { paths: [dcl.getWorkingDir(), ecsPath] }));
    var dclKernelDefaultProfilePath = path.resolve(dclKernelPath, 'default-profile');
    var dclKernelImagesDecentralandConnect = path.resolve(dclKernelPath, 'images', 'decentraland-connect');
    var dclKernelLoaderPath = path.resolve(dclKernelPath, 'loader');
    var dclUnityRenderer = path.dirname(require.resolve('@dcl/unity-renderer/package.json', { paths: [dcl.getWorkingDir(), ecsPath] }));
    mockCatalyst(app, [dcl.getWorkingDir()]);
    var routes = [
        {
            route: '/',
            path: path.resolve(dclKernelPath, 'preview.html'),
            type: 'text/html'
        },
        {
            route: '/favicon.ico',
            path: path.resolve(dclKernelPath, 'favicon.ico'),
            type: 'text/html'
        },
        {
            route: '/@/artifacts/index.js',
            path: path.resolve(dclKernelPath, 'index.js'),
            type: 'text/javascript'
        }
    ];
    var _loop_1 = function (route) {
        app.get(route.route, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var contentFile;
            return __generator(this, function (_a) {
                res.setHeader('Content-Type', route.type);
                contentFile = fs.readFileSync(route.path);
                res.send(contentFile);
                return [2 /*return*/];
            });
        }); });
    };
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var route = routes_1[_i];
        _loop_1(route);
    }
    createStaticRoutes(app, '/images/decentraland-connect/*', dclKernelImagesDecentralandConnect);
    createStaticRoutes(app, '/@/artifacts/unity-renderer/*', dclUnityRenderer);
    createStaticRoutes(app, '/@/artifacts/loader/*', dclKernelLoaderPath);
    createStaticRoutes(app, '/default-profile/*', dclKernelDefaultProfilePath);
};
var createStaticRoutes = function (app, route, localFolder) {
    app.use(route, function (req, res, next) {
        var options = {
            root: localFolder,
            dotfiles: 'deny',
            maxAge: 1,
            cacheControl: false,
            lastModified: true,
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true,
                etag: JSON.stringify(Date.now().toString()),
                'cache-control': 'no-cache,private,max-age=1'
            }
        };
        var fileName = req.params[0];
        res.sendFile(fileName, options, function (err) {
            if (err) {
                next(err);
            }
        });
    });
};
var mockCatalyst = function (app, baseFolders) {
    serveFolders(app, baseFolders);
    app.get('/lambdas/explore/realms', function (req, res) {
        res.json([
            {
                serverName: 'localhost',
                url: "http://" + req.get('host'),
                layer: 'stub',
                usersCount: 0,
                maxUsers: 100,
                userParcels: []
            }
        ]);
    });
    app.get('/lambdas/contracts/servers', function (req, res) {
        res.json([
            {
                address: "http://" + req.get('host'),
                owner: '0x0000000000000000000000000000000000000000',
                id: '0x0000000000000000000000000000000000000000000000000000000000000000'
            }
        ]);
    });
    // fallback all lambdas to a real catalyst
    app.use('/lambdas', http_proxy_middleware_1.createProxyMiddleware({
        target: 'https://peer-lb.decentraland.org/',
        changeOrigin: true
    }));
    // fallback all lambdas to a real catalyst
    app.use('/content', http_proxy_middleware_1.createProxyMiddleware({
        target: 'https://peer-lb.decentraland.org/',
        changeOrigin: true
    }));
};
var entityV3FromFolder = function (folder) {
    var sceneJsonPath = path.resolve(folder, './scene.json');
    if (fs.existsSync(sceneJsonPath)) {
        var sceneJson = JSON.parse(fs.readFileSync(sceneJsonPath).toString());
        var _a = sceneJson.scene, base = _a.base, parcels = _a.parcels;
        var pointers_1 = new Set();
        pointers_1.add(base);
        parcels.forEach(function ($) { return pointers_1.add($); });
        var allFiles = glob_1.sync('**/*', {
            cwd: folder,
            dot: false,
            ignore: ['node_modules/**/*', '.git/**/*'],
            absolute: true
        })
            .map(function (file) {
            try {
                if (!fs.statSync(file).isFile())
                    return;
            }
            catch (err) {
                return;
            }
            var key = file.replace(folder, '').replace(/^\/+/, '');
            return { file: key.toLowerCase(), hash: 'b64-' + Buffer.from(file).toString('base64') };
        })
            .filter(function ($) { return !!$; });
        return {
            version: 'v3',
            type: 'scene',
            id: 'b64-' + Buffer.from(folder).toString('base64'),
            pointers: Array.from(pointers_1),
            timestamp: Date.now(),
            metadata: sceneJson,
            content: allFiles
        };
    }
    return null;
};
var serveFolders = function (app, baseFolders) {
    app.get('/content/contents/:hash', function (req, res, next) {
        if (req.params.hash && req.params.hash.startsWith('b64-')) {
            var fullPath_1 = path.resolve(Buffer.from(req.params.hash.replace(/^b64-/, ''), 'base64').toString('utf8'));
            // only return files IF the file is within a baseFolder
            if (!baseFolders.find(function ($) { return fullPath_1.startsWith($); })) {
                res.end(404);
                return;
            }
            var options = {
                dotfiles: 'deny',
                maxAge: 1,
                cacheControl: false,
                lastModified: true,
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true,
                    etag: JSON.stringify(Date.now().toString()),
                    'cache-control': 'no-cache,private,max-age=1'
                }
            };
            res.sendFile(fullPath_1, options, function (err) {
                if (err) {
                    next(err);
                }
            });
        }
    });
    app.get('/content/entities/scene', function (req, res) {
        if (!req.query.pointer) {
            res.json([]);
            return;
        }
        var requestedPointers = new Set(req.query.pointer && typeof req.query.pointer == 'string'
            ? [req.query.pointer]
            : req.query.pointer);
        var resultEntities = [];
        var allDeployments = baseFolders.map(function (folder) { return entityV3FromFolder(folder); });
        var _loop_2 = function (pointer) {
            // get deployment by pointer
            var theDeployment = allDeployments.find(function ($) { return $ && $.pointers.includes(pointer); });
            if (theDeployment) {
                // remove all the required pointers from the requestedPointers set
                // to prevent sending duplicated entities
                theDeployment.pointers.forEach(function ($) { return requestedPointers["delete"]($); });
                // add the deployment to the results
                resultEntities.push(theDeployment);
            }
        };
        for (var _i = 0, _a = Array.from(requestedPointers); _i < _a.length; _i++) {
            var pointer = _a[_i];
            _loop_2(pointer);
        }
        res.json(resultEntities).end();
    });
};
module.exports = setupProxy;
