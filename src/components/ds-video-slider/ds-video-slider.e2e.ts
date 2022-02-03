import { newE2EPage } from '@stencil/core/testing';

describe('ds-video-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ds-video-slider></ds-video-slider>');
    const element = await page.find('ds-video-slider');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<ds-video-slider></ds-video-slider>');
    const component = await page.find('ds-video-slider');
    const element = await page.find('ds-video-slider >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
