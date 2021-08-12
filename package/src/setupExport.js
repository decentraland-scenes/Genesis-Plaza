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
var fs_1 = require("fs");
var fs = fs_1.promises;
var setupExport = function (_a) {
    var workDir = _a.workDir, exportDir = _a.exportDir, mappings = _a.mappings, sceneJson = _a.sceneJson;
    return __awaiter(void 0, void 0, void 0, function () {
        var ecsPath, dclKernelPath, dclKernelDefaultProfilePath, dclUnityRenderer, content, finalContent, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    ecsPath = path.dirname(require.resolve('decentraland-ecs/package.json', {
                        paths: [workDir, __dirname + '/../../', __dirname + '/../']
                    }));
                    dclKernelPath = path.dirname(require.resolve('@dcl/kernel/package.json', { paths: [workDir, ecsPath] }));
                    dclKernelDefaultProfilePath = path.resolve(dclKernelPath, 'default-profile');
                    dclUnityRenderer = path.dirname(require.resolve('@dcl/unity-renderer/package.json', { paths: [workDir, ecsPath] }));
                    return [4 /*yield*/, fs.readFile(path.resolve(dclKernelPath, 'export.html'), 'utf-8')];
                case 1:
                    content = _b.sent();
                    finalContent = content.replace('{{ scene.display.title }}', sceneJson.display.title);
                    return [4 /*yield*/, Promise.all([
                            // copy project
                            fs.writeFile(path.resolve(exportDir, 'index.html'), finalContent, 'utf-8'),
                            fs.writeFile(path.resolve(exportDir, 'mappings'), JSON.stringify(mappings), 'utf-8'),
                            // copy dependencies
                            copyDir(dclUnityRenderer, path.resolve(exportDir, 'unity-renderer')),
                            copyDir(dclKernelDefaultProfilePath, path.resolve(exportDir, 'default-profile')),
                            fs.copyFile(path.resolve(dclKernelPath, 'index.js'), path.resolve(exportDir, 'index.js'))
                        ])];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    console.error('Export failed.', err_1);
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
};
// instead of using fs-extra, create a custom function to no need to rollup
function copyDir(src, dest) {
    return __awaiter(this, void 0, void 0, function () {
        var entries, _i, entries_1, entry, srcPath, destPath, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fs.mkdir(dest, { recursive: true })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, fs.readdir(src, { withFileTypes: true })];
                case 2:
                    entries = _b.sent();
                    _i = 0, entries_1 = entries;
                    _b.label = 3;
                case 3:
                    if (!(_i < entries_1.length)) return [3 /*break*/, 9];
                    entry = entries_1[_i];
                    srcPath = path.join(src, entry.name);
                    destPath = path.join(dest, entry.name);
                    if (!entry.isDirectory()) return [3 /*break*/, 5];
                    return [4 /*yield*/, copyDir(srcPath, destPath)];
                case 4:
                    _a = _b.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, fs.copyFile(srcPath, destPath)];
                case 6:
                    _a = _b.sent();
                    _b.label = 7;
                case 7:
                    _a;
                    _b.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 3];
                case 9: return [2 /*return*/];
            }
        });
    });
}
module.exports = setupExport;
