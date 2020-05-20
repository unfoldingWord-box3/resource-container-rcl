const path = require('path');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const { name, version, repository } = require('./package.json');
const { styles, theme } = require('./styleguide.styles');

let sections = [
  {
    name: 'Resource Container Form',
    content: 'README.md',
    sections: [
      {
        name: 'Components',
        content: 'src/components/form/_readme.md',
        components: 'src/components/form/Form.js',
      },
      {
        name: 'Examples',
        sections: [
          {
            name: 'Form',
            sections: [
              {
                name: 'Form - Empty',
                content: path.resolve(__dirname, `src/components/form`, `Form.empty.md`),
                description: 'Empty Form'
              },
              {
                name: 'Form - Populated',
                content: path.resolve(__dirname, `src/components/form`, `Form.ult.md`),
                description: 'Populated form with th ULT'
              }
            ]
          }
        ]
      }
    ]
  }
];

module.exports = {
  title: `${upperFirst(camelCase(name))} v${version}`,
  ribbon: {
    url: repository.url,
    text: 'View on GitHub'
  },
  styles,
  theme,
  getComponentPathLine: (componentPath) => {
    const dirname = path.dirname(componentPath, '.js');
    const file = dirname.split('/').slice(-1)[0];
    const componentName = upperFirst(camelCase(file));
    return `import { ${componentName} } from "${name}";`;
  },
  usageMode: 'expand',
  exampleMode: 'expand',
  pagePerSection: true,
  sections,
  components: 'src/components/**/[A-Z]*.js',
  moduleAliases: {
    "scripture-resources-rcl": path.resolve(__dirname, "src"),
  },
  version,
  webpackConfig: {
    devtool: 'source-map',
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
      ],
    },
  },
};

