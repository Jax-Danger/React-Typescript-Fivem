fx_version 'cerulean'
game 'gta5'
ui_page 'production/html/index.html'

shared_scripts {
	'production/config.js',
	'production/shared/shared.js'
}

server_scripts {
	'production/server/server.js'
}

client_scripts {
	'production/client/client.js'
}

files {
		"production/html/**/*.html", 
		"production/html/**/*.js", 
		"production/html/**/*.css" 
	}