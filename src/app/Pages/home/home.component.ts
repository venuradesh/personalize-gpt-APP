import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//data
import { sampleMessages } from '../../SampleData/sampledata';

@Component({
  selector: 'pgpt-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('sidebarContainer') sidebarContainer!: ElementRef;
  @ViewChild('chat') chat!: ElementRef;
  sideBarIn: boolean = true;
  historyPanelOpened: boolean = false;
  messages: any = [];
  documentAnalyzerOn: boolean = false;
  documentAnalyzerMinimized: boolean = false;
  fileInputted: boolean = false;

  ngOnInit(): void {
    if (window.innerWidth <= 950) {
      this.sideBarIn = false;
    }
    // this.messages = sampleMessages;
  }

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

  handleHistoryPanelClick(): void {
    this.historyPanelOpened = true;
    const windowWidth = window.innerWidth;
    if (windowWidth <= 950 && this.sideBarIn) {
      this.sideBarIn = true;
      this.handleSlide();
    }
  }

  handleHistoryCloseClick(): void {
    this.historyPanelOpened = false;
    const windowWidth = window.innerWidth;
    if (windowWidth <= 950 && this.sideBarIn) {
      this.handleSlide();
    }
  }

  handleDocumenntAnalyzerClicked(): void {
    this.documentAnalyzerOn = true;
  }

  handleDocumenntAnalyzerClosed(): void {
    this.documentAnalyzerOn = false;
  }

  handleDocumenntAnalyzerMinimized(): void {
    this.documentAnalyzerMinimized = true;
  }

  onDocumentAnalyzerClick(): void {
    this.documentAnalyzerOn = true;
    if (window.innerWidth <= 950) {
      this.sideBarIn = false;
    }
  }
}
