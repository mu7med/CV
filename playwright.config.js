const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    use: {
        channel: 'chrome',
        headless: true,
        viewport: { width: 1280, height: 800 },
    },
    webServer: {
        command: 'node -e "const http=require(\'http\'),fs=require(\'fs\'),path=require(\'path\'),m={\'.html\':\'text/html\',\'.css\':\'text/css\',\'.js\':\'application/javascript\',\'.png\':\'image/png\',\'.webp\':\'image/webp\',\'.ico\':\'image/x-icon\'};http.createServer((q,s)=>{const u=decodeURIComponent(q.url.split(\'?\')[0]),f=path.join(process.cwd(),u===\'/\'?\'index.html\':u);fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);s.end();return;}s.writeHead(200,{\'Content-Type\':m[path.extname(f)]||\'application/octet-stream\'});s.end(d);});}).listen(8000);"',
        url: 'http://localhost:8000/index.html',
        reuseExistingServer: true,
        timeout: 10000,
    },
});
