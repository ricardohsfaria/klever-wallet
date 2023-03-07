import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactTable from 'react-table-6'
import TokensProvider from '../context/TokensProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function Table() {
    const history = useHistory();
    const { token, setToken } = useContext(TokensProvider);

    const redirectToEditToken = () => {
        token.forEach((obj, index) => {
            obj.index = index;
            setToken(obj);
            history.push(`/edit-token/${token[index].index}`);
    });
    }

    useEffect(() => {
        const storedTokens = JSON.parse(localStorage.getItem("tokens"));
        if(localStorage.length > 0) setToken(storedTokens);
    }, [setToken])

    const columns = [ {
        Cell: () => (<FontAwesomeIcon icon={faPenToSquare} onClick={redirectToEditToken}/>)
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
        {token && (<ReactTable data={token} columns={columns} defaultPageSize={5} pageSizeOptions={[2, 4, 6]} />)}
    </div>
  )
}
