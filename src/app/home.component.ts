import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  SkyDemoService
} from '../demo';

@Component({
  selector: 'sky-demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class SkyDemoHomeComponent implements OnInit {
  public components: any;
  public selectedComponent: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demoService: SkyDemoService
  ) {
    this.components = this.demoService.components;
  }

  public ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedComponent = this.demoService.getComponent(params['component']);
    });
  }

  public open(component: any) {
    this.router.navigate([], {
      queryParams: {
        'component': component.component.name
      }
    });
  }
}
