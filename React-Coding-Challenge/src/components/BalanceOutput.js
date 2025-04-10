import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as utils from '../utils';


const mapAccounts = (accounts) => {
  const objectAccount = {}
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    objectAccount[account.ACCOUNT] = { DESCRIPTION: account.LABEL };
    objectAccount[account.ACCOUNT].DEBIT = 0;
    objectAccount[account.ACCOUNT].CREDIT = 0;
  }
  return objectAccount;
}

class BalanceOutput extends Component {
  render() {
    if (!this.props.userInput.format) {
      return null;
    }

    return (
      <div className='output'>
        <p>
          Total Debit: {this.props.totalDebit} Total Credit: {this.props.totalCredit}
          <br />
          Balance from account {this.props.userInput.startAccount || '*'}
          {' '}
          to {this.props.userInput.endAccount || '*'}
          {' '}
          from period {utils.dateToString(this.props.userInput.startPeriod)}
          {' '}
          to {utils.dateToString(this.props.userInput.endPeriod)}
        </p>
        {this.props.userInput.format === 'CSV' ? (
          <pre>{utils.toCSV(this.props.balance)}</pre>
        ) : null}
        {this.props.userInput.format === 'HTML' ? (
          <table className="table">
            <thead>
              <tr>
                <th>ACCOUNT</th>
                <th>DESCRIPTION</th>
                <th>DEBIT</th>
                <th>CREDIT</th>
                <th>BALANCE</th>
              </tr>
            </thead>
            <tbody>
              {this.props.balance.map((entry, i) => (
                <tr key={i}>
                  <th scope="row">{entry.ACCOUNT}</th>
                  <td>{entry.DESCRIPTION}</td>
                  <td>{entry.DEBIT}</td>
                  <td>{entry.CREDIT}</td>
                  <td>{entry.BALANCE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    );
  }
}

BalanceOutput.propTypes = {
  balance: PropTypes.arrayOf(
    PropTypes.shape({
      ACCOUNT: PropTypes.number.isRequired,
      DESCRIPTION: PropTypes.string.isRequired,
      DEBIT: PropTypes.number.isRequired,
      CREDIT: PropTypes.number.isRequired,
      BALANCE: PropTypes.number.isRequired
    })
  ).isRequired,
  totalCredit: PropTypes.number.isRequired,
  totalDebit: PropTypes.number.isRequired,
  userInput: PropTypes.shape({
    startAccount: PropTypes.number,
    endAccount: PropTypes.number,
    startPeriod: PropTypes.date,
    endPeriod: PropTypes.date,
    format: PropTypes.string
  }).isRequired
};

export default connect(state => {
  let balance = [];

  /* YOUR CODE GOES HERE */
  const startAccount = state.userInput.startAccount
  const endAccount = state.userInput.endAccount

  const startPeriod = state.userInput.startPeriod
  const endPeriod = state.userInput.endPeriod;


  const mapAccount = mapAccounts(state.accounts)
  const listAccounts = Object.keys(mapAccount).map((account) => { return parseInt(account, 10) }).sort();
  let filteredAccounts = listAccounts
  if (startAccount !== '*' && endAccount !== '*') {
    filteredAccounts = listAccounts.filter((account) => {
      if (startAccount !== '*') {
        if (account < startAccount) {
          return false;
        }
      }
      if (endAccount !== '*') {
        if (account > endAccount) {
          return false;
        }
      }
      return true;
    })
  }

  for (let i = 0; i < state.journalEntries.length; i++) {
    const entry = state.journalEntries[i];
    const account = entry.ACCOUNT
    const debit = entry.DEBIT
    const credit = entry.CREDIT
    const period = entry.PERIOD

    if (startPeriod !== '*') {
      if (period < startPeriod) {
        continue
      }
    }
    if (endPeriod !== '*') {
      if (period > endPeriod) {
        continue
      }
    }
    if (!filteredAccounts.includes(account)) {
      continue
    }
    mapAccount[account].DEBIT += debit
    mapAccount[account].CREDIT += credit
  }
  for (let i = 0; i < Object.keys(filteredAccounts).length; i++) {
    const account = filteredAccounts[i]
    if (mapAccount[account].DEBIT === 0 && mapAccount[account].CREDIT === 0) {
      continue
    }
    balance.push({
      ACCOUNT: account,
      DESCRIPTION: mapAccount[account].DESCRIPTION,
      DEBIT: mapAccount[account].DEBIT,
      CREDIT: mapAccount[account].CREDIT,
      BALANCE: mapAccount[account].DEBIT - mapAccount[account].CREDIT
    })
  }

  const totalCredit = balance.reduce((acc, entry) => acc + entry.CREDIT, 0);
  const totalDebit = balance.reduce((acc, entry) => acc + entry.DEBIT, 0);

  return {
    balance,
    totalCredit,
    totalDebit,
    userInput: state.userInput
  };
})(BalanceOutput);
