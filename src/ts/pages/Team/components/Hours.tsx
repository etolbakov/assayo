import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import RecommendationsWrapper from 'ts/components/Recommendations/wrapper';
import HoursChart from 'ts/components/HoursChart';
import Title from 'ts/components/Title';

import PageWrapper from 'ts/components/Page/wrapper';

const Hours = observer((): React.ReactElement => {
  const statistic = dataGripStore.dataGrip.team.statistic;
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byHour;

  return (
    <>
      <RecommendationsWrapper recommendations={recommendations} />
      <Title title="page.team.hours.title"/>
      <PageWrapper template="table">
        <HoursChart statistic={statistic} />
      </PageWrapper>
    </>
  );
});

export default Hours;
