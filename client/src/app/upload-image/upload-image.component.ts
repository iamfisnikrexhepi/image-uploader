import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit, OnDestroy {
  apiUrl: string = environment.apiUrl;

  uploadTitle = 'Upload your image';
  isImageUploadedSuccessfully: boolean;
  uploadingImage: boolean;
  urlImage = '';
  textMessage = '';
  msgHideAndShow: boolean;
  imageFile: File;
  formData = new FormData();

  uploadFileResponse$: Subscription;

  constructor(private httpService: HttpService) {

  }

  ngOnInit(): void {
  }


  onImageUpload(event) {
    this.imageFile = event[0];
    this.formData.append("Image", this.imageFile);
    this.uploadingImage = true;

    this.uploadFileResponse$ = this.httpService.post('/uploadFile', this.formData)
      .subscribe(response => {
        console.log(response.uploadedFile);
        if (response.statusCode === 200)
          this.isImageUploadedSuccessfully = true;
        this.uploadTitle = 'Uploaded Succesful !';
        this.urlImage = `${this.apiUrl}/${response.uploadedFile}`
        this.startUploadingTimer();
      }, error => {
        console.error(error);
      });
  }


  showCopiedClipboardMessage() {
    this.textMessage = "Url Copied to Clipboard";
    this.msgHideAndShow = true;
    setTimeout(() => {
      this.textMessage = "";
      this.msgHideAndShow = false;
    }, 1000);
  }

  copyUrl(urlToCopy) {
    urlToCopy.select();
    document.execCommand('copy');
    urlToCopy.setSelectionRange(0, 0);
    this.showCopiedClipboardMessage();
  }

  startUploadingTimer() {
    setTimeout(() => {
      this.uploadingImage = false;
    }, 1500);
  }

  ngOnDestroy(): void {
    if(this.uploadFileResponse$ !== undefined){
      this.uploadFileResponse$.unsubscribe();
    }
  }
}
