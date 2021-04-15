import React from 'react';
// moment js
import moment from 'moment';
import 'moment/locale/ru';

import cx from 'classnames';

export const Head = ({...props})=>{
  const {day, type} = props;
  const headIconCx = cx({
      icon: true,
      [type]: type
  });
  return (
      <div className="head">
        <div className={headIconCx}></div>
        <div className="current-date">
          <p>{moment(day).locale('ru').format('dddd')}</p>
          <span>{moment(day).locale('ru').format('D MMMM')}</span>
        </div>
      </div>
  )
}