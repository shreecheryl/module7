import mongoose from "mongoose"

const EmployeesSchema = new mongoose.Schema({
    name: { type: String, required: [ true, 'Name required' ] },
    extension: { type: Number, required: [ true, 'Extension required' ]  },
    email: { type: String, required: [ true, 'Name required' ]  },
    title: { type: String, required: [ true, 'Name required' ]  },
    dateHired: { type: Date, default: Date.now },
    currentlyEmployed: { type: Boolean, default: true }
})

// export default EmployeesSchema

export default mongoose.model('Employee', EmployeesSchema)