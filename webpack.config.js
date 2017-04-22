require("babel-polyfill");

module.exports = {
	entry: ['babel-polyfill','./src/main.js'],
	output: {
		path: '/',
		filename: 'index.js'
	},
	devServer: {
		inline: true,
		port:1300
	},
	module: {
       loaders: [
         {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
              presets: ["react", "es2015"]
         }
     },{
               test: /\.css$/,
               loader: "style-loader!css-loader"
           },
       ]
	}
}