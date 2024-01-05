import { Injectable } from '@angular/core';
import { Subject, Subscription, finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChooseFileComponent } from '../shared/choose-file/choose-file.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  private globals: { [key: string]: any } = {
    ongoing_request_count: 0,
    loading_animation_control: new Subject<any>(),
    banner_control: new Subject<any>()
  };

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private overlay: Overlay
  ) { }

  service_URLs: { [key: string]: string } = {
    'login': 'loginservice',
    'file_upload': 'file_upload',
  };

  settings = {
    API_full_hostname: document.location.origin + '/assets/JSONs/'
  };

  getAPI(key: string) {
    let complete_URL = this.settings.API_full_hostname + this.service_URLs[key];
    return complete_URL;
  }

  serviceWrapper(HTTP_method: string, API_URL: string, responseProcessing: any, request_data?: any, skip_loading_animation?: string): Subject<any> {
    let response_subject = new Subject<any>();
    if (!!!skip_loading_animation) {
      this.globals['ongoing_request_count']++;
      this.globals['loading_animation_control'].next(true);
    }
    if (!environment.production || environment.dummy_JSONs) {
      HTTP_method = 'GET';
      API_URL += '.json';
    }
    this.http.request(HTTP_method, API_URL, request_data).pipe(finalize(() => {
      if (!!!skip_loading_animation) {
        if (this.globals['ongoing_request_count'] > 0) {
          this.globals['ongoing_request_count']--;
        }
        this.globals['loading_animation_control'].next(false);
      }
    })).subscribe((response: any) => {
      if (!!response['errorCode']) {
        response_subject.error(response);
      } else {
        let processed_response = responseProcessing(response);
        if (!!processed_response.error) {
          response_subject.error(processed_response.error);
        } else {
          response_subject.next(processed_response.data);
        }
      }
    });
    return response_subject;
  }

  displayAlertDialog(options?: any) {
    let global_options = {
      autoFocus: false,
      panelClass: 'cyberTool-dialog-container',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    };
    let dialog_config = { ...global_options, ...options };
    let dialog_ref = this.dialog.open(
      ChooseFileComponent,
      dialog_config
    );
    return dialog_ref;
  }

  uploadFile(form_data: any, API: string) {
    return this.serviceWrapper('POST', API, (response: any) => {
      return { 'data': { 'message': response.uploadStatus } };
    },
      {
        body: form_data
      });
  }

  showSnackbar(message?: string) {
    setTimeout(() => {
      let snackar_ref = this.snackbar.open(
        message || this.error_messages.service_failure,
        'OK',
        { panelClass: 'cyberTool-snackbar' });
      this.setGlobalData('global_snackbar', snackar_ref);
    }, 1200);
  }

  hideSnackbar(){
    this.getGlobalData('global_snackbar')?.dismiss();
  }

  setGlobalData(key: string, value: any) {
    this.globals[key] = value;
  }

  getGlobalData(key: string) {
    return this.globals[key];
  }

  error_messages = {
    service_failure: "We're sorry, this site is experiencing some technical issues. Please refresh the page or try again.",
  };

  unsubscribeAll(subs: Subscription[]) {
    let sub_count = subs.length;
    for (let i = 0; i < sub_count; i++) {
      let current_sub = subs[i];
      if (!!current_sub) {
        current_sub.unsubscribe();
      }
    }
  }
}
