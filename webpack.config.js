var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

var CleanWebpackPlugin = require('clean-webpack-plugin')

var TailwindCSS = require('tailwindcss')
var AutoPrefixer =  require('autoprefixer')
var PostCssImport = require('postcss-import')

var CopyWebpackPlugin = require('copy-webpack-plugin');

var environment = process.env.NODE_ENV || 'development';



let pathsToClean = [
  'public'
]

// the clean options to use
let cleanOptions = {
  verbose:  true,
  dry:      false
}


var extractPlugin = new ExtractTextPlugin({
   filename: 'app/assets/main.[hash].css'
});


var webpackPlugins = [
  new CleanWebpackPlugin(pathsToClean, cleanOptions),
    extractPlugin,
    new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),

      new CopyWebpackPlugin([
            {from:'app/assets/img',to:'img'  }
        ]),
    PostCssImport,
    TailwindCSS,
    AutoPrefixer
]



const routesData = {
  routes: [
    {url: '/', title: 'Arcbond', template: 'app/index.html', filename: 'index.html'},

  ]
}


routesData.routes.forEach(function(element){

  var htmlPlugin = new HtmlWebpackPlugin({
        title: element.title,
        filename: element.filename,
        template: element.template
  });

 webpackPlugins.push(htmlPlugin)

})



module.exports = {
    entry: ['./app/assets/javascripts/index', './app/assets/stylesheets/application.css' ],
    output: {
        path: path.resolve(__dirname, 'public'),
      //  filename: 'bundle.js',
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2016']
                        }
                    }
                ]
            },
            {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        }),
      },
            {
              test: /\.(png|jpg|gif)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[path][name].[ext]',
                     publicPath: '/',
                  }
                }
              ]
            },

            {
              test: /\.(eot|woff|woff2|ttf|svg)(\?[\s\S]+)?$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[path][name].[ext]',
                     publicPath: '/',
                  }
                }
              ]
            },

        {
            test: /\.(png|jp(e*)g|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                }
            }]
        }
        ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
      }
    },
    plugins: webpackPlugins
};
