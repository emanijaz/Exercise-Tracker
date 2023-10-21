import React, {useRef} from 'react'
import LayoutPage from './LayoutPage'
import LoggedExercises from './LoggedExercises';
import CreateExercise from './CreateExercise';
export default function Dashboard() {
  const loggedExercisesRef = useRef();
  const handleExerciseAdded = () => {
    loggedExercisesRef.current.fetchData();
  };
 
  return (
    <div className='container'>
      
        <LayoutPage defaultSelectedKey="sub1">
            <CreateExercise onExerciseAdded={handleExerciseAdded}/>
            <LoggedExercises ref={loggedExercisesRef}/>
        </LayoutPage>
        
    </div>
  )
}
