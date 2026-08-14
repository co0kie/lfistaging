import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';
import Markdoc from '@markdoc/markdoc';

export default defineMarkdocConfig({
  tags: {
    chp_eligibility: {
      render: component('./src/components/ChpEligibility/ChpEligibility.astro'),
    },
  },
  nodes: {
    link: {
      ...nodes.link,
      attributes: {
        ...nodes.link.attributes,
        rel: { type: String },
        target: { type: String },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const { href } = attributes;
        
        // If it's an external link, add target="_blank" and rel attributes
        if (href && (href.startsWith('http') || href.startsWith('//'))) {
          attributes.rel = 'nofollow noreferrer noopener';
          attributes.target = '_blank';
        }
        
        return new Markdoc.Tag(nodes.link.render, attributes, node.transformChildren(config));
      },
    },
  },
});

