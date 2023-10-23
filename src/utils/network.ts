import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewRowData } from "../components/Table";
import { CREATY_ROW, DELETE_ROW, GET_ROWS, ROOT, UPDATE_ROW } from "../constatnts/api"
import { addNewRow, deleteRowData, updateRowData } from "../slices/tableSlice";

export const fetchTable = createAsyncThunk(
    'table/fetchTable',
    async () => {
        try {
            const res =  await fetch(ROOT+GET_ROWS);
            if (!res.ok) {
                console.error('Could not fetch', res.status)
                return false;
             }
             return await res.json();
            } catch (error) {
            console.log('Error: ' + error);
        }
    }
);

export const deleteRow = createAsyncThunk(
    'table/deleteRow',
    async (id:number,{dispatch}) => {
        try {
            fetchMetod(ROOT+DELETE_ROW(id),'DELETE');
            dispatch(deleteRowData(id))
        } catch (error) {
            console.log('Error: ' + error);
        }
    }
);

export const createRow = createAsyncThunk(
    'table/createRow',
    async (row:NewRowData,{dispatch}) => {
        try {
            fetchMetod(ROOT+CREATY_ROW,'POST',row);
            dispatch(addNewRow(row))
          } catch (error) {
              console.log('Error: ' + error);
          }
    }
);

export const updateRow = createAsyncThunk(
    'table/updateRow',
    async (obj:{row:NewRowData,id:number},{dispatch}) => {
        const {row,id} = obj;
        try {
            fetchMetod(ROOT+UPDATE_ROW(id),'PUT',row);
            dispatch(updateRowData({row:row,id:id}))
        } catch (error) {
            console.log('Error: ' + error);
        }
    }
);

const fetchMetod = async (url:string,method:string,data = {}) => {
    const res = await fetch(url,{
        method:method,
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
           },
        body: JSON.stringify(data)    
    })
    if (!res.ok) {
        console.error('Could not fetch', res.status)
        return false;
     }
     return await res.json();
}
