import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'business-app',
  webDir: '../../dist/apps/business-app/browser',
  server: {
    androidScheme: 'https',
  },
};

export default config;
