import {
  Component
} from '@angular/core';

@Component({
  selector: 'sky-flyout-demo-internal',
  template: `
    <div
      class="sky-padding-even-large"
    >
      <h2>Basic flyout example</h2>
      <p>A flyout can contain:</p>
        <ul>
          <li>lists</li>
          <li>record views</li>
          <li>graphs</li>
          <li>other information displays</li>
        </ul>
    </div>
  `
})
export class SkyFlyoutDemoInternalSimpleComponent {
}
