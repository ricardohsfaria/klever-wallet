import React, { useContext, useEffect, useState } from 'react'
import TokensProvider from '../context/TokensProvider';
import Logo from '../assets/logo.svg';
import { useHistory } from 'react-router-dom';
import ShootingStar from '../assets/shooting-star.svg';
import './AddToken.css';

export default function AddToken() {
  const history = useHistory();
  const { token, setToken } = useContext(TokensProvider);
  const [newToken, setNewToken] = useState([]);
  const [validated, setValidation] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewToken(prevState => ({
      ...prevState,
      [name]: value.toUpperCase(),
    }));
  };

  const validateForm = () => {
    let tokenAlreadyExists = false;
    if(token) tokenAlreadyExists = token.some((element) => element.token === newToken.token);
    if(tokenAlreadyExists) return alert('Token already exists');
    if(!newToken.token || !newToken.balance) return alert('Make sure to fill all fields');
    setValidation(true);
  }

  const handleSubmit = () => {
    validateForm();
    if(validated) {
      setToken(prevTokens => [...prevTokens, newToken]);
      history.push('/');
    }
  }

  useEffect(() => {
    localStorage.setItem("tokens", JSON.stringify([...token, newToken]));
  })

  const handleReturn = () => {
    history.push('/');
  }

  return (
    <div>
      <div className="logo-container"><img className="logo"src={Logo} alt="logo" /></div>
      <div className="title-star-wrapper-add">
        <img className="shooting-star" src={ShootingStar} alt="shooting star" />
        <h2 className="title">Wish Wallet</h2>
      </div>
      <div className="add-token-wrapper">
        <h3 className="add-token-text">Add Token</h3>
        <div className="button-wrapper"><button className="add-button"type="button" onClick={ handleReturn }>Voltar</button></div>
      </div>
      <form className="form" action="submit">
  <label className="label" for="token">Token</label>
  <input
    className="input"
    required
    id="token"
    name="token"
    type="text"
    onChange={ handleChange }
    value={newToken.token}
  />
  <label className="label" for="balance">Balance</label>
  <input
    className="input"
    required
    id="balance"
    name="balance"
    type="number"
    onChange={ handleChange }
    value={newToken.balance}
  />
  <button className="add-token-button" type="button" onClick={ handleSubmit }>Save</button>
</form>
    </div>
  )
}
