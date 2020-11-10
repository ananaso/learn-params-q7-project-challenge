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
  let result;
  if (reqdStudent.length > 0) {
      result = reqdStudent[0];
  }
  return result;
};

_getNewStudentID = () => {
  let sortedStudents = _sortStudentsByID();
  let numStudents = sortedStudents.length;
  let lastStudent = sortedStudents[numStudents - 1];
  return lastStudent.id + 1;
}

_searchStudentNames = (searchName) => {
  let searchStr = searchName.toLowerCase();
  return students.map(student => {
    let firstName = student.name.first.toLowerCase();
    let lastName = student.name.last.toLowerCase();
    if (firstName.includes(searchStr) || lastName.includes(searchStr)) {
      return student;
    }
  }).filter(student => student !== undefined);
}

app.get('/students', (req, res) => {
  let searchName = req.query.search;
  let result;
  if (searchName) {
    let filteredStudents = _searchStudentNames(searchName);
    if (filteredStudents.length > 0) {
      result = {
        status: "success",
        message: filteredStudents
      };
    } else {
      result = {
        status: "failure",
        message: "No students with that name found"
      };
    }
  } else {
    result = {
      status: "success",
      message: students
    };
  }
  res.send(result);
});

app.get('/students/:studentID', (req, res) => {
  let result = {
    status: "failure",
    message: `Student #${req.params.studentID} could not be found`
  }
  let student = _getStudentByID(req.params.studentID);
  if (student) {
    result = {
      status: "success",
      message: `Student #${req.params.studentID} found`,
      student: student
    }
  }
  res.json(result);
});

app.get('/grades/:studentID', (req, res) => {
  let result = {
    status: "failure",
    message: `Student #${req.params.studentID} could not be found`
  }
  let student = _getStudentByID(req.params.studentID);
  if (student) {
    result = {
      status: "success",
      message: `Grades for Student #${req.params.studentID} found`,
      grades: student.grades
    }
  }
  res.json(result);
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

app.post('/grades/:studentID', (req, res) => {
  let result = {
    status: "failure",
    message: `Couldn't update grades for Student #${req.params.studentID}`
  }
  let student = _getStudentByID(req.params.studentID);
  let grades = req.body.grades;
  if (student && grades) {
    let index = students.indexOf(student);
    students[index].grades = {...student.grades, ...grades};
    result = {
      status: "success",
      message: `Updated grades for Student #${req.params.studentID}`
    }
  }
  res.json(result);
})

const port = 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));