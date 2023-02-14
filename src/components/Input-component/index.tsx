import React, { useState } from 'react';
import './style.scss';
import checkedIcon from '../../assets/icons/checked.svg';
import unCheckedIcon from '../../assets/icons/unChecked.svg';
import { PanelInfo } from './model';

const verifyUpcase = (str: string) => {
  const re = /[A-Z]/g;
  const found = str.match(re);

  return !!found;
};
const verifyLowcase = (str: string) => {
  const re = /[a-z]/g;
  const found = str.match(re);

  return !!found;
};
const verifyNumber = (str: string) => {
  const re = /[0-9]/g;
  const found = str.match(re);

  return !!found;
};
const verifyCharacter = (str: string) => {
  const re = /[!@#$%&]/g;
  const found = str.match(re);

  return !!found;
};

const InputComponent: React.FC = () => {
  const [panelData, setPanelData] = useState(PanelInfo);
  const verifyFun = (str: string) => {
    const copyData = JSON.parse(JSON.stringify(panelData));
    copyData[0].isChecked = verifyUpcase(str);
    copyData[1].isChecked = verifyLowcase(str);
    copyData[2].isChecked = verifyNumber(str);
    copyData[3].isChecked = verifyCharacter(str);
    copyData[4].isChecked = str.length > 8;
    setPanelData(copyData);
  };

  return (
    <div className="input-component-box">
      <div className="input-box">
        <div className="input-box-label">Password</div>
        <input type="password" onChange={(e) => verifyFun(e.target.value)} />
        <div className="input-panel">
          {panelData.map((item) => {
            return (
              <div className="input-panel-item" key={item.id}>
                {item.isChecked ? (
                  <img src={checkedIcon} alt="" />
                ) : (
                  <img src={unCheckedIcon} alt="" />
                )}
                <div className="input-panel-item-text">{item.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InputComponent;
