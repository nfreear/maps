
const { Overlay } = window.ol;
const { CustomEvent } = window;

export class ButtonPin extends Overlay {
  get _clickEvent () { return 'pin:click'; }
  get button () { return this._button; }
  get feature () { return this._feature; }

  constructor (options) {
    const buttonElem = document.createElement('button');

    super({ ...{ element: buttonElem }, ...options });

    this._button = this._initializeButton(buttonElem, options);
    this._onClickEvent(options.onclick);
    this._feature = options.feature;
  }

  /** Call 'postProcess()' after ButtonPin has been added to the map.
   */
  postProcess () {
    const parentElem = this.button.parentElement;
    console.assert(parentElem && parentElem.classList.contains('ol-overlay-container'), 'Expecting "ol-overlay-*" class.');
    console.assert(parentElem.parentElement);
    parentElem.setAttribute('role', 'listitem');
    parentElem.parentElement.setAttribute('role', 'list');
    parentElem.parentElement.setAttribute('aria-label', 'Map markers');
  }

  _initializeButton (pinButton, options) {
    const label = options.label || options.feature.properties.name;
    const pinLabel = document.createElement('sr-only');

    pinLabel.textContent = label;
    pinButton.appendChild(pinLabel);
    pinButton.classList.add('pin-button');
    return pinButton;
  }

  _onClickEvent (onclick) {
    if (onclick) {
      console.assert(typeof onclick === 'function');
      this._button.addEventListener('click', (ev) => {
        const event = new CustomEvent(this._clickEvent, {
          detail: {
            feature: this._feature,
            origEvent: ev
          }
        });
        onclick(event);
      });
    }
  }

}

export default ButtonPin;
