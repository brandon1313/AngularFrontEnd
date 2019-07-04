import { Injectable, ErrorHandler } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { TokenStorageService } from '../auth/token-storage.service';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'})
};

@Injectable({
  providedIn: 'root'
})

export class RegularizacionService {

 constructor(private http: HttpClient,private tokenStorageService:TokenStorageService) { }
 serviceURL = 'http://172.16.4.33:8080/Support/api/regularizacion/RegularizacionTAT/';
 


postFileUp(fileToUpload: File, fileName: string): Observable<any> {
  const idtoken = this.tokenStorageService.getToken();
  const httpOptions = {
    headers: new HttpHeaders({ 'enctype': 'multipart/form-data',
  'Authorization': idtoken})
  };
  const formData: FormData = new FormData();
formData.append('file', fileToUpload, fileToUpload.name);
formData.append('ticket', fileName);
  
  httpOptions.headers.append("Authorization", "Bearer " +idtoken );
  console.log(httpOptions.headers)
  console.log(idtoken)
  console.log(fileName)
  return this.http.post(this.serviceURL, formData,
    { headers:httpOptions.headers});
}
downloadFileSystem(filename: string): Observable<HttpResponse<string>> {
  let headers = new HttpHeaders();
  headers = headers.append('Accept', 'text/csv; charset=utf-8');
  const idtoken = this.tokenStorageService.getToken();
  headers.append("Authorization", "Bearer " +idtoken );
  return this.http.get(this.serviceURL+filename, {
    headers: headers,
    observe: 'response',
    responseType: 'text'
  });
}


}
