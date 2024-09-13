import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Fixed from styleUrl to styleUrls
})
export class AppComponent implements OnInit{

//  onEdit(_t8: Student) {
//throw new Error('Method not implemented.');
//}
  //title = 'CRUD-with-local-storage';
  @ViewChild('myModal') modal : ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];
  
   ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if(localData != null){
      this.studentList = JSON.parse(localData);
    }
   }
  openModel(){
    
    const model = document.getElementById("myModal");
    if(model != null){
      model.style.display = 'block';
    }
  }

  closeModel(){
    this.studentObj = new Student();
    if(this.modal != null) { 
      this.modal.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Student) {
  const isDelet = confirm("are you sure want to delete");
  if(isDelet) {
    const currentRecord = this.studentList.findIndex(m => m.id == this.studentObj.id);
    this.studentList.splice(currentRecord,1)
    localStorage.setItem('angular17crud',JSON.stringify(this.studentList));
  }
  }

  onEdit(item: Student) {
    this.studentObj = item;
    this.openModel();
  }
  updateStud(){
    const currentRecord = this.studentList.find(m => m.id == this.studentObj.id);
    if(currentRecord != null) {
      currentRecord.name = this.studentObj.name;
      currentRecord.MobileNo = this.studentObj.MobileNo;
      currentRecord.Email = this.studentObj.Email;
      currentRecord.City = this.studentObj.City;
      currentRecord.State = this.studentObj.State;
      currentRecord.Address = this.studentObj.Address;
      currentRecord.pincode = this.studentObj.pincode;
      localStorage.setItem('angular17crud',JSON.stringify(this.studentList));
      this.closeModel();
    }
  }

saveStudent(){
  
  const isLocalpresent = localStorage.getItem("angular17crud");
  if(isLocalpresent !=null) {
    const oldArray = JSON.parse(isLocalpresent);
    this.studentObj.id = this.studentList.length + 1;
    oldArray.push(this. studentObj);
    this.studentList = oldArray;
    localStorage.setItem('angular17crud',JSON.stringify(oldArray));
  }else{
    const newArr = [];
    newArr.push(this. studentObj);
    this.studentObj.id = 1;
    this.studentList = newArr;
    localStorage.setItem('angular17crud',JSON.stringify(newArr));
  }
  this.closeModel();
}

}

export class Student{
id: number;
name: string; 
MobileNo: string;
Email: string;
City: string;
State: string;
Address: string;
pincode: string;

constructor() {
  this.id = 0 ;
  this.name= '';
  this.MobileNo= '';
  this.Email= '';
  this.City= '';
  this.State= '';
  this.Address= '';
  this.pincode= '';
}

}
