import { configuration } from '@/app-config';
import { App } from './server';
  
const app = new App(configuration);
app.initServerConnection();

