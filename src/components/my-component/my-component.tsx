import { Component, Prop, h, Element, Watch, State } from '@stencil/core';
import Splide from '@splidejs/splide';
import { Video } from '@splidejs/splide-extension-video';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: false,
  assetsDirs: ['assets'],
  // shadow: true,
})
export class MyComponent {
  @Prop() videoIds: string = '';
  @Watch('videoIds') videoIdsChanged(source: Array<string> = []) {
    let newSource = [...source];
    console.log(newSource);
  }
  @Element() el: HTMLElement;

  @Prop({ attribute: 'options', reflect: true }) options: string = '';
  @State() _options: string[] = [];

  componentWillLoad() {
    this.parseOptions();
  }
  @Watch('options')
  parseOptions() {
    if (this.options) {
      // this._options = this.stringToArray(this.options);
      // this._options = JSON.parse(this.options);
      this._options = this.options.split(',').map(x => x.trim());
    }
  }
  stringToArray<T>(arg: T[] | string): T[] {
    const opts =
      typeof arg === 'string'
        ? (arg as string).split(',').map(p => +p.trim())
        : // .filter(hasValue)
          arg;

    return opts as T[];
  }
  // connectedCallback() {
  //   this.videoIdsChanged(this.videoIds);
  // }
  componentDidRender() {
    console.log({ opt: this._options });
    // new Splide(this.el!.getElementById('image-slider')!).mount({ Video });

    new Splide('.splide', {
      // arrows: false,
      hasSliderWrapper: true,
      classes: {
        prev: 'splide__arrow--prev my-class-prev',
        next: 'splide__arrow--next my-class-next',
      },
    }).mount({ Video });
  }
  render() {
    return (
      <div class="wrapper">
        <div class="splide">
          <div class="splide__arrows">
            <button class="splide__arrow splide__arrow--prev my-class-prev">
              <svg width="95" height="161" viewBox="0 0 95 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.05549 4.89757C3.7306 6.21975 2.67949 7.79024 1.96231 9.51915C1.24513 11.2481 0.875977 13.1014 0.875977 14.9732C0.875977 16.845 1.24513 18.6983 1.96231 20.4272C2.67949 22.1562 3.7306 23.7267 5.05549 25.0488L60.5071 80.5005L5.05549 135.952C2.38327 138.624 0.882028 142.249 0.882028 146.028C0.882028 149.807 2.38327 153.431 5.05549 156.103C7.72771 158.776 11.352 160.277 15.1311 160.277C18.9102 160.277 22.5345 158.776 25.2067 156.103L90.8055 90.5047C92.1304 89.1825 93.1815 87.612 93.8987 85.8831C94.6158 84.1542 94.985 82.3008 94.985 80.429C94.985 78.5573 94.6158 76.7039 93.8987 74.975C93.1815 73.2461 92.1304 71.6756 90.8055 70.3534L25.2067 4.75465C19.7759 -0.676182 10.6292 -0.676179 5.05549 4.89757Z"
                  fill="white"
                  fill-opacity="0.35"
                />
              </svg>
            </button>
            <button class="splide__arrow splide__arrow--next my-class-next">
              <svg width="95" height="161" viewBox="0 0 95 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.05549 4.89757C3.7306 6.21975 2.67949 7.79024 1.96231 9.51915C1.24513 11.2481 0.875977 13.1014 0.875977 14.9732C0.875977 16.845 1.24513 18.6983 1.96231 20.4272C2.67949 22.1562 3.7306 23.7267 5.05549 25.0488L60.5071 80.5005L5.05549 135.952C2.38327 138.624 0.882028 142.249 0.882028 146.028C0.882028 149.807 2.38327 153.431 5.05549 156.103C7.72771 158.776 11.352 160.277 15.1311 160.277C18.9102 160.277 22.5345 158.776 25.2067 156.103L90.8055 90.5047C92.1304 89.1825 93.1815 87.612 93.8987 85.8831C94.6158 84.1542 94.985 82.3008 94.985 80.429C94.985 78.5573 94.6158 76.7039 93.8987 74.975C93.1815 73.2461 92.1304 71.6756 90.8055 70.3534L25.2067 4.75465C19.7759 -0.676182 10.6292 -0.676179 5.05549 4.89757Z"
                  fill="white"
                  fill-opacity="0.35"
                />
              </svg>
            </button>
          </div>

          <div class="splide__track">
            <ul class="splide__list">
              {this._options.map(id => (
                <li class="splide__slide" data-splide-youtube={id}>
                  <img class="img-thumbnail" src={`https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`} />
                  {/* <li class="splide__slide" data-splide-youtube={'cdz__ojQOuU'}> */}
                  {/* <img class="img-thumbnail" src={`https://i3.ytimg.com/vi/${'cdz__ojQOuU'}/maxresdefault.jpg`} /> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
