import { Error } from 'mongoose'
import Employee from '../models/Employee.js'

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({})
        res.status(200).json({ employees, count: employees.length })
        // res.status(200).json({ employees })
        // res.send('Get all employees')
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const getEmployee = async (req, res) => {
    try {
        let {id:employeeId} = req.params // id is too generic so we had to create this alias
        const employee = await Employee.findOne({ _id: employeeId })
        if (!employee) { // if employee is null
            return res.status(404).json({ msg: `No employee with ID ${employeeId} found`})
        }
        res.status(200).json({ msg: employee })
        // res.send('Get a single employee')
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(201).json({ employee })
        // res.status(201).json({ msg: 'Employee added successfully' })
        // res.send('Create a new employee')
    } catch (err) {
        res.status(500).json({ msg: err  })
    }
}

const updateEmployee = async (req, res) => {
    try {
        let {id:employeeId} = req.params
        const employee = await Employee.findOneAndUpdate({ _id: employeeId }, req.body, {
            new: true, // update documnent in db and return it to this application
            runValidators: true
        })
        if (!employee) {
            return res.status(404).json({ msg: `No employee with ${employeeId} found` })
        }
        // res.send('Update an existing employee')
        res.status(200).json({ msg: 'Successfully updated employee'})
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        let {id:employeeId} = req.params // id is too generic so we had to create this alias
        const employee = await Employee.findOneAndDelete({ _id: employeeId })
        if (!employee) { // if employee is null
            return res.status(404).json({ msg: `No employee with ID ${employeeId} found`})
        }
        res.status(200).json({ msg: 'Employee successfully deleted' })
        // res.send('Delete an employee')
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

// have to list them out because they are all separate functions
export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}