import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'dnd-tools',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
