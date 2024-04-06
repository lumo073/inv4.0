fx_version "cerulean"

games { "gta5" }

author 'Aspect'
description "NoPixel Boilerplate"

version "0.1.0"

ui_page 'web/dist/index.html'

files {
    "web/dist/**/*",
    "web/dist/assets/*.woff",
    "web/dist/assets/*.woff2",
    "web/dist/assets/*.png",
}

server_scripts { 
    "@np-lib/server/sv_rpc.js",
    "@np-lib/server/sv_asyncExports.js",
    "server/*.js",
}

client_scripts { 
    "@np-lib/client/cl_rpc.js",
    "client/*.js" 
}
