import React from 'react';
import { observer } from 'mobx-react-lite';

import { IPaginationRequest, IPagination } from 'ts/interfaces/Pagination';
import { getMoney } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import PageWrapper from 'ts/components/Page/wrapper';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';
import Table from 'ts/components/Table';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import RecommendationsWrapper from 'ts/components/Recommendations/wrapper';

interface IScopeViewProps {
  response?: IPagination<any>;
}

function ScopeView({ response }: IScopeViewProps) {
  if (!response) return null;
  const typeChart = getOptions({ order: dataGripStore.dataGrip.type.list });
  const authorChart = getOptions({ order: dataGripStore.dataGrip.author.list });

  return (
    <Table rows={response.content}>
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        title="page.team.scope.scope"
        properties="scope"
        width={200}
      />
      <Column
        template={ColumnTypesEnum.NUMBER}
        title="page.team.scope.days"
        properties="days"
      />
      <Column
        template={ColumnTypesEnum.NUMBER}
        title="page.team.scope.authorsDays"
        properties="authors"
        formatter={(authors: any) => {
          return Object.keys(authors)
            .map(name => (authors[name].days || 0))
            .reduce((t, v) => (t + v), 0);
        }}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        title="page.team.scope.tasks"
        properties="tasks"
        formatter={(v: any[]) => (v?.length || 0)}
      />
      <Column
        template={ColumnTypesEnum.NUMBER}
        title="page.team.scope.commits"
        properties="commits"
      />
      <Column
        title="page.team.scope.types"
        properties="types" // TODO: нужно по числу изменений, а не коммитов
        minWidth={200}
        template={(details: any) => (
          <LineChart
            options={typeChart}
            details={details}
          />
        )}
      />
      <Column
        title="page.team.scope.authors"
        properties="authors"
        minWidth={200}
        formatter={(authors: any) => {
          return Object.fromEntries(
            Object.keys(authors).map(name => [name, authors[name]?.commits || 0]),
          );
        }}
        template={(details: any) => (
          <LineChart
            options={authorChart}
            details={details}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.NUMBER}
        title="page.team.scope.cost"
        properties="cost"
        formatter={getMoney}
      />
    </Table>
  );
}

ScopeView.defaultProps = {
  response: undefined,
};

const Scope = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.scope.statistic;
  if (rows?.length < 2) return mode !== 'print' ? (<NothingFound />) : null;
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byScope;

  return (
    <>
      {mode !== 'print' && (
        <RecommendationsWrapper recommendations={recommendations} />
      )}
      <Title title="page.team.scope.title"/>
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={(pagination?: IPaginationRequest) => getFakeLoader({
            content: rows, pagination, mode,
          })}
        >
          <ScopeView />
          <Pagination />
        </DataLoader>
      </PageWrapper>
    </>
  );
});

export default Scope;
