/*
 * Wazuh app - Integrity monitoring components
 * Copyright (C) 2015-2020 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { Component, Fragment } from 'react';
import { getAngularModule } from 'plugins/kibana/discover/kibana_services';
import { EventsSelectedFiles } from './events-selected-fields';
import { ModulesHelper } from './modules-helper';
import store from '../../../redux/store';

import { EuiOverlayMask } from '@elastic/eui';

import { enhanceDiscoverEvents } from './events-enhance-discover-fields';

export class Events extends Component {
  intervalTimeEnhancedDiscoverFields: number = 1000;
  customAttributeEnhancedDiscoverFields: string = 'data-wazuh-discover-field-enhanced';
  isMount: boolean;
  state: {
    flyout: false | {component: any, props: any }
    discoverRowsData: any[]
  }
  constructor(props) {
    super(props);
    this.isMount = true;
    this.state = {
      flyout: false,
      discoverRowsData: []
    };
  }

  async componentDidMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    const app = getAngularModule('app/wazuh');
    this.$rootScope = app.$injector.get('$rootScope');
    this.$rootScope.showModuleEvents = this.props.section;
    const scope = await ModulesHelper.getDiscoverScope();
    if(this.isMount){
      this.$rootScope.moduleDiscoverReady = true;
      this.$rootScope.$applyAsync();
      const fields = [...EventsSelectedFiles[this.props.section]];
      const index = fields.indexOf('agent.name');
      if (index > -1 && store.getState().appStateReducers.currentAgentData.id) { //if an agent is pinned we don't show the agent.name column
        fields.splice(index, 1);
      }
      if (fields) {
        scope.state.columns = fields;
        scope.addColumn(false);
        scope.removeColumn(false);
      }
      this.fetchWatch = scope.$watchCollection('fetchStatus',
        (fetchStatus) => {
          if (scope.fetchStatus === 'complete') {
            setTimeout(() => { ModulesHelper.cleanAvailableFields() }, 1000);
          }
          this.setState( { discoverRowsData: scope.rows } );
        });
      this.enhanceDiscoverRowsInterval = setInterval(this.enhanceDiscoverRows, this.intervalTimeEnhancedDiscoverFields);
    }
  }

  componentWillUnmount() {
    this.isMount = false;
    if (this.fetchWatch) this.fetchWatch();
    this.$rootScope.showModuleEvents = false;
    this.$rootScope.moduleDiscoverReady = false;
    this.$rootScope.$applyAsync();
    clearInterval(this.enhanceDiscoverRowsInterval);
  }

  enhanceDiscoverRows = () => {
    enhanceDiscoverEvents(this.state.discoverRowsData, {setFlyout: this.setFlyout, closeFlyout: this.closeFlyout});
  }

  setFlyout = (flyout) => {
    this.setState({ flyout });
  }

  closeFlyout = () => {
    this.setState({flyout: false});
  }

  render() {
    const { flyout } = this.state;
    const FlyoutComponent = (flyout || {}).component;
    return (
      <Fragment>
        {flyout && (
          <EuiOverlayMask
            // @ts-ignore
            onClick={(e: Event) => { e.target.className === 'euiOverlayMask' && this.closeFlyout() }} >
            <FlyoutComponent
              closeFlyout={this.closeFlyout}
              {...this.state.flyout.props}
              {...this.props}
            />
          </EuiOverlayMask>
        )}
      </Fragment>
    )
  }
}
