import React, { ReactNode } from 'react';

import Button from 'ts/components/UiKit/components/Button';
import notificationsStore from 'ts/components/Notifications/store';
import localization from 'ts/helpers/Localization';

import style from './index.module.scss';

function copyInBuffer(value?: string) {
  if (!value) return;
  const copyTextarea = document.createElement('textarea');
  copyTextarea.style.position = 'fixed';
  copyTextarea.style.opacity = '0';
  copyTextarea.textContent = value;

  document.body.appendChild(copyTextarea);
  copyTextarea.select();
  document.execCommand('copy');
  document.body.removeChild(copyTextarea);
}

interface IConsoleProps {
  textForCopy?: string;
  className?: string;
  children?: ReactNode | string | number | null;
}

function Console({ className, textForCopy, children }: IConsoleProps) {
  return (
    <div className={`${style.console} ${className || ''}`}>
      <div className={`${style.console_header}`}>
        <span className={`${style.console_header_icon}`}></span>
        <span className={`${style.console_header_icon}`}></span>
        <span className={`${style.console_header_icon}`}></span>
      </div>
      <div className={`${style.console_body}`}>
        {children || textForCopy}
      </div>
      <Button
        type="second"
        className={`${style.console_copy}`}
        onClick={() => {
          copyInBuffer(textForCopy);
          notificationsStore.show('Текст скопирован');
        }}
	    >
        {localization.get('uiKit.console')}
      </Button>
    </div>
  );
}

Console.defaultProps = {
  textForCopy: undefined,
  children: undefined,
  className: '',
};

export default Console;
