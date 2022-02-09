import { Component, h } from '@stencil/core';
import Plyr from 'plyr';
import Swiper, { EffectCoverflow, Navigation, Pagination } from 'swiper';
// import 'swiper/modules/effect-coverflow';
// import 'swiper/modules/effect-coverflow';
// import 'swiper/modules/effect-coverflow';
// import Swiper, { Navigation, Pagination } from 'swiper';
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

@Component({
  tag: 'ds-carousel-slider',
  styleUrl: 'carousel-slider.scss',
  shadow: false,
})
export class CarouselSlider {
  pathContent = () => (
    <path
      d="M124.664 75.6397C123.424 76.669 122.44 77.8917 121.768 79.2378C121.097 80.5838 120.751 82.0267 120.751 83.4839C120.751 84.9412 121.097 86.3841 121.768 87.7301C122.44 89.0762 123.424 90.2988 124.664 91.3282L176.571 134.499L124.664 177.671C122.162 179.751 120.757 182.573 120.757 185.515C120.757 188.457 122.162 191.279 124.664 193.359C127.165 195.44 130.558 196.608 134.095 196.608C137.633 196.608 141.025 195.44 143.527 193.359L204.932 142.288C206.172 141.259 207.156 140.036 207.827 138.69C208.499 137.344 208.844 135.901 208.844 134.444C208.844 132.987 208.499 131.544 207.827 130.198C207.156 128.852 206.172 127.629 204.932 126.6L143.527 75.5284C138.443 71.3003 129.881 71.3003 124.664 75.6397Z"
      fill="white"
      fill-opacity="0.75"
    />
  );

  componentDidRender() {
    //@ts-ignore
    // const players = Array.from(document.querySelectorAll('.js-player')).map(p => new Plyr(p));

    new Swiper('.swiper', {
      modules: [EffectCoverflow, Navigation, Pagination],
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 3,
      loop: true,

      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: 100,
        depth: 150,
        modifier: 2,
        slideShadows: true,
      },
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
    });
  }

  render() {
    return (
      <div class="swiper">
        <div class="swiper-wrapper">
          {...Array.from({ length: 9 }, (_, i) => (
            <div
              class="swiper-slide swiper-slide-bg"
              style={{
                'background-image': `url(https://swiperjs.com/demos/images/nature-${i + 1}.jpg)`,
              }}
            >
              <div class="plyr__video-embed js-player">
                {/* <iframe
                  src="https://www.youtube.com/embed/bTqVqk7FSmY?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
                  allowfullScreen
                  allowtransparency
                ></iframe> */}
              </div>
            </div>
          ))}
        </div>
        {/* <div class="swiper-pagination"></div> */}
        <div class="swiper-button-prev swiper-button-prev-custom">
          <svg width="322" height="269" viewBox="0 0 322 269" fill="none" transform="scale(-1 1)" xmlns="http://www.w3.org/2000/svg">
            {this.pathContent()}
          </svg>
        </div>
        <div class="swiper-button-next swiper-button-next-custom">
          <svg width="322" height="269" viewBox="0 0 322 269" fill="none" xmlns="http://www.w3.org/2000/svg">
            {this.pathContent()}
          </svg>
        </div>
      </div>
    );
  }
}
