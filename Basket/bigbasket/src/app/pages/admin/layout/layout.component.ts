import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../services/themeservice.service';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatSlideToggleModule, FormsModule, CommonModule,MatIconModule,MatMenuModule,BrowserAnimationsModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'] // Fixed "styleUrl" typo to "styleUrls"
})
export class LayoutComponent {
  profileImageUrl: string = '';
  selectedFile: File | null = null;
   themeService = inject(ThemeService);

  //isDarkMode: boolean = false;



  constructor(private http: HttpClient) {}

  /*toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark-theme' : 'light-theme';
    document.body.className = theme;
  }*/

  /**
   * Handle file input change event for uploading profile image.
   * @param event - File input change event.
   */
  onFileChange(event: Event) {
    const inputFile = event.target as HTMLInputElement;

    if (inputFile.files && inputFile.files.length > 0) {
      this.selectedFile = inputFile.files[0];

      const formData = new FormData();
      formData.append('profilePicture', this.selectedFile);

      // Send the file to the server
      this.http.post('http://localhost:8074/api/upload-profile', formData).subscribe({
        next: (response: any) => {
          // Update profile image URL from the server's response
          this.profileImageUrl = response.profileImageUrl || this.profileImageUrl;
          console.log('Profile image updated:', this.profileImageUrl);
        },
        error: (err) => {
          console.error('Error uploading file:', err);
        },
      });
    } else {
      console.log('No file selected');
    }
  }

  /**
   * Apply dark mode changes dynamically.
   */
  
}
