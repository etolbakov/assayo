import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { getShortMoney } from 'ts/helpers/formatter';

import CardWithIcon from 'ts/components/CardWithIcon';
import NothingFound from 'ts/components/NothingFound';
import IsStaff from 'ts/components/NothingFound/components/IsStaff';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import Title from 'ts/components/Title';

import dataGripStore from 'ts/store/DataGrip';

const Money = observer((): React.ReactElement => {
  const { userId } = useParams<any>();
  const statistic = dataGripStore.dataGrip.author.statistic[userId || 0];
  const byTimestamp = dataGripStore.dataGrip.timestamp.statisticByAuthor[statistic.author];
  const taskNumber = statistic.tasks.length;

  if (statistic.isStaff) {
    return (
      <NothingFound>
        <IsStaff />
      </NothingFound>
    );
  }

  return (
    <PageWrapper>
      <PageColumn>
        <Title title="page.person.money.title.total"/>
          <div>
            <CardWithIcon
              value={getShortMoney(statistic.moneyAll)}
              icon="./assets/cards/money_total.png"
              title="page.person.money.moneyAll.title"
              description="page.person.money.moneyAll.description"
            />
            <CardWithIcon
              value={getShortMoney(statistic.moneyWorked)}
              icon="./assets/cards/money_work.png"
              title="page.person.money.moneyWorked.title"
              description="page.person.money.moneyWorked.description"
            />
            <CardWithIcon
              value={getShortMoney(statistic.moneyLosses)}
              icon="./assets/cards/money_lazy.png"
              title="page.person.money.moneyLosses.title"
              description="page.person.money.moneyLosses.description"
            />
            <CardWithIcon
              value={getShortMoney(byTimestamp.weekendPayment)}
              icon="./assets/cards/money_holidays.png"
              title="page.team.total.weekendPayment.title"
              description="page.team.total.weekendPayment.description"
            />
          </div>
      </PageColumn>
      <PageColumn>
        <Title title="page.person.money.title.middle"/>
        {taskNumber === 0 ? (
          <NothingFound />
        ) : (
          <div>
            <CardWithIcon
              long
              value={taskNumber
                ? getShortMoney(statistic.moneyWorked / taskNumber, 0)
                : null}
              icon="./assets/cards/money_task.png"
              title="page.person.money.tasks.title"
              description="page.person.money.tasks.description"
            />
            <CardWithIcon
              long
              value={taskNumber
                ? getShortMoney(statistic.moneyWorked / statistic.commits, 0)
                : null}
              icon="./assets/cards/money_work.png"
              title="page.person.money.commits.title"
              description="page.person.money.commits.description"
            />
          </div>
        )}
      </PageColumn>
    </PageWrapper>
  );
});

export default Money;
