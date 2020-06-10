import React from 'react';
import { userHasLogin } from '../hoc/userHasLogin';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoginPage from '../pages/LoginPage';
import TicketListingPage from '../pages/TicketListingPage';
// import Tickets from './Components/Tickets'
import TicketDetails from '../Components/TicketDetails';
import Reply from '../pages/ReplyPage';
import { BrowserRouter, Route } from 'react-router-dom';
import Tickets from '../Components/Tickets'
import ReportPage from '../pages/ReportPage';

export const routes = () => {
  return (
    <BrowserRouter >
      <Route exact={true} path='/' component={LoginPage} />
      <Route exact={true} path='/ticketlist' component={userHasLogin(TicketListingPage)} />
      <Route exact={true} path='/ticketlist/:ticket_id' component={userHasLogin(TicketDetails)} />
      <Route exact={true} path='/ticket/:ticket_id' component={Reply} />
      <Route exact={true} path='/addtickets' component={userHasLogin(Tickets)} />
      <Route exact={true} path='/reports' component={userHasLogin(ReportPage)} />
      {/* 
           />
           */}
    </BrowserRouter>
  );
}

