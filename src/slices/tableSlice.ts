import { createSlice,PayloadAction  } from '@reduxjs/toolkit';
import { NewRowData, RowData } from '../components/Table';
import { fetchTable } from '../utils/network';

const initialState:RowData[] = [{
    child: [
        null
      ],
      equipmentCosts: 0,
      estimatedProfit: 0,
      id: 0,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      overheads: 0,
      rowName: "string",
      salary: 0,
      supportCosts: 0,
      total: 0
  },];
  

  const tableSlice = createSlice({
    name: 'table',
    initialState,
    // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
    reducers: {
        addNewRow: (state, action:PayloadAction<NewRowData>) => {
            state.push(action.payload);
        },
        updateRowData: (state, action:PayloadAction<{row:NewRowData,id:number}>) => {
            return state.map(el => el.id === action.payload.id ? el = action.payload.row : el);
        },
        deleteRowData: (state, action:PayloadAction<number>) => {
            return state.filter(el => el.id !== action.payload);
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchTable.fulfilled,(state, action) => {
            state = action.payload;
        })
    }
});

export default tableSlice.reducer;
export const {addNewRow, updateRowData, deleteRowData} = tableSlice.actions;