const path = require('path');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const {
  name, version, repository,
} = require('./package.json');
const { styles, theme } = require('./styleguide.styles');

const pathComponents = 'src/components/';

const sections = [
  {
    name: 'Scripture Burrito Form',
    components: [path.join(pathComponents, 'scripture-burrito-form', 'ScriptureBurritoForm.js')]
  },
];

module.exports = {
  title: `${upperFirst(camelCase(name))} v${version}`,
  ribbon: {
    url: repository.url,
    text: 'View on GitHub',
  },
  styles,
  theme,
  template: {
    head: {
      scripts: [
        {
          src: 'assets/js/babelHelpers.min.js'
        }
      ]
    }
  },
  getComponentPathLine: (componentPath) => {
    const file = componentPath.split('/').pop();
    const component = file.split('.').shift();
    const componentName = upperFirst(camelCase(component));
    return `import { ${componentName} } from "${name}";`;
  },
  usageMode: 'expand',
  exampleMode: 'expand',
  pagePerSection: true,
  components: 'src/components/**/[A-Z]*.js',
  moduleAliases: { 'scripture-burrito-react-jsonschema-form': path.resolve(__dirname, 'src') },
  version,
  webpackConfig: {
    devtool: 'source-map',
    node: {
      fs: "empty"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: { transpileOnly: true },
            },
          ],
        },
      ],
    },
  },
};
