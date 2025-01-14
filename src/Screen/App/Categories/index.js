import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native';

import {HeaderC, SearchC, CarC} from '../../../component/index';

import {categories1, childrenCategories} from '../../../Graphql/Actions/index';
import axios from 'axios';
import {Layout, Text} from '@ui-kitten/components';
import {useQuery} from '@apollo/react-hooks';

class Cate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      cart: true,
    };
  }

  componentDidMount() {
    let parentDatabaseId = this.props.route.params.data.data.databaseId;
    axios({
      url: 'https://kaizen.woomenu.uz/graphql',
      method: 'post',
      data: {
        query: childrenCategories(parentDatabaseId),
      },
    })
      .then(result => {
        this.setState({entries: result.data.data.productCategories.nodes});
      })
      .catch(err => {});
  }

  updateSearch = search => {
    this.setState({search});
  };
  _renderItem = ({item, index}) => {
    return <CarC navigation={this.props.navigation} data={item} />;
  };
  style = StyleSheet.create({
    ViewStyle: {
      flex: 1,
    },
  });
  render() {
    return (
      <Layout style={this.style.ViewStyle}>
        <View style={{backgroundColor: 'transparent', paddingTop: 20}}>
          <HeaderC navigation={this.props.navigation} />
          <SearchC />
        </View>
        <ScrollView style={{flex: 1, paddingLeft: 11, paddingRight: 30}}>
          <View style={{marginTop: 0}}>
            <FlatList
              style={{
                paddingTop: 20,
                width: Dimensions.get('screen').width,
                paddingLeft: 10,
                paddingRight: 26,
              }}
              data={this.state.entries}
              renderItem={this._renderItem}
              numColumns={2}
            />
          </View>
        </ScrollView>
      </Layout>
    );
  }
}
export default Cate;
