const path = require('path')

module.exports = {
	// set your styleguidist configuration here
	title: 'MOLGENIS EMX2 Style Guide',
	ribbon: {
		// Link to open on the ribbon click (required)
		url: 'https://github.com/mswertz/molgenis-emx2-ui/',
		// Text to show on the ribbon (optional)
		text: 'Fork me on GitHub'
	},
	theme: {
		color: {
			ribbonBackground: 'black',
		}
	},
	//here proxy
	webpackConfig: {
		devServer: {
			proxy: {
				'/api': 'http://localhost:8080'
			},
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}
	},
	exampleMode: 'collapse',
	template: {
		head: {
			links: [
				{
					rel: 'stylesheet',
					href:
						'css/bootstrap-molgenis-blue.min.css'
				}, {
					rel: 'stylesheet',
					href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
				}
			]
		}
	},
	styleguideDir: "docs",
	sections: [
		{
			name: 'Introduction',
			content: 'src/styleguide/introduction.md'
		},
		{
			name: 'Elements',
			components: 'src/components/elements/[A-Z]*.vue'
		},
		{
			name: 'Containers',
			components: 'src/components/containers/[A-Z]*.vue'
		},
		{
			name: 'Molecules',
			components: 'src/components/molecules/[A-Z]*.vue'
		},
		{
			name: 'Organisms',
			content: 'src/styleguide/organisms.md',
			components: 'src/components/organisms/[A-Z]*.vue'
		}
	]
}