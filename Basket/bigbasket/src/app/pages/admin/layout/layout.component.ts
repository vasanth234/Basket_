import { HttpClient } from '@angular/common/http';
import { Component, effect, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatSlideToggleModule, FormsModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'] // Fixed "styleUrl" typo to "styleUrls"
})
export class LayoutComponent {
  profileImageUrl: string = '';
  selectedFile: File | null = null;

  darkMode = signal(false); // Signal for dark mode state

  constructor(private http: HttpClient) {}

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
  applyDarkMode = effect(() => {
    const darkModeEnabled = this.darkMode(); // Get the current dark mode state
    if (darkModeEnabled) {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }
  });
}
