module.exports = {
	// set your styleguidist configuration here
	title: 'MOLGENIS EMX2 Style Guide',
	// components: 'src/components/**/[A-Z]*.vue',
	// defaultExample: true,
	// sections: [
	//   {
	//     name: 'First Section',
	//     components: 'src/components/**/[A-Z]*.vue'
	//   }
	// ],
	// webpackConfig: {
	//   // custom config goes here
	// },
	exampleMode: 'expand',
	template: {
		head: {
			links: [
				{
					rel: 'stylesheet',
					href:
						'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
					integrity: 'sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm',
					crossorigin: 'anonymous'
				}
			]
		}
	},
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
		}
	]
}