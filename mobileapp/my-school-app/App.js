import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AttendanceScreen from './screens/AttendanceScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import NonAcademicRecordScreen from './screens/NonAcademicRecordScreen';
import MeetingLogScreen from './screens/MeetingLogScreen';
import AssessmentScreen from './screens/AssessmentScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Schedule">
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        <Stack.Screen name="NonAcademic" component={NonAcademicRecordScreen} />
        <Stack.Screen name="MeetingLog" component={MeetingLogScreen} />
        <Stack.Screen name="Assessment" component={AssessmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
