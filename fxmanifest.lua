fx_version 'cerulean'

games {"gta5"}

author "JSP"
description "--"
version '1.0.0'

lua54 'yes'

ui_page 'build/web/index.html'

client_script "build/client/**/*"
server_scripts "build/server/**/*"

files {
  'build/web/index.html',
  'build/web/js/index.js',
  'build/web/styles/index.css'
}
