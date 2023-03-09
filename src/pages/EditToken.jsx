import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import ShootingStar from '../assets/shooting-star.svg'
import TokensProvider from '../context/TokensProvider'
import './EditToken.css'

export default function EditToken () {
  const history = useHistory()
  const { token, setToken, selectedIndex } = useContext(TokensProvider)
  const [editedToken, setEditedToken] = useState({})
  const [updated, setUpdate] = useState(false)

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < token.length) {
      setEditedToken({ ...token[selectedIndex] })
    }
  }, [selectedIndex, token])

  const handleReturn = () => {
    history.push('/')
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setEditedToken((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  // const validateForm = () => {
  //   if(!editedToken.token || !editedToken.balance) return alert('Make sure to fill all fields');
  //   setValidation(true);
  // }

  const handleSubmit = () => {
    if (!editedToken.token || !editedToken.balance) return alert('Make sure to fill all fields')
    const newTokens = [...token]
    newTokens[selectedIndex] = editedToken
    setToken(newTokens)
    localStorage.setItem('tokens', JSON.stringify(newTokens))
    history.push('/')
  }

  useEffect(() => {
    if (token) localStorage.setItem('tokens', JSON.stringify(token))
    if (updated) history.push('/')
  })

  const handleDeletion = () => {
    const updatedTokens = token.filter((element) => element !== token[selectedIndex])
    if (window.confirm('Are you sure you want to delete this token?')) {
      setToken(updatedTokens)
      setUpdate(true)
    }
  }

  return (
    <div>
      <div className="logo-container"><img className="logo"src={Logo} alt="logo" /></div>
      <div className="title-star-wrapper-add">
        <img className="shooting-star" src={ShootingStar} alt="shooting star" />
        <h2 className="title">Wish Wallet</h2>
      </div>
      <div className="edit-token-wrapper">
        <h3 className="edit-token-text">Edit Token</h3>
        <div className="edit-button-wrapper"><button className="edit-button" type="button" onClick={handleReturn}>Return</button></div>
      </div>
      <form className="form">
        <label className="label" htmlFor="token">Token</label>
          <input
            className="input"
            data-testid="token-input"
            required
            name="token"
            type="text"
            value={editedToken.token || ''}
            onChange={handleChange}
          />
        <label className="label" htmlFor="balance">Balance</label>
          <input
            className="input"
            data-testid="balance-input"
            required
            name="balance"
            type="number"
            value={editedToken.balance || ''}
            onChange={handleChange}
          />
        <div className="buttons-wrapper">
          <div>
            <button className="remove-token-button" type="button" onClick={handleDeletion}>Remove</button>
          </div>
          <div>
            <button className="edit-token-button" type="button" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </form>
    </div>
  )
}
