import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TokensProvider from '../context/TokensProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './Table.css';

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

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className="tokens-column">Tokens</th>
            <th className="balance-column">Balance</th>
          </tr>
        </thead>
        <tbody>
          {token.map((element, index) => {
            return (
              <tr key={index}>
                <td className="token"><div className="icon-container" ><FontAwesomeIcon className="edit-icon" data-testid="edit-icon" icon={faPenToSquare} onClick={() => redirectToEditToken(index)} />{element.token}</div></td>
                <td className="balance">{element.balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
