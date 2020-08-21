/*
 * Wazuh app - App State Reducers
 * Copyright (C) 2015-2020 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

const initialState = {
  currentAPI: '',
  showMenu: false,
  wazuhNotReadyYet: '',
  currentTab: '',
  extensions: {},
  selected_settings_section: '',
  currentPlatform: false,
  currentAgentData: {},
  showExploreAgentModal: false,
  showExploreAgentModalGlobal: false,
  userPermissions: {
    "agent:create": {
      "*:*:*": "allow"
    },
    "group:create": {
      "*:*:*": "allow"
    },
    "agent:read": {
      "agent:id:*": "allow",
      "agent:group:*": "allow",
      "agent:id:001": "deny"
    },
    "agent:delete": {
      "agent:id:*": "allow",
      "agent:group:*": "allow"
    },
    "agent:modify_group": {
      "agent:id:*": "allow",
      "agent:group:*": "allow",
      "agent:id:001": "deny"
    },
    "agent:restart": {
      "agent:id:*": "allow",
      "agent:group:*": "allow"
    },
    "agent:upgrade": {
      "agent:id:*": "allow",
      "agent:group:*": "allow"
    },
    "group:read": {
      "*:*:*": "allow", // hardcoded
      "group:id:*": "allow",
      "group:id:custom-group": "deny",
    },
    "group:delete": {
      "group:id:*": "allow",
      "group:id:custom-group": "deny",
    },
    "group:update_config": {
      "group:id:*": "allow",
      "group:id:custom-group": "deny",
    },
    "group:modify_assignments": {
      "group:id:*": "allow"
    },
    "active-response:command": {
      "agent:id:*": "allow"
    },
    "security:create": {
      "*:*:*": "allow"
    },
    "security:create_user": {
      "*:*:*": "allow"
    },
    "security:read_config": {
      "*:*:*": "allow"
    },
    "security:update_config": {
      "*:*:*": "allow"
    },
    "security:revoke": {
      "*:*:*": "allow"
    },
    "security:read": {
      "role:id:*": "allow",
      "policy:id:*": "allow",
      "user:id:*": "allow"
    },
    "security:update": {
      "role:id:*": "allow",
      "policy:id:*": "allow",
      "user:id:*": "allow"
    },
    "security:delete": {
      "role:id:*": "allow",
      "policy:id:*": "allow",
      "user:id:*": "allow"
    },
    "cluster:status": {
      "*:*:*": "allow"
    },
    "manager:read": {
      "*:*:*": "allow"
    },
    "manager:read_api_config": {
      "*:*:*": "allow"
    },
    "manager:update_api_config": {
      "*:*:*": "allow"
    },
    "manager:upload_file": {
      "*:*:*": "allow",
      "file:path:etc/rules/local_rules.xml": "deny",
      "file:path:etc/lists/audit-keys": "deny",
      "file:path:etc/rules/0010-rules_config.xml": "deny"
    },
    "manager:restart": {
      "*:*:*": "allow"
    },
    "manager:delete_file": {
      "*:*:*": "allow",
      "file:path:*": "allow",
      "file:path:etc/lists/audit-keys": "deny",
      "file:path:etc/rules/local_rules.xml": "deny",
      "file:path:etc/decoders/local_decoder.xml": "deny"
    },
    "manager:read_file": {
      "file:path:*": "allow",
      "file:path:etc/rules/local_rules.xml": "deny",
      "file:path:etc/lists/audit-keys": "deny",
      "file:path:ruleset/rules/0010-rules_config.xml": "deny",
      "file:path:etc/decoders/local_decoder.xml": "deny",
      "file:path:ruleset/decoders/0005-wazuh_decoders.xml": "deny",
    },
    "cluster:delete_file": {
      "node:id:*": "allow",
      "node:id:*&file:path:*": "allow"
    },
    "cluster:read_api_config": {
      "node:id:*": "allow"
    },
    "cluster:read": {
      "node:id:*": "allow"
    },
    "cluster:update_api_config": {
      "node:id:*": "allow"
    },
    "cluster:restart": {
      "node:id:*": "allow"
    },
    "cluster:upload_file": {
      "node:id:*": "allow"
    },
    "cluster:read_file": {
      "node:id:*&file:path:*": "allow"
    },
    "ciscat:read": {
      "agent:id:*": "allow"
    },
    "decoders:read": {
      "decoder:file:*": "allow"
    },
    "lists:read": {
      "*:*:*": "allow",
      "list:path:*": "allow"
    },
    "rules:read": {
      "rule:file:*": "allow"
    },
    "mitre:read": {
      "*:*:*": "allow"
    },
    "sca:read": {
      "agent:id:*": "allow"
    },
    "syscheck:clear": {
      "agent:id:*": "allow"
    },
    "syscheck:read": {
      "agent:id:*": "allow"
    },
    "syscheck:run": {
      "agent:id:*": "allow"
    },
    "syscollector:read": {
      "agent:id:*": "allow"
    },
    "rbac_mode": "black"
  },
  userRoles: ['administrator']
};

const appStateReducers = (state = initialState, action) => {
  if (action.type === 'UPDATE_CURRENT_API') {
    return {
      ...state,
      currentAPI: action.currentAPI
    };
  }
  
  if (action.type === 'SHOW_MENU') {
    return {
      ...state,
      showMenu: action.showMenu
    };
  }

  if (action.type === 'UPDATE_WAZUH_NOT_READY_YET') {
    return {
      ...state,
      wazuhNotReadyYet: action.wazuhNotReadyYet
    };
  }

  if (action.type === 'UPDATE_WAZUH_CURRENT_TAB') {
    return {
      ...state,
      currentTab: action.currentTab
    };
  }

  if (action.type === 'UPDATE_EXTENSIONS') {
    return {
      ...state,
      extensions: action.extensions
    };
  }

  if (action.type === 'UPDATE_CURRENT_PLATFORM') {
    return {
      ...state,
      currentPlatform: action.currentPlatform
    };
  }

  if (action.type === 'UPDATE_SELECTED_AGENT_DATA') {
    return {
      ...state,
      currentAgentData: action.currentAgentData
    };
  }


  if (action.type === 'SHOW_EXPLORE_AGENT_MODAL') {
    return {
      ...state,
      showExploreAgentModal: action.showExploreAgentModal
    };
  }


  if (action.type === 'SHOW_EXPLORE_AGENT_MODAL_GLOBAL') {
    return {
      ...state,
      showExploreAgentModalGlobal: action.showExploreAgentModalGlobal
    };
  }

  if (action.type === 'UPDATE_USER_ROLES') {
    return {
      ...state,
      userRoles: action.userRoles
    };
  }

  if (action.type === 'UPDATE_USER_PERMISSIONS') {
    return {
      ...state,
      userPermissions: action.userPermissions
    };
  }

  if (action.type === 'UPDATE_SELECTED_SETTINGS_SECTION') {
    return {
      ...state,
      selected_settings_section: action.selected_settings_section
    };
  }

  return state;
};

export default appStateReducers;
