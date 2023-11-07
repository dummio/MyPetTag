import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mypettag.app',
  appName: 'MyPetTag',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
