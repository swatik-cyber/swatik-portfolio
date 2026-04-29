import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
    <div class="scroll-progress" [style.width.%]="scrollPct"></div>
    <div class="cursor-dot" [style.left.px]="cx" [style.top.px]="cy"></div>
    <div class="cursor-ring" [style.left.px]="cx" [style.top.px]="cy" [class.clicking]="clicking"></div>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .scroll-progress {
      position:fixed; top:0; left:0; height:2px; z-index:1000;
      background:linear-gradient(90deg,#00f5d4,#7c3aed,#ec4899);
      transition:width .08s;
      box-shadow: 0 0 8px rgba(0,245,212,.5);
    }
    .cursor-dot {
      position:fixed; width:6px; height:6px; background:#00f5d4;
      border-radius:50%; pointer-events:none; z-index:9999;
      transform:translate(-50%,-50%);
      box-shadow:0 0 8px rgba(0,245,212,.8);
      transition:transform .05s;
    }
    .cursor-ring {
      position:fixed; width:28px; height:28px;
      border:1px solid rgba(0,245,212,.4);
      border-radius:50%; pointer-events:none; z-index:9998;
      transform:translate(-50%,-50%);
      transition:left .12s ease, top .12s ease, transform .1s, border-color .2s;
    }
    .cursor-ring.clicking {
      transform:translate(-50%,-50%) scale(.7);
      border-color:rgba(0,245,212,.8);
    }
  `]
})
export class AppComponent implements OnInit {
  scrollPct = 0;
  cx = -100; cy = -100;
  clicking = false;

  ngOnInit() {
    window.addEventListener('mousemove', (e) => { this.cx = e.clientX; this.cy = e.clientY; });
    window.addEventListener('mousedown', () => this.clicking = true);
    window.addEventListener('mouseup', () => this.clicking = false);
  }

  @HostListener('window:scroll')
  onScroll() {
    const el = document.documentElement;
    this.scrollPct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
  }
}
