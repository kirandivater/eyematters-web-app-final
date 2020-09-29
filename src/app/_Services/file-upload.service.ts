import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from '../_Models/file-upload';
import { environment } from 'src/environments/environment';
import { Methods } from '../_Models/methods';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  UploadFile(fileUploadModel: FileUpload) {
    return this.http.post(environment.GlobalApi + Methods.Upload, fileUploadModel);
  }
}
