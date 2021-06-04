var webpack = require('webpack');//webpack 불러오기 

//객체를 모듈로 내보냄 => 다른 파일에서 불러와서 사용이 가능해짐 
module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'//output으로 내놓는 파일 이름
    },

    //개발 서버 설정
    devServer: {
        hot: true,
        inline: true,
        host: '127.0.0.1',
        port: 4000,
        contentBase: __dirname + '/public/' //index 파일의 위치
    },

    module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                }
            ]
        },

        //자동으로 reload 해주는 부분
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
};