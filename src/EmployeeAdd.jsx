import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'

export default class EmployeeAdd extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        const form = document.forms.employeeAdd
        const employee = {
            name: form.name.value,
            extension: form.ext.value,
            email: form.email.value,
            title: form.title.value,
        }
        this.props.createEmployee(employee)
        form.name.value = ""
        form.ext.value = ""
        form.email.value = ""
        form.title.value = ""
    }
    render() {
        return (
            <Container fluid>
                <form name="employeeAdd" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md={3}>Name:</Col>
                        <Col md="auto"><input type="text" name="name" /></Col>
                    </Row>
                    <Row>
                        <Col md={3}>Extension:</Col>
                        <Col md="auto"><input type="text" name="ext" maxLength={4} /></Col>
                    </Row>
                    <Row>
                        <Col md={3}>Email:</Col>
                        <Col md="auto"><input type="text" name="email" /></Col>
                    </Row>
                    <Row>
                        <Col md={3}>Title:</Col>
                        <Col md="auto"><input type="text" name="title" /></Col>
                        <Button type="submit" variant="primary" size="sm" className="mt-4">Add Employee</Button>
                    </Row>
                </form>
            </Container>
        )
    }
}