import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { IonicStorageModule } from '@ionic/storage'
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MyApp } from './app.component'
import { HomePageModule } from '../pages/home/home.module'
import { TasksProvider } from '../providers/tasks/tasks';
import { TestProvider } from '../providers/test/test';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HomePageModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TasksProvider,
    TestProvider,
    HttpClient
  ]
})
export class AppModule {}
