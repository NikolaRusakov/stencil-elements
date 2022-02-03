import { newE2EPage } from '@stencil/core/testing';

describe('ds-interactive-map', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ds-interactive-map></ds-interactive-map>');

    const element = await page.find('ds-interactive-map');
    expect(element).toHaveClass('hydrated');
  });
});
