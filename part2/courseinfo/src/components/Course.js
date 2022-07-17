const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
  </div>
)

const Total = ({ parts }) => <p style={{fontWeight:"bold"}}>total of {parts.reduce((acc, p) => acc + p.exercises, 0)} exercises</p>


const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course
