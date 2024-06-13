const express = require('express');
const app = express();
const cors = require('cors');
const port = 1300;
const multer = require('multer'); // Import multer for handling file uploads
const path = require('path');
const deptModel = require('./models/Dept');
const mongoose = require('mongoose');
const headModel = require('./models/head');
const empModel = require('./models/emp');
const loginModel = require('./models/login');

app.use(express.static('public'));

app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/HM')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

////login

// POST endpoint to handle login
app.post('/post', async (req, res) => {
  const { emailid, password } = req.body;

  try {
      // Create a new user in the database
      const user = await loginModel.create({ emailid, password });

      // Send a success response with the created user
      res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// DEPARTMENT
// Route to add a new DEPARTMENT
app.post('/adddepartment', upload.single('file'), async (req, res) => {
  try {
    const { departmentname, year, description } = req.body;
    const image = req.file.filename;
    const newDept = await deptModel.create({ departmentname, year, description, image });
    res.status(201).json({ message: "Department added successfully", department: newDept });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add department" });
  }
});

// Route to get all departments
app.get('/getdepartment', async (req, res) => {
  try {
    const getdept = await deptModel.find();
    res.status(200).json(getdept);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
});
//DELETE endpoint to delete a EMPLOYEE by ID
app.delete('/deletedept/:id', async (req, res) => {
  try {
    const { id } = req.params;

    
    const dept = await deptModel.findById(id);
    console.log('Employee:', dept);
    if (!dept) {
      return res.status(404).json({ error: 'Data not found' });
    }
    await deptModel.findByIdAndDelete(id);

    res.json({ message: 'Data deleted successfully' });
    console.log('Response:', res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/departmentsbyid/:id', async (req, res) => {
  try {
    const dept = await deptModel.findById(req.params.id);
    if (!dept) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json(dept);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





app.put('/updatedept/:id', upload.single('image'), async (req, res) => {
  try {
    // If there's a file uploaded, update it
    const imageData = req.file ? { image: req.file.filename } : {};

    // Update department details along with any image changes
    const updatedDept = await deptModel.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, ...imageData } }, // Merge body data and image data
      { new: true }
    );

    res.json(updatedDept);
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Error updating department' });
  }
});



// HEAD
// POST method to add DEPARTMENT HEAD
app.post('/add', upload.single('file'), async (req, res) => {
  try {
    const { name, employeenumber, age, profiledescription, department } = req.body;
    const image = req.file.filename;
    const newDepthead = await headModel.create({ name, employeenumber, age, image, profiledescription, department });

    res.status(201).json({ message: "Departmenthead added successfully", departmenthead: newDepthead });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add department" });
  }
});
// GET endpoint to fetch all DEPARTMENT HEAD
app.get('/all', async (req, res) => {
  try {
    const allHead = await headModel.find({});
    res.status(200).json(allHead);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
});
//DELETE endpoint to delete a DEPARTMENT HEAD by ID
app.delete('/deletehead/:id', async (req, res) => {
  try {
    const { id } = req.params;

    
    const head = await headModel.findById(id);
    console.log('Department head:', head);
    if (!head) {
      return res.status(404).json({ error: 'Data not found' });
    }
   
    await headModel.findByIdAndDelete(id);

    res.json({ message: 'Data deleted successfully' });
    console.log('Response:', res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/headbyid/:id', async (req, res) => {
  try {
    const depthead = await headModel.findById(req.params.id);
    if (!depthead) {
      return res.status(404).json({ error: "Department head not found" });
    }
    res.json(depthead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/updatehead/:id', upload.single('image'), async (req, res) => {
  try {
    const imageData = req.file ? { image: req.file.filename } : {};

    // Update department details along with any image changes
    const updatedHead = await headModel.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, ...imageData } }, // Merge body data and image data
      { new: true }
    );

    res.json(updatedHead);
  } catch (error) {
    console.error('Error updating department head:', error);
    res.status(500).json({ error: 'Error updating department head' });
  }
});



// EMPLOYEE
// POST endpoint to add a new EMPLOYEE
app.post('/addemp', upload.single('file'), async (req, res) => {
  try {
    const { name, employeenumber, age, profiledescription, department, reportto } = req.body;
    const image = req.file.filename;
    const newEmp = await empModel.create({ name, employeenumber, age, image, profiledescription, department, reportto });

    res.status(201).json({ message: "Employee added successfully", employee: newEmp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add employee' });
  }
});

// GET endpoint to fetch all EMPLOYEE
app.get('/allemp', async (req, res) => {
  try {
    const Emp = await empModel.find({});
    res.status(200).json(Emp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch employees" }); // Changed from "Failed to fetch departments" to "Failed to fetch employees"
  }
});
//DELETE endpoint to delete a EMPLOYEE by ID
app.delete('/deleteemp/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await empModel.findById(id);
    console.log('Employee:', employee);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    await empModel.findByIdAndDelete(id);

    res.json({ message: 'Employee deleted successfully' });
    console.log('Response:', res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get for single id
app.get('/empbyid/:id', async (req, res) => {
  try {
    const emp = await empModel.findById(req.params.id);
    if (!emp) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(emp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/updateemp/:id', upload.single('image'), async (req, res) => {
  try {
    const imageData = req.file ? { image: req.file.filename } : {};

    // Update department details along with any image changes
    const updatedEmp = await empModel.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, ...imageData } }, // Merge body data and image data
      { new: true }
    );

    res.json(updatedEmp);
  } catch (error) {
    console.error('Error updating Employee:', error);
    res.status(500).json({ error: 'Error updating Employee' });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
