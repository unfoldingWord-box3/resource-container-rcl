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
        content: 'src/components/rc-form/_readme.md',
        components: 'src/components/rc-form/RCForm.js',
        sections: [
          {
            name: 'RCForm - Empty',
            content: path.resolve(__dirname, `src/components/rc-form`, `RCForm.md`),
            description: 'Empty Ressource Container Form'
          },
          {
            name: 'RCForm - DCS',
            content: path.resolve(__dirname, `src/components/rc-form`, `RCForm.dcs.md`),
            description: 'Populated RC Form by selecting metadata from DCS using Gitea React Toolkit'
          },
          {
            name: 'RCForm - ULT',
            content: path.resolve(__dirname, `src/components/rc-form`, `RCForm.ult.md`),
            description: 'Populated RC Form with the ULT metadata'
          }
        ],
        sectionDepth: 2
      }
    ],
    sectionDepth: 2
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

