module.exports = {
    module: {
        rules: [
            { test: /\\.(png|jp(e*)g|svg|gif)$/, use: ['file-loader'], },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
};