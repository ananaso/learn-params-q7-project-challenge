const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const students = [
  {
    id: 1,
    name: {
      first: "Ethan",
      last: "Davidson"
    },
    grades: {
      math: 95,
      reading: 73,
      science: 100,
      order: 66
    }
  },
  {
    id: 2,
    name: {
      first: "Lincoln",
      last: "Davidson"
    },
    grades: {
      math: 100,
      reading: 0,
      science: 33
    }
  }
];

_getStudentByID = (studentID) => {
  let reqdStudent = students.filter(student => student.id === Number(studentID));
  if (reqdStudent.length > 0) {
      return reqdStudent[0];
  } else {
      result = {
          "status": "failed",
          "message": `Student with ID #${req.params.studentID} not found`
      }
      res.json(result);
  }
}

app.get('/students', (req, res) => res.send(students));

app.get('/students?search=', (req, res) => {
  res.send(`Hello There! General ${req.query}`);
});

app.get('/students/:studentID', (req, res) => {
  let student = _getStudentByID(req.params.studentID);
  if (student) {
    res.send(student);
  }
});

app.get('/grades/:studentID', (req, res) => {
  let student = _getStudentByID(req.params.studentID);
  if (student) {
    res.send(student.grades);
  }
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));