/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { CoreServicesContext } from './components/coreServices';
import Main from './pages/Main';
import { NotificationService } from './services';
import { ServicesContext } from './services/services';
import { DataSourceManagementPluginSetup } from '../../../src/plugins/data_source_management/public';
import { AppPluginStartDependencies } from "./types";

export const renderApp = (
  coreStart: CoreStart,
  params: AppMountParameters,
  dataSourceManagement: DataSourceManagementPluginSetup,
  pluginStartDependencies: AppPluginStartDependencies,
) => {
  const http = coreStart.http;

  ReactDOM.render(
    <Router>
      <Route
        render={(props) => (
            <CoreServicesContext.Provider value={coreStart}>
              <Main {...props}
                setActionMenu={params.setHeaderActionMenu}
                multiDataSourceEnabled={!!pluginStartDependencies.dataSource}
                dataSourceManagement={dataSourceManagement}
              />
            </CoreServicesContext.Provider>
        )}
      />
    </Router>,
    params.element
  );

  return () => ReactDOM.unmountComponentAtNode(params.element);
};
