
import React, {PropTypes, Component} from 'react'
import {connect} from './connect'
import {pathToId} from '../util/navigation'
import {createSelector, createStructuredSelector} from 'reselect'
import classNames from 'classnames'

import HubSearchResults from './hub-search-results'

import Downloads from './downloads'
import Preferences from './preferences'
import History from './history'
import Location from './location'
import UrlMeat from './url-meat'
import Dashboard from './dashboard'
import Library from './library'
import Collections from './collections'
import Collection from './collection'
import NewTab from './new-tab'

import {map} from 'underline'

export class HubMeat extends Component {
  render () {
    const {tabData, tabs, id: currentId} = this.props

    return <div className='hub-meat'>
      {tabs::map((id, i) => {
        const data = tabData[id]
        if (!data) {
          return
        }
        const {path} = data
        const visible = (id === currentId)
        const classes = classNames('hub-meat-tab', {visible})
        return <div key={id} className={classes}>{this.renderTab(id, path, data)}</div>
      })}
      <HubSearchResults/>
    </div>
  }

  renderTab (tabId, path, data) {
    if (path === 'dashboard') {
      return <Dashboard/>
    } else if (path === 'library') {
      return <Library/>
    } else if (path === 'collections') {
      return <Collections/>
    } else if (path === 'downloads') {
      return <Downloads/>
    } else if (path === 'history') {
      return <History/>
    } else if (path === 'preferences') {
      return <Preferences/>
    } else if (/^locations/.test(path)) {
      const location = pathToId(path)
      return <Location locationName={location}/>
    } else if (/^new/.test(path)) {
      return <NewTab tabId={tabId}/>
    } else if (/^collections\//.test(path)) {
      return <Collection tabId={tabId} tabPath={path} data={data}/>
    } else if (/^(url|games|users|collections|search|press|featured)/.test(path)) {
      return <UrlMeat key={tabId} tabId={tabId} path={path}/>
    } else {
      return '?'
    }
  }
}

HubMeat.propTypes = {
  id: PropTypes.string.isRequired,
  me: PropTypes.object,
  games: PropTypes.object,
  myGameIds: PropTypes.array,
  downloadKeys: PropTypes.object,
  tabs: PropTypes.array
}

const allTabsSelector = createSelector(
  (state) => state.session.navigation.tabs,
  (tabs) => tabs.constant.concat(tabs.transient)
)

const mapStateToProps = createStructuredSelector({
  id: (state) => state.session.navigation.id,
  tabs: (state) => allTabsSelector(state),
  tabData: (state) => state.session.navigation.tabData,
  me: (state) => state.session.credentials.me
})
const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HubMeat)
