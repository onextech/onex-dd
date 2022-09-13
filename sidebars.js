/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

const kebabCase = require('lodash/kebabCase')

const getSubcategoryLinkItems = ({category, subcategories}) => subcategories.map((subcategory) => ({
  type: 'link',
  label: subcategory,
  href: `/docs/${kebabCase(category)}#${kebabCase(subcategory)}`
}))

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mySidebar: [
    {
      type: 'category',
      label: 'Product Guide',
      link: {
        type: 'doc',
        id: 'product-guide',
      },
      collapsed: false,
      items: getSubcategoryLinkItems({
        category: 'Product Guide',
        subcategories: [
          'Handover Overview',
          'Your Application Stack',
          'Installing your source code bundle',
          'Understanding your application code architecture',
          'Server Migration',
          'Data migration',
          'Migration Checklist'
        ]
      }),
    },
    {
      type: 'doc',
      id: 'developer-installation-guide',
      label: 'Developer Installation Guide'
    },
  ]
};

module.exports = sidebars;
