import { Injectable, computed, effect, signal } from '@angular/core';

export interface AppTheme {
  name: 'light' | 'dark' | 'system';
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private appTheme = signal<'light' | 'dark' | 'system'>('system');

  private readonly themes = signal<AppTheme[]>([
    { name: 'light', icon: 'light_mode' },
    { name: 'dark', icon: 'dark_mode' },
    { name: 'system', icon: 'desktop_windows' },
  ]);

  selectedTheme = computed(() =>
    this.themes().find((t) => t.name === this.appTheme()) || this.themes()[0]
  );

  getThemes() {
    return this.themes();
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    if (!['light', 'dark', 'system'].includes(theme)) {
      console.warn(`Invalid theme: ${theme}`);
      return;
    }
    this.appTheme.set(theme);
  }

  constructor() {
    this.initializeThemeEffect();
  }

  private initializeThemeEffect() {
    effect(() => {
      const appTheme = this.appTheme();
      const colorScheme = appTheme === 'system' ? 'light dark' : appTheme;
      document.body.style.setProperty('color-scheme', colorScheme);
    });
  }
}
