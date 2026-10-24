
"use strict";


const students = [
    { name: "Alice", course: "Frontend", score: 92 },
    { name: "David", course: "Backend", score: 45 },
    { name: "Grace", course: "Frontend", score: 85 },
    { name: "Eric", course: "Backend", score: 67 },
    { name: "Marie", course: "Frontend", score: 78 },
    { name: "Kevin", course: "Backend", score: 38 },
    { name: "Diane", course: "Frontend", score: 85 }
];


function render() {
    const studentGrid = document.getElementById("student-grid");
    const studentCount = document.getElementById("student-count");
    const averageScore = document.getElementById("average-score");
    const topStudents = document.getElementById("top-students");

    
    studentGrid.replaceChildren();

    
    const sortedStudents = [...students].sort((a, b) => {
        if (a.course === "Frontend" && b.course !== "Frontend") {
            return -1;
        }

        if (a.course !== "Frontend" && b.course === "Frontend") {
            return 1;
        }

        return a.name.localeCompare(b.name);
    });

    
    studentCount.textContent = students.length;

    
    let totalScore = 0;

    for (const student of students) {
        totalScore += student.score;
    }

    const average = students.length > 0
        ? totalScore / students.length
        : 0;

    averageScore.textContent = average.toFixed(2);

    
    let highestScore = -1;

    for (const student of students) {
        if (student.score > highestScore) {
            highestScore = student.score;
        }
    }

    const bestStudents = students.filter(
        student => student.score === highestScore
    );

    topStudents.textContent = students.length > 0
        ? bestStudents.map(student => student.name).join(", ")
        : "None";

    
    for (const student of sortedStudents) {
        const card = document.createElement("article");
        card.classList.add("student-card");

        
        if (student.score >= 80) {
            card.classList.add("excellent");
        } else if (student.score < 50) {
            card.classList.add("failed");
        }

        const name = document.createElement("h3");
        name.textContent = student.name;

        const course = document.createElement("p");
        course.textContent = "Course: " + student.course;

        const score = document.createElement("p");
        score.classList.add("score");
        score.textContent = "Score: " + student.score;

        const status = document.createElement("p");

        if (student.score >= 80) {
            status.textContent = "Excellent";
        } else if (student.score < 50) {
            status.textContent = "Failed";
        } else {
            status.textContent = "Needs improvement";
        }

        
        card.append(name, course, score, status);
        studentGrid.append(card);
    }
}


render();
