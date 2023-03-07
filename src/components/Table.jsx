import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactTable from 'react-table-6'
import TokensProvider from '../context/TokensProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function Table() {
    const history = useHistory();
    const { token, setToken, setSelectedIndex } = useContext(TokensProvider);
    const redirectToEditToken = (index) => {
      setSelectedIndex(index);
      history.push(`/edit-token/${index}`);
    };

    useEffect(() => {
        const storedTokens = JSON.parse(localStorage.getItem("tokens"));
        if(localStorage.length > 0) setToken(storedTokens);
    }, [setToken])

    const columns = [ {
      Cell: ({ index }) => (<FontAwesomeIcon icon={faPenToSquare} onClick={() => redirectToEditToken(index)} />)
    },     {
        Header: 'Token',
        accessor: 'token',
      },
      {
        Header: 'Balance',
        accessor: 'balance'
      }];

  return (
    <div>
        {token.length > 0 && (<ReactTable data={token} columns={columns} defaultPageSize={5} pageSizeOptions={[2, 4, 6]} />)}
    </div>
  )
}
