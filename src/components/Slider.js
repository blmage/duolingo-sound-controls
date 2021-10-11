import { Slider as BaseSlider } from 'primereact/slider';

export class Slider extends BaseSlider {
  onDrag(event) {
    if (this.dragging) {
      this.setValue(event);
      event.preventDefault();

      if (this.props.onSlideStart) {
        this.props.onSlideStart({ value: this.props.value });
      }
    }
  }
}
