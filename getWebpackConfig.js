import path from 'path';
import webpack from 'webpack';

const query = {
  presets: ['react', 'es2015'],
};

export default function getWebpackConfig(config) {
  const { production = false, local = true } = config;

  console.log(production, local);

  const devtool = production ? 'cheap-module-source-map' : 'source-map';

  return {
    context: __dirname,
    entry: {
      popup: './app/scripts.babel/popup.js',
      contentscript: './app/scripts.babel/contentscript.js',
      background: './app/scripts.babel/background.js',
    },
    output: {
      path: './app/scripts',
      filename: '[name].js',
    },
    devtool,
    module: {
      loaders: [
        {
          // babel
          test: /\.js/,
          exclude: /node_modules/,
          loaders: [`babel-loader?${JSON.stringify(query)}`],
          include: __dirname,
        },
        {
          test: /\.html$/,
          loader: 'file?name=[name].[ext]',
        },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.png$/, loader: 'url-loader?limit=100000' },
        { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url-loader?limit=100000' },
        { test: /\.(jpg|gif)$/, loader: 'file-loader' },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(production ? 'production' : 'development'), // eslint-disable-line
          'LOCAL': JSON.stringify(local), // eslint-disable-line
        },
      }),
    ],
  };
}
