import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from "react-data-table-component";

import {
	subscribeToApi,
	unsubscribeFromApi,
} from './bookSlice'

const customStyles = {
	cells: {
		style: {
			color: '#FFF',
			background: '#172D3D',
			paddingLeft: '20px'
		}
	},
	headCells: {
		style: {
			background: '#172D3D',
			color: '#FFF'
		},
	},
	rows: {
		border: 'none',
	},
	noData: {
		style: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#172D3D',
			height: '40px',
			color: '#FFF'
		},
	}
}

export function BookTable () {
	const orderBookData = useSelector(state => state.bookData.data)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(subscribeToApi());
		return () => dispatch(unsubscribeFromApi());
	}, [])

	const columns = [
    {
      name: "COUNT",
      selector: (row) => row.count,
    },
    {
      name: "AMOUNT",
      selector: (row) => row.amount,
    },
    {
      name: "PRICE",
      selector: (row) => row.price,
    }
	];

	return <DataTable
		columns={columns}
		data={Object.values(orderBookData)}
		customStyles={customStyles}
		fixedHeader
		noDataComponent="Loading..."
	/>

}
