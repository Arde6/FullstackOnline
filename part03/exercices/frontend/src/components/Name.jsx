const Name = ({ person, deleteName }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deleteName(person.id)}>delete</button>
    </li>
  )
}


export default Name