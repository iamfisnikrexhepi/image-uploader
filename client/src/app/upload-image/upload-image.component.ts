import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  isImageUploaded: boolean;
  fileUploadForm: FormGroup;

  constructor(
    private _http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  files: File[] = [];

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      ImageToUpload: ['']
    });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("Image", this.files[i]);
      formData.append('agentId', '007');
    }

    this._http.post<any>('http://localhost:3000/uploadfile', formData)
      .subscribe(response => {
        if (response.statusCode === 200)
          this.isImageUploaded = true;
        alert('Uploaded Successfully.');
      }, error => {
        console.error(error);
      });
  }
}
