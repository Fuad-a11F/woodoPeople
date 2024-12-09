"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const vite_1 = require("vite");
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const isDev = () => process.env.NODE_ENV === 'development';
async function startServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    const port = Number(process.env.SERVER_PORT) || 3001;
    let vite;
    const distPath = path.dirname(require.resolve('client/dist/index.html'));
    const srcPath = path.dirname(require.resolve('client'));
    const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');
    if (isDev()) {
        vite = await (0, vite_1.createServer)({
            server: { middlewareMode: true },
            root: srcPath,
            appType: 'custom',
        });
        app.use(vite.middlewares);
    }
    app.get('/api', (_, res) => {
        res.json('👋 Howdy from the server :)');
    });
    app.get('/user', (_, res) => {
        res.json({ name: '</script>Степа', secondName: 'Степанов' });
    });
    if (!isDev()) {
        app.use('/assets', express_1.default.static(path.resolve(distPath, 'assets')));
    }
    app.use('*', async (req, res, next) => {
        var _a;
        const url = req.originalUrl;
        try {
            let template;
            if (!isDev()) {
                template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
            }
            else {
                template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
                template = await vite.transformIndexHtml(url, template);
            }
            let render;
            if (!isDev()) {
                render = (await (_a = ssrClientPath, Promise.resolve().then(() => __importStar(require(_a))))).render;
            }
            else {
                render = (await vite.ssrLoadModule(path.resolve(srcPath, 'src/entry-server.tsx')))
                    .render;
            }
            const { html: appHtml, initialState } = await render(req);
            const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(`<!--ssr-initial-state-->`, `<script>window.APP_INITIAL_STATE = ${JSON.stringify(initialState)}</script>`);
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (e) {
            if (isDev()) {
                vite.ssrFixStacktrace(e);
            }
            next(e);
        }
    });
    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}
startServer();
