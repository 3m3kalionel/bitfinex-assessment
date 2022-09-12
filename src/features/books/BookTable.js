import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from "react-data-table-component";

import {
	subscribeToApi,
	unsubscribeFromApi,
} from './bookSlice'

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

	return <DataTable columns={columns} data={Object.values(orderBookData)} />

}
