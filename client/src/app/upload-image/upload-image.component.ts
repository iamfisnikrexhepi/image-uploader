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

 // Event which is called when user drag and drop or choose file via button.
  onImageUpload(event) {
    this.imageFile = event[0];
    this.formData.append("Image", this.imageFile);
    this.uploadingImage = true;

    // Subsribe the service post method to get the response from the api.
    this.uploadFileResponse$ = this.httpService.post('/api/upload-image', this.formData)
      .subscribe(response => {
        // console.log(response.uploadedFile);
        if (response.statusCode === 200)
          this.isImageUploadedSuccessfully = true;
        this.uploadTitle = 'Uploaded Succesful !';
        // combining paramethers to generate the url of image
        this.urlImage = `${this.apiUrl}/api/upload-image/images/${response.uploadedFile}`
        this.startUploadingTimer();
      }, error => {
        console.error(error);
      });
  }


  // shows message that link is copied and hide the message after 1 second.
  showCopiedClipboardMessage() {
    this.textMessage = "Url Copied to Clipboard";
    this.msgHideAndShow = true;
    setTimeout(() => {
      this.textMessage = "";
      this.msgHideAndShow = false;
    }, 1000);
  }

  // copy url link to clipboard
  copyUrl(urlToCopy) {
    urlToCopy.select();
    document.execCommand('copy');
    urlToCopy.setSelectionRange(0, 0);
    this.showCopiedClipboardMessage();
  }

  // simple timer to show uploading progress bar for 1.5second.
  startUploadingTimer() {
    setTimeout(() => {
      this.uploadingImage = false;
    }, 1500);
  }

  ngOnDestroy(): void {
    if(this.uploadFileResponse$ != undefined){
      this.uploadFileResponse$.unsubscribe();
    }
  }

}
