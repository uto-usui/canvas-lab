import webpack from 'webpack';
import path from 'path';
//import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

module.exports = {
  entry: {
    index: './src/assets/js/main/main.js', // オブジェクト形式で追加
  },
  output: {
    filename: '[name].js' // entryで指定したkey名を受け注ぐ
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              'modules': false,
              'targets': {
                'browsers': [
                  'last 2 versions',
                ]
              },
            }]
          ]
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {},
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader?includePaths[]=./src/sass/',
            js: 'babel-loader!eslint-loader'
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'css-loader',
        ]
      },
    ],
  },
  resolve: {
    // 拡張子の省略の許可
    extensions: [
      '.js',
      '.ts',
      '.vue'
    ],
    // パスをkey名で定義 わかりやすく大文字で初めておく
    alias: {
      // /なしだと/node_modules/階層へ
      'Vue$': 'vue/dist/vue.common.js',
      // /ありだとrootからのパスに
      'Component': path.resolve(__dirname, 'src/assets/js/component/'),
      'TweenMax': 'gsap/TweenMax.js'
    },
  },
  plugins: [
    // モジュールを自動的に読み込む
    // keyがモジュール内の空き変数として検出されると、モジュールは自動的にロードされる
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // new UglifyJSPlugin()
  ],
}
