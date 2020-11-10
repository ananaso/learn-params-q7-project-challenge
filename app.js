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

_sortStudentsByID = () => {
  let tempStudents = students;
  tempStudents.sort((a, b) => {
    return a.id - b.id;
  })
  return tempStudents;
}

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
};

_getNewStudentID = () => {
  let sortedStudents = _sortStudentsByID();
  let numStudents = sortedStudents.length;
  let lastStudent = sortedStudents[numStudents - 1];
  return lastStudent.id + 1;
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

app.post('/register', (req, res) => {
  let {name} = req.body;
  if (name.first && name.last) {
    let newStudentID = _getNewStudentID();
    users.push({
        id: newStudentID,
        name: name,
        grades: {}
    });

    result = {
        "status": "success",
        "message": "The User was successfully added"
    }
  } else {
    result = {
        "status": "failed",
        "message": "The user was not added"
    }
    res.status(400);
  }

  res.json(result);
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));