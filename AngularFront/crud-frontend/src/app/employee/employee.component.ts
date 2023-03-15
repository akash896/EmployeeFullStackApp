import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  EmployeeArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
 
  
  firstName: string ="";
  lastName: string ="";
  email: string = "";
 
  currentEmployeeID = "";

  constructor(private http: HttpClient )
  {
    this.getAllEmployee();
 
  }


  ngOnInit(): void {
  }
 
  getAllEmployee()
  {
    
    this.http.get("http://localhost:8080/app/employee/getAll")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.EmployeeArray = resultData;
    });
  }
 
  register()
  {
  
    let bodyData = {
      "employeeID" : this.currentEmployeeID,
      "firstName" : this.firstName,
      "lastName" : this.lastName,
      "email" : this.email
    };
 
    this.http.post("http://localhost:8080/app/employee/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully")
        this.getAllEmployee();
        this.firstName = '';
        this.lastName = '';
        this.email  = '';
    });
  }
 
  setUpdate(data: any)
  {
   this.firstName = data.firstName;
   this.lastName = data.lastName;
   this.email = data.email;
   this.currentEmployeeID = data.id;
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "firstName" : this.firstName,
      "lastName" : this.lastName,
      "email" : this.email,
    };
    
    this.http.put("http://localhost:8080/app/employee/update",bodyData,{responseType:'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Updated")
        this.getAllEmployee();
        this.firstName = '';
        this.lastName = '';
        this.email  = '';
    });
  }
 
 
 
  save()
  {
    if(this.currentEmployeeID == '')
    {
        this.register();
    }
      else
      {
        this.UpdateRecords();
      }      
 
  }
 
 
  setDelete(data: any)
  {
        
    
    this.http.delete("http://localhost:8080/app/employee/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Deleted !!")
        this.getAllEmployee();
        this.firstName = '';
        this.lastName = '';
        this.email  = ''; 
  
    });
 
  }

}
