import React from 'react'
import { useHistory } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import Table from '../components/Table';
import ShootingStar from '../assets/shooting-star.svg';
import './Home.css';

export default function Home() {
    const history = useHistory();

    const redirectToAddToken = () => {
        history.push('/add-token');
}
  return (
    <div className="body">
        <div className="logo-container">
          <img className="logo" src={Logo} alt="logo" />
          </div>
        <div className="header-container">
            <div className="title-star-wrapper">
              <div><img className="shooting-star"src={ShootingStar} alt="shooting star icon" /></div>
              <h2 className="title">Wish Wallet</h2>
              </div>
            <div className="button-wrapper"><button className="button" type="button" onClick={ redirectToAddToken }>Add Token</button></div>
        </div>
        <Table />
    </div>
  )
}
