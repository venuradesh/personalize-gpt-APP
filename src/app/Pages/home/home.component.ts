import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pgpt-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('sidebarContainer') sidebarContainer!: ElementRef;
  @ViewChild('chat') chat!: ElementRef;
  sideBarIn: boolean = true;

  handleSlide(): void {
    if (this.sideBarIn) {
      this.sidebar.nativeElement.style.setProperty('visibility', 'hidden');
      this.sidebarContainer.nativeElement.style.setProperty('width', '0px');
      this.sidebarContainer.nativeElement.style.setProperty(
        'margin-right',
        '0px'
      );
      this.sideBarIn = false;
    } else {
      this.sideBarIn = true;
      this.sidebarContainer.nativeElement.style.setProperty(
        'width',
        'var(--side-bar-width)'
      );
      this.sidebarContainer.nativeElement.style.setProperty(
        'margin-right',
        '2rem'
      );

      setTimeout(() => {
        this.sidebar.nativeElement.style.setProperty('visibility', 'visible');
      }, 300);
    }
  }
}
