import { Link, useParams } from 'react-router-dom'
import { getSquad } from '../../services/squadService'
import { useState, useEffect } from 'react'
import userEvent from '@testing-library/user-event'

const Squad = (props) => {
  const [squad, setSquad] = useState({})
  const { id } = useParams()
  useEffect(() => {
    getSquad(id)
      .then(squadData => {
        setSquad(squadData)
      })
  }, [])


  return (
    <>
      <div>
        <h3>{squad.name}</h3>
        {
          userEvent.profile === squad.owner?._id ?
            <div>
              <Link
                to={`/squad/${squad._id}/edit`}
                state={{squad}}
              >
                Edit
              </Link>
              <button
                onClick={()=> props.handleDeleteSquad
                (squad._id)}
              >
                Delete
              </button>
            </div>
          :
          <div>
            <p>{squad.creator.name}'s squad</p>
          </div>
        }
      </div>
    </>
  );
}

export default Squad;
