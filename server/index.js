const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const StudentModel = require('./models/Student');
const AdminModel = require('./models/Admin');
const InstructorModel = require('./models/Instructor');
require("dotenv").config();
const axios = require('axios');
const addcourseRouter = require('./Components/AddCourse');
const addeventRouter = require('./Components/AddEvent');
const addinstructorRouter = require('./Components/AddInstructor');
const addstudentRouter = require('./Components/AddStudents');
// const StudentData = require('./Components/StudentData');
// const InstructorData = require('./Components/InstructorData');




const app = express()
app.use(express.json())
app.use(cors())
app.use('/courses', addcourseRouter);

app.use('/events', addeventRouter);

app.use('/instructors', addinstructorRouter);
app.use('/students', addstudentRouter);







mongoose.connect("mongodb://127.0.0.1:27017/lms");

// mongoose.connect("mongodb://localhost:27017/lms");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

app.post("/login", async (req, res) => {
    const { email, password, userType } = req.body;
  
    try {
      let user;
      switch (userType) {
        case "student":
          user = await StudentModel.findOne({ email });
          console.log('Found user:', user);
          if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log('Password match:', passwordMatch);

          if (passwordMatch) {
            const accessToken = generateAccessToken({email: user.email, userType: 'student', studentId: user._id});
            return res.json({ accessToken, userType: 'student', studentName: user.studentName, studentId: user._id, studentEmail:user.email });
          } else {
              return res.status(401).json("Incorrect password");
          }
          } else {
              return res.status(404).json("User not found");
          }
        break;
        case "instructor":
          user = await InstructorModel.findOne({ email });
          console.log('Found user:', user);
          if (user) {
            if (user.password === password) {
              const accessToken = generateAccessToken({ email: user.email, userType: 'instructor', instructorId: user._id});
              return res.json({ accessToken, userType: 'instructor', instructorName: user.instructorName, instructorId: user._id, instructorEmail:user.email  });
            } else {
              return res.status(401).json("Incorrect password");
            }
          }else{
            return res.status(404).json("User not found");
          }
          break;
        case "admin":
          user = await AdminModel.findOne({ email });
          console.log('Found user:', user);
          if (user) {
            if (user.password === password) {
              const accessToken = generateAccessToken({ email: user.email, userType: 'admin', adminId: user._id});
              return res.json({ accessToken, userType: 'admin', adminId: user._id, adminEmail:user.email });
            } else {
              return res.status(401).json("Incorrect password");
            }
          } else{
            return res.status(404).json("Invalid user");
          }
          break;
         default:
          return res.status(400).json("Invalid user type");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  });

app.put("/changepassword", async (req, res) => {
    const { currentPassword, newPassword, userType, studentId, studentEmail, instructorId, instructorEmail, adminId, adminEmail } = req.body;

    try {
        let user;
        switch (userType) {
            case "student":
              if (!mongoose.Types.ObjectId.isValid(studentId)) {
                return res.status(400).json("Invalid student ID");
              }
              user = await StudentModel.findOne({ _id: studentId, email: studentEmail});
                if (user) {
                  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
                  if (passwordMatch){
                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                    user.password = hashedPassword;
                    await user.save();
                    return res.json("Password updated successfully");
                  }else {
                      return res.status(401).json("Incorrect password");
                  }
                }else {
                    return res.status(404).json("Student not found");
                }
                break;
            case "instructor":
              if (!mongoose.Types.ObjectId.isValid(instructorId)) {
                return res.status(400).json("Invalid instructor ID");
            }                
            user = await InstructorModel.findOne({ _id: instructorId, email: instructorEmail });
                if (user) {
                  if(user.password === currentPassword){
                    user.password = newPassword;
                    await user.save();
                    return res.json("Password updated successfully");
                  } else{
                    return res.status(401).json("Incorrect password");
                  }
                    
                } else{
                  return res.status(404).json("Instructor not found");
                }
                break;
            case "admin":
              if (!mongoose.Types.ObjectId.isValid(adminId)) {
                return res.status(400).json("Invalid admin ID");
            }                
            user = await AdminModel.findOne({ _id: adminId, email: adminEmail });
                if (user) {
                  if(user.password === currentPassword){
                    user.password = newPassword;
                    await user.save();
                    return res.json("Password updated successfully");
                  } else{
                    return res.status(401).json("Incorrect password");
                  }
                    
                } else{
                  return res.status(404).json("Admin not found");
                }
                break;
            default:
            return res.status(400).json("Invalid user type");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
});



app.post('/register', async (req, res) => {
  try{
    const {studentName, email, password} = req.body;
    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const studentId = await generateUniqueStudenId();

    const hash = await bcrypt.hash(password, 10);
    await StudentModel.create({ studentId, studentName, email, password: hash});
    res.json({success: true, message: 'Registration successful', studentId});
  }catch(error) {
    console.error(error);
    res.status(500).json({success: false, message:'Registration failed'});
  }
});

 async function generateUniqueStudenId(){
  let studentId; 
  let isUnique = false;

  while (!isUnique) {
    studentId = Math.floor(Math.random() * 10001) + 10000; 

    const existingStudent = await StudentModel.findOne({ studentId });

    if (!existingStudent) {
      isUnique = true;
    }
  }

  return studentId;
}



app.listen(3001, () =>{
    console.log("server is running")
});