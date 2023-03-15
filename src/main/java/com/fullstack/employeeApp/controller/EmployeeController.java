package com.fullstack.employeeApp.controller;

import com.fullstack.employeeApp.model.Employee;
import com.fullstack.employeeApp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("app/employee")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/home")
    public String home(){
        return "Welcome to EmployeeManagementApp!!";
    }
    @GetMapping("/getAll")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @PostMapping("/save")
    public String saveEmployee(@RequestBody Employee employee){
        System.out.println("called save api");
        employeeRepository.save(employee);
        return "employee saved successfully";
    }

    @GetMapping(value = "/get/{id}")
    public Employee getEmployee(@PathVariable("id") long id) {
        System.out.println("called getEmployee api");
        Employee e = employeeRepository.findById(id).orElse(new Employee());
        System.out.println(e.toString());
        return e;
    }

    @PutMapping("/update")
    public String updateEmployee(@RequestBody Employee employee){
        System.out.println("called update api");
        if(employeeRepository.existsById(employee.getId())){
            Employee employeeFromDB = employeeRepository.findById(employee.getId()).orElse(new Employee());
            employeeFromDB.setEmail(employee.getEmail());
            employeeFromDB.setFirstName(employee.getFirstName());
            employeeFromDB.setLastName(employee.getLastName());
            employeeRepository.save(employeeFromDB);
            return "employee updated successfully";
        }
        else{
            return "no employee with given Id";
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public String deleteEmployee(@PathVariable("id") long id) {
        System.out.println("called delete api");
        if(employeeRepository.existsById(id)){
            employeeRepository.deleteById(id);
            return "Employee deleted successfully !!";
        }
        else{
            return "Employee does not exist";
        }
    }


} // class ends
