import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

//data
import { sampleMessages } from "../../SampleData/sampledata";

//services
import { ChatService } from "../../Services/chat.service";
import { ChatBotService } from "../../Services/chat-bot.service";

@Component({
  selector: "pgpt-home",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  @ViewChild("sidebar") sidebar!: ElementRef;
  @ViewChild("sidebarContainer") sidebarContainer!: ElementRef;
  @ViewChild("chat") chat!: ElementRef;
  @ViewChild("input") inputContainer!: ElementRef;
  @ViewChild("chat_bot_input") chat_bot_input!: ElementRef;
  sideBarIn: boolean = true;
  historyPanelOpened: boolean = false;
  messages: any = [];
  docAnalyzerMessages: any = [];
  documentAnalyzerOn: boolean = false;
  documentAnalyzerMinimized: boolean = false;
  userFirstName: any = "";
  userLastName: any = "";
  greetingInserted: boolean = false;
  loadingActivated: boolean = false;
  fileUploadedToChatBot: boolean = false;
  fileAnalyzeLoading: boolean = false;
  file: File | null = null;
  fileName: string | null = "";
  choosed_llm: string | null = "";

  constructor(private chatService: ChatService, private chatbotService: ChatBotService) {}

  ngOnInit(): void {
    if (window.innerWidth <= 950) {
      this.sideBarIn = false;
    }
    this.userFirstName = localStorage.getItem("first_name");
    this.userLastName = localStorage.getItem("last_name");
    this.choosed_llm = localStorage.getItem("choosed_llm");
    // this.docAnalyzerMessages = sampleMessages;
  }

  handleSlide(): void {
    if (this.sideBarIn) {
      this.sidebar.nativeElement.style.setProperty("visibility", "hidden");
      this.sidebarContainer.nativeElement.style.setProperty("width", "0px");
      this.sidebarContainer.nativeElement.style.setProperty("margin-right", "0px");
      this.sideBarIn = false;
    } else {
      this.sideBarIn = true;
      this.sidebarContainer.nativeElement.style.setProperty("width", "var(--side-bar-width)");
      this.sidebarContainer.nativeElement.style.setProperty("margin-right", "2rem");

      setTimeout(() => {
        this.sidebar.nativeElement.style.setProperty("visibility", "visible");
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

  generateGreeting(): void {
    if (this.greetingInserted) return;
    else {
      this.greetingInserted = true;
      const user_id = localStorage.getItem("user_id");
      this.chatService.generateGreeting(user_id).subscribe({
        next: (val) => {
          this.messages = [
            {
              role: "personalizeGPT",
              content: val.data,
            },
          ];
        },
        error: (err) => console.log(err),
      });
    }
  }

  handleEnter(event: KeyboardEvent): void {
    if (event.key === "Enter") this.onSendClick();
  }

  onSendClick(): void {
    if (this.loadingActivated) return;
    const query = this.inputContainer.nativeElement.value;
    const user_id = localStorage.getItem("user_id");

    if (query) {
      this.loadingActivated = true;
      this.inputContainer.nativeElement.value = "";
      this.messages = [
        ...this.messages,
        {
          role: "user",
          content: query,
        },
      ];

      this.chatService.generateChatResponse(user_id, query, this.messages, this.choosed_llm).subscribe({
        next: (val) => {
          this.messages = [
            ...this.messages,
            {
              role: "personalizeGPT",
              content: val.body.data,
            },
          ];
          this.loadingActivated = false;
        },
        error: (err) => {
          console.log(err);
          this.loadingActivated = false;
        },
      });
    } else {
      return;
    }
  }

  handleFileUpload(event: any): void {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    this.chatbotService.load_doc(this.file, this.fileName).subscribe({
      next: (val) => {
        this.fileUploadedToChatBot = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleChatBotInput(event: any): void {
    const query = this.chat_bot_input.nativeElement.value;
    if (!query) return;
    else {
      this.docAnalyzerMessages = [
        ...this.docAnalyzerMessages,
        {
          role: "user",
          content: query,
        },
      ];
      this.chat_bot_input.nativeElement.value = "";
      this.chatbotService.getResponseFromBot(query, this.fileName).subscribe({
        next: (val) => {
          this.docAnalyzerMessages = [
            ...this.docAnalyzerMessages,
            {
              role: "bot",
              content: val.body.data,
            },
          ];
        },
        error: (err) => console.log(err),
      });
    }
  }

  handleCloseBtn(): void {
    this.documentAnalyzerOn = false;
    this.docAnalyzerMessages = [];
    this.fileUploadedToChatBot = false;
    this.chat_bot_input.nativeElement.value = "";
    this.file = null;
    this.fileName = "";
  }
}
