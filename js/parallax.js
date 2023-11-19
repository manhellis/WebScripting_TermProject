import Atropos from '../node_modules/atropos/atropos.mjs';
const myAtropos = Atropos({
    el: '.my-atropos',
    activeOffset: 20,
    shadow: true,
    shadowScale: 1.0,
    shadowOffset: 40,
    onEnter() {
      console.log('Enter');
    },
    onLeave() {
      console.log('Leave');
    },
    onRotate(x, y) {
      console.log('Rotate', x, y);
    }
});
