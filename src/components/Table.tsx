import * as React from "react";
import icon6 from '../icons/Icon6.png';
import icon1 from '../icons/icon1.png';
import './styles/Table.css';

import { useState,useEffect } from "react";
import { Input } from './Input';
import { createRow, deleteRow, fetchTable, updateRow } from "../utils/network";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export interface NewRowData {
    rowName: string 
    salary: number
    equipmentCosts: number 
    mainCosts: number 
    estimatedProfit: number 
    machineOperatorSalary: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    supportCosts: number,
    parentId?: number | null 
}

export interface RowData extends NewRowData {
    child?:null | number[],
    id?: number,
    total?:number,
}

export const Table = () => {

    const tabs = useAppSelector((state) => state.table);
    const dispatch = useAppDispatch()

    const [editMode,SetEditMode] = useState(false);
    const [rowId,SetRowId] = useState(0);
    const [editCell,SetEditCell] = useState(false);
    const [cellName,SetCellName] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const [newRowData, SetNewRowData] = useState<NewRowData>({
        equipmentCosts: 0,
        estimatedProfit: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        parentId: 0,
        rowName: "string",
        salary: 0,
        supportCosts: 0,
    })

    useEffect(() => {
        fetchTable()
    },[]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        SetNewRowData({...newRowData,[e.target.name]:e.target.value})
    }
    
    const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            if(editCell) {
                dispatch(updateRow({row:newRowData,id:rowId}));
                SetEditCell(false);
            } else {
                dispatch(createRow(newRowData))
                SetEditMode(false)
            }
            setIsHovered(false)
        }
    }

    const onClick = (parentID:number):void => {
        SetEditMode(true);
    }
    const onDoubleClick = (id:number,cellName:string):void => {
        SetEditCell(true);
        SetRowId(id);
        SetCellName(cellName);
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    const handleDeleteRow = (rowId:number) => {
        dispatch(deleteRow(rowId));
    }
    
    return (
        <div className="table">
          <table style={{borderCollapse: "collapse"}}>
                   <thead>
                        <tr >
                            <th className="tableHeader" >Уровень</th>
                            <th className="tableHeader" style={{ width:'800px' }}>Наименование работ</th>
                            <th className="tableHeader" >Основная з/п</th>
                            <th className="tableHeader" >Оборудование</th>
                            <th className="tableHeader" >Накладные расходы</th>
                            <th className="tableHeader" >Сметная прибыль </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabs.map((list,index)=>{
                                return (
                                    <tr key={index}>    
                                        <td className="tableRow">
                                            <div className="tableRow_edit"  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{marginLeft:list.parentId*2}} >
                                                {<img alt ='' src={icon6} onClick={() => !editCell ? onClick(list.parentId) : false} /> }
                                                {isHovered && <img src={icon1} alt="delete" className="deleteImg"  onClick={() => handleDeleteRow(list.id)}/>}
                                            </div>                                         
                                        </td>
                                        <td className="tableRow" onDoubleClick={() => onDoubleClick(list.id,'rowName')}> {editCell && list.id === rowId && cellName === 'rowName'         ?  <Input  handleChange={handleChange} handleKeyPress={handleKeyPress} holder={''} name="rowName"/>   :  list.rowName } </td>
                                        <td className="tableRow" onDoubleClick={() => onDoubleClick(list.id,'salary')}> {editCell && list.id === rowId && cellName === 'salary'           ?  <Input  handleChange={handleChange} handleKeyPress={handleKeyPress} holder={0} name="salary"/>     :  list.salary } </td>
                                        <td className="tableRow" onDoubleClick={() => onDoubleClick(list.id,'equipmentCosts')}> {editCell && list.id === rowId && cellName === 'equipmentCosts'   ?  <Input  handleChange={handleChange} handleKeyPress={handleKeyPress} holder={0} name="equipmentCosts"/> :  list.equipmentCosts } </td>
                                        <td className="tableRow" onDoubleClick={() => onDoubleClick(list.id,'overheads')}> {editCell && list.id === rowId && cellName === 'overheads' ?  <Input  handleChange={handleChange} handleKeyPress={handleKeyPress} holder={0} name="overheads"/>:  list.overheads } </td>
                                        <td className="tableRow" onDoubleClick={() => onDoubleClick(list.id,'estimatedProfit')}> {editCell && list.id === rowId && cellName === 'estimatedProfit'             ?  <Input  handleChange={handleChange} handleKeyPress={handleKeyPress} holder={0} name="estimatedProfit"/>      :  list.estimatedProfit } </td>
                                    </tr>
                                )
                        })}
                        {(editMode || tabs.length === 0) &&
                            <tr>    
                            <td className="tableRow"><img alt ='' src={icon6}/></td>
                            <td className="tableRow"><Input handleChange={handleChange} handleKeyPress={handleKeyPress} holder={''}name="rowName"  /></td>
                            <td className="tableRow"><Input handleChange={handleChange} handleKeyPress={handleKeyPress} holder={0} name="salary" /></td>
                            <td className="tableRow"><Input handleChange={handleChange} handleKeyPress={handleKeyPress} holder={0} name="equipmentCosts" /></td>
                            <td className="tableRow"><Input handleChange={handleChange} handleKeyPress={handleKeyPress} holder={0} name="overheads" /></td>
                            <td className="tableRow"><Input handleChange={handleChange} handleKeyPress={handleKeyPress} holder={0} name="estimatedProfit" /></td>
                        </tr>
                        } 
                    </tbody>  
                    <tfoot></tfoot>               
                </table>
        </div>
    )
  };