import React, { useState, useEffect } from 'react';
import axios from 'axios'
import dayjs from 'dayjs';
import { Alert, Calendar, Row, Col } from 'antd';
import ExercisePieChart from './ExercisePieChart';
import LayoutPage from './LayoutPage';

const Chart = () => {
  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseDescriptions, setExerciseDescriptions] = useState({});
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const dateCellRender = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const descriptions = exerciseDescriptions[formattedDate];

    return (
      <div>
        {descriptions && descriptions.length > 0 && (
          <ul>
            {descriptions.map((description, index) => (
              <li key={index}>{description}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  useEffect(() => {
    // Fetch your exercise data from the server
    const fetchData = async () => {
      try {
        const loggedUser = sessionStorage.getItem('username');
        const response = await axios.get(`/exercises/user/${loggedUser}`,{
          validateStatus: (status) => status >= 200 && status < 500, // Treat 404 as success
        });
        if(response.status === 404){
          setExerciseData([]);
          setExerciseDescriptions([]);
        }
        else{
          const filteredExercises = response.data.filter((exercise)=> {
              return dayjs(exercise.date).format('YYYY-MM-DD') === selectedValue.format('YYYY-MM-DD');
          })
          setExerciseData(filteredExercises);

          const descriptions = {};
          response.data.forEach((exercise) => {
            const formattedDate = dayjs(exercise.date).format('YYYY-MM-DD');
            if (!descriptions[formattedDate]) {
              descriptions[formattedDate] = [];
            }
            descriptions[formattedDate].push(exercise.description);
          });
          setExerciseDescriptions(descriptions);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedValue]);
  return (
    
    <LayoutPage defaultSelectedKey="sub3">
        <Row gutter={[16, 16]}> {/* Add Row with gutter for spacing */}
            <Col span={16}>
                <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
                <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} dateCellRender={dateCellRender} />
            </Col>
            <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                { exerciseData.length > 0 ? 
                    <ExercisePieChart exerciseData={exerciseData} /> : 
                    <Alert message="No data to show on selected date, select any other date" />
                }
            </Col>
        </Row>
    </LayoutPage>
  );
};
export default Chart;