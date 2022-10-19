import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Family, FamilyMember } from '../../data';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private _url = 'https://localhost:7287/'; // URL to web api
  public families: Record<string, Family> = {};
  constructor(private http: HttpClient) {}

  public getFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>(this._url + 'api/Families');
  }

  public getFamily(lastName: string): Observable<Family> {
    return this.http.get<Family>(this._url + 'api/Families/' + lastName);
  }

  public deleteFamily(lastName: string): Observable<Family> {
    return this.http.delete<Family>(this._url + 'api/Families/' + lastName);
  }

  public addFamily(membersString: string): Observable<Family[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<Family[]>(
      this._url + 'api/Families/FamilyMembers',
      `"${membersString}"`,
      {
        headers: headers,
      }
    );
  }

  public updateFamilyMember(member: FamilyMember): Observable<FamilyMember> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<FamilyMember>(
      this._url + 'api/FamilyMembers/',
      member,
      {
        headers: headers,
      }
    );
  }

  public deleteFamilyMember(member: FamilyMember): Observable<FamilyMember> {
    return this.http.delete<FamilyMember>(
      this._url + 'api/FamilyMembers/' + member.id
    );
  }

  public getFamilyMember(id: number): Observable<FamilyMember> {
    return this.http.get<FamilyMember>(this._url + 'api/FamilyMembers/' + id);
  }

  public errorSubject = new Subject<string>();
}
