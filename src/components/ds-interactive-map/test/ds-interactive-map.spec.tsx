import { newSpecPage } from '@stencil/core/testing';
import { MyInteractiveMap } from '../ds-interactive-map';

describe('ds-interactive-map', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyInteractiveMap],
      html: `<ds-interactive-map></ds-interactive-map>`,
    });
    expect(page.root).toEqualHtml(`
      <ds-interactive-map>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ds-interactive-map>
    `);
  });
});
