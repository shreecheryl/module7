import React from 'react'
import { Badge, Button, Table, Card, Modal } from 'react-bootstrap'
import { useLocation, Link} from 'react-router-dom'
import EmployeeFilter from './EmployeeFilter.jsx'
import EmployeeAdd from './EmployeeAdd.jsx'

class EmployeeRow extends React.Component {
    constructor() {
        super()
        this.state = {
            modalVisible: false,
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState({ modalVisible: !this.state.modalVisible, })
    }

    onDeleteClick() {
        this.toggleModal()
        // this.props.deleteEmployee(this.props.employee._id)
    }

    render() {
        return (
            <>
                <tr>
                    <td><Link to={`/edit/${this.props.employee._id}`}>{this.props.employee.name}</Link></td>
                    <td>{this.props.employee.extension}</td>
                    <td>{this.props.employee.email}</td>
                    <td>{this.props.employee.title}</td>
                    <td>{this.props.employee.dateHired.toDateString()}</td>
                    <td>{this.props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
                    <td>
                    <Modal show={this.state.modalVisible} centered>
                        <Modal.Header>
                            <Modal.Title>Delete Employee?</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Are you sure you want to delete this employee?
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                type="button"
                                variant="danger"
                                size="sm"
                                className="mt-4"
                                onClick={this.toggleModal}>
                                    Cancel
                            </Button>
                            <Button
                                type="button"
                                variant="success"
                                size="sm"
                                className="mt-4"
                                onClick={() => {
                                    this.toggleModal;
                                    this.props.deleteEmployee(this.props.employee._id)
                                }}>
                                    Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Button variant="danger" size="sm" onClick={this.toggleModal}>X</Button>
                    </td>
                </tr>
                    
            </>
        )
    }
}

function EmployeeTable(props) {
    // GET THE URL
    const { search } = useLocation()
    // GET PARAMETERS FROM URL
    const query = new URLSearchParams(search)
    // GET THE 'EMPLOYED' PARAMETER SPECIFICALLY
    const q = query.get('employed')

    const employeeRows = props.employees
        .filter(employee => (q ? String(employee.currentlyEmployed) === q : true))
        .map(employee =>
        <EmployeeRow
            key={employee._id}
            employee={employee}
            deleteEmployee={props.deleteEmployee} />)
    return (
        <Card>
            <Card.Header as="h5">All Employees <Badge bg="secondary">{ employeeRows.length }</Badge></Card.Header>
            <Card.Body>
                <Card.Text>
                    <Table striped size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Extension</th>
                                <th>Email</th>
                                <th>Title</th>
                                <th>Date Hired</th>
                                <th>Currently Employed</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeRows}
                        </tbody>
                    </Table>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = { employees: [] }
        this.createEmployee = this.createEmployee.bind(this)
        this.deleteEmployee = this.deleteEmployee.bind(this)
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            data.employees.forEach(employee => {
                employee.dateHired = new Date(employee.dateHired)
            })
            this.setState({ employees: data.employees })
        })
        .catch(err => {console.log(err)})
    }
    createEmployee(employee) {
        fetch('/api/employees', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(employee)
        })
        .then(response => response.json())
        .then(newEmployee => {
            newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired)
            const newEmployees = this.state.employees.concat(newEmployee.employee)
            this.setState({ employees: newEmployees })
            console.log('Total count of employees:', newEmployees.length)
        })
        .catch(err => {console.log(err)})
    }
    deleteEmployee(id) {
        fetch(`/api/employees/${id}`, { method: 'DELETE'})
        .then(response => {
            if (!response.ok) {
                console.log('Failed to delete employee.')
            } else {
                this.loadData()
            }
        })

    }
    render() {
        return (
            <React.Fragment>
                <EmployeeAdd createEmployee={this.createEmployee} />
                <EmployeeFilter />
                <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
            </React.Fragment>
        )
    }
}