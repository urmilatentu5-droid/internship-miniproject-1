import React, { useState } from "react";
import "./App.css";

function App() {
  const [schedule, setSchedule] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    teacher: "",
    date: "",
    time: ""
  });

  const addSchedule = (e) => {
    e.preventDefault();

    // Conflict checking
    const conflict = schedule.find(
      (item) =>
        item.date === form.date &&
        item.time === form.time
    );

    if (conflict) {
      alert("⚠️ This time slot is already booked!");
      return;
    }

    setSchedule([
      ...schedule,
      {
        id: Date.now(),
        ...form
      }
    ]);

    alert("✅ Class Scheduled Successfully!");

    setForm({
      subject: "",
      teacher: "",
      date: "",
      time: ""
    });
  };

  const removeClass = (id) => {
    setSchedule(
      schedule.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="container">

      <div className="overlay">

        <h1>🎓 Virtual Classroom Schedule Planner</h1>

        <p className="subtitle">
          Plan your classes without time conflicts
        </p>

        <div className="card">

          <form onSubmit={addSchedule}>

            <input
              type="text"
              placeholder="Subject Name"
              required
              value={form.subject}
              onChange={(e) =>
                setForm({
                  ...form,
                  subject: e.target.value
                })
              }
            />

            <input
              type="text"
              placeholder="Teacher Name"
              required
              value={form.teacher}
              onChange={(e) =>
                setForm({
                  ...form,
                  teacher: e.target.value
                })
              }
            />

            <input
              type="date"
              required
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value
                })
              }
            />

            <input
              type="time"
              required
              value={form.time}
              onChange={(e) =>
                setForm({
                  ...form,
                  time: e.target.value
                })
              }
            />

            <button type="submit">
              Add Class
            </button>

          </form>

        </div>


        <h2 className="heading">
          📚 Today's Schedule
        </h2>


        <div className="schedule-grid">

          {schedule.length === 0 ? (
            <p>No classes scheduled yet.</p>
          ) : (

            schedule.map((item) => (

              <div
                className="schedule-card"
                key={item.id}
              >

                <h3>
                  {item.subject}
                </h3>

                <p>
                  👩‍🏫 {item.teacher}
                </p>

                <p>
                  📅 {item.date}
                </p>

                <p>
                  ⏰ {item.time}
                </p>

                <button
                  className="delete-btn"
                  onClick={() =>
                    removeClass(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default App;