import React from 'react'

class EpisodeSearch extends React.Component {
  render() {
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Search page.</div>
    )
  }
}

export default EpisodeSearch


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Row, Col } from 'antd';
// import PageHeader from '@isomorphic/shared/isomorphic/components/utility/pageHeader';
// import Box from '@isomorphic/shared/isomorphic/components/utility/box';
// import LayoutWrapper from '@isomorphic/shared/isomorphic/components/utility/layoutWrapper.js';
// import { InputSearch } from '@isomorphic/shared/isomorphic/components/uielements/input';
// import IntlMessages from '@isomorphic/shared/isomorphic/components/utility/intlMessages';
// import notification from '@isomorphic/shared/isomorphic/components/Notification';
// import YoutubeResult from '@isomorphic/shared/isomorphic/components/YoutubeSearch/Result';
// import basicStyle from '../../settings/basicStyle';
// import actions from '../../redux/youtubeSearch/actions';
// import NoAPIKey from '@isomorphic/shared/isomorphic/components/utility/noApiKey';
// import { youtubeSearchApi } from '../../settings';

// const { youtubeSearch, onPageChange } = actions;

// class YoutubeSearch extends Component {
//   onSearch = value => {
//     if (value && value.length > 0) {
//       this.props.youtubeSearch(value);
//     } else {
//       notification('error', 'Please type something');
//     }
//   };
//   componentDidMount() {
//     this.onSearch(this.props.YoutubeSearch.searcText);
//   }
//   render() {
//     const { rowStyle, colStyle, gutter } = basicStyle;
//     return (
//       <LayoutWrapper>
//         <PageHeader>
//           <IntlMessages id="sidebar.youtubeSearch" />
//         </PageHeader>

//         <Row style={rowStyle} gutter={gutter} justify="start">
//           <Col md={24} sm={24} xs={24} style={colStyle}>
//             {youtubeSearchApi ? (
//               <Box style={{ minHeight: 220 }}>
//                 <InputSearch
//                   placeholder="Search on Youtube"
//                   defaultValue={this.props.YoutubeSearch.searcText}
//                   onSearch={this.onSearch}
//                 />
//                 <YoutubeResult
//                   YoutubeSearch={this.props.YoutubeSearch}
//                   onPageChange={this.props.onPageChange}
//                 />
//               </Box>
//             ) : (
//               <NoAPIKey />
//             )}
//           </Col>
//         </Row>
//       </LayoutWrapper>
//     );
//   }
// }
// function mapStateToProps(state) {
//   return { YoutubeSearch: state.YoutubeSearch };
// }
// export default connect(
//   mapStateToProps,
//   { youtubeSearch, onPageChange }
// )(YoutubeSearch);
