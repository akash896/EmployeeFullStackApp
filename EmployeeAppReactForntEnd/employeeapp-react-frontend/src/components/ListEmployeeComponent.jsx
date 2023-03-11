import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees : []
        }
    }
    
    // componentDidMount(){
    //     EmployeeService.getEmployees().then((res) => {
    //         this.setState({employees:res.data});
    //     });
    // }
    render() {
        return (
            <div>
                <h2 className="text-center"> Employee List </h2>
                <div className="row">
                    <table width="100%" height="100%" class="center" className="table table-striped table-bordered">
                        <thread>
                            <tr>
                                <th> Employee FirstName </th>
                                <th> Employee LastName </th>
                                <th> Employee Email </th>
                                <th> Employee Actions </th>
                            </tr>
                        </thread>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee => 
                                    <tr key={employee.id}>
                                        <td> {employee.firstName} </td>
                                        <td> {employee.lastName} </td>
                                        <td> {employee.email} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>  
            </div>
        );
    }
}

export default ListEmployeeComponent;