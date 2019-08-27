import React, { Component } from 'react';
import MailPagination from './MailPagination.style';
import { rtl } from '../../../Library/withDirection';

export default class extends Component {
  render() {
    return (
      <MailPagination className="isoMailPagination">
        <button type="button" className="prevPage">
          <i
            className={
              rtl === 'rtl' ? 'ion-ios-arrow-forward' : 'ion-ios-arrow-back'
            }
          />
        </button>

        <button type="button" className="nextPage">
          <i
            className={
              rtl === 'rtl' ? 'ion-ios-arrow-back' : 'ion-ios-arrow-forward'
            }
          />
        </button>
      </MailPagination>
    );
  }
}
