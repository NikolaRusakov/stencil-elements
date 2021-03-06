import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './ds-video-slider';

describe('ds-video-slider', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: '<ds-video-slider></ds-video-slider>',
    });
    expect(root).toEqualHtml(`
      <ds-video-slider>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </ds-video-slider>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: `<ds-video-slider first="Stencil" last="'Don't call me a framework' JS"></ds-video-slider>`,
    });
    expect(root).toEqualHtml(`
      <ds-video-slider first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </ds-video-slider>
    `);
  });
});
