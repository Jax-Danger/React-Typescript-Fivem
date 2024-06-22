fx_version 'cerulean'

games {"gta5"}

author "JSP"
description "--"
version '1.0.0'

lua54 'yes'

server_scripts {'build/server.js'}
client_script {"build/client.js"}
ui_page 'build/web/index.html'

files {
    'build/web/index.html', 'build/web/js/index.js',
    'build/web/styles/index.css'
}
