import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ReactTable from 'react-table-6'
import TokensProvider from '../context/TokensProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


export default function Table() {
    const history = useHistory();
    const { token } = useContext(TokensProvider);

    const redirectToEditToken = () => {
        history.push('/edit-token');
    }
    const columns = [ {
        Cell: () => (<FontAwesomeIcon icon={faPenToSquare} onClick={redirectToEditToken}/>)
    }, {
        Header: 'Tokens',
        accessor: 'tokens',
    }, {
        Header: 'Balance',
        accessor: 'balance'
    }];

  return (
    <div>
        <ReactTable data={token} columns={columns} defaultPageSize={2} pageSizeOptions={[2, 4, 6]} />
    </div>
  )
}
