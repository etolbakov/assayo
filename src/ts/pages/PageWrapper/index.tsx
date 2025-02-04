import React, { ReactNode } from 'react';

import SideBar from './components/sidebar';
import Header from './components/header';
import Print from './components/Print';
import style from './styles/index.module.scss';

interface IPageWrapper {
  children: ReactNode;
  selectedMenuItem?: string;
}

function PageWrapper({
  children,
}: IPageWrapper) {
  return (
    <div className={style.page_wrapper}>
      <SideBar />
      <Header />
      <div className={style.page_wrapper_main}>
        {children}
      </div>
      <Print />
    </div>
  );
}

PageWrapper.defaultProps = {
  selectedMenuItem: '',
};

export default PageWrapper;
