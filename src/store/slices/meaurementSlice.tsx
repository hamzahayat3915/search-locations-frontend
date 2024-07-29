// redux/mapSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Measurement {
  id: string; 
  value: number; 
}

interface MapState {
  measurements: Measurement[];
}

const initialState: MapState = {
  measurements: [],
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    addMeasurement: (state, action: PayloadAction<Measurement>) => {
      state.measurements.push(action.payload);
    },
    removeMeasurement: (state, action: PayloadAction<{ id: string }>) => {
      state.measurements = state.measurements.filter(
        (measurement) => measurement.id !== action.payload.id
      );
    },
  },
});

export const { addMeasurement, removeMeasurement } = mapSlice.actions;
export default mapSlice.reducer;