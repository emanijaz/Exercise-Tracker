import React, {useRef} from 'react'
import LayoutPage from './LayoutPage'
import LoggedExercises from './LoggedExercises';
import CreateExercise from './CreateExercise';
export default function Dashboard() {
  const loggedExercisesRef = useRef();
  // Function to be called when a new exercise is added
  const handleExerciseAdded = () => {
    // Call the fetchData function of the LoggedExercises component through the ref
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
