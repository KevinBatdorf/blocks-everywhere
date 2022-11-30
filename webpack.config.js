const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// update resource asset to have public path inside plugin
// required for correctly serving assets in production
defaultConfig.module.rules
	.filter( ( r ) => r.type === 'asset/resource' )
	.forEach( ( r ) => {
		r.generator.publicPath = '/wp-content/plugins/blocks-everywhere/build/';
	} );

// Default @wordpress/scripts but output with .min in the filename
module.exports = {
	...defaultConfig,
	output: {
		...defaultConfig.output,
		filename: '[name].min.js',
	},
	entry: {
		index: './src/index.js',
		[ 'support-content-editor' ]: './src/support-content-block/index.tsx',
		[ 'support-content-view' ]: './src/support-content-block/view.ts',
	},
	plugins: [
		...defaultConfig.plugins.filter( ( item ) => ! ( item instanceof MiniCssExtractPlugin ) ),
		new MiniCssExtractPlugin( { filename: '[name].min.css' } ),
	],
};
