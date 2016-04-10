import React, {
  View,
  Text,
  Component,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from 'react-native'

import Realm from 'realm'
import _ from 'lodash'

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: ''
    }
  }

  _closeModal () {
    this.props.navigator.pop()
  }

  _updateInput (input) {
    this.setState({ input })
  }

  _addItem () {
    if (this.state.input === '') return
    realm.write(() => {
      realm.create('Categories', { name: this.state.input })
    })
    this.setState({ input: '' })
  }

  _deleteItem (item) {
    let itemToDelete = favs.filtered('name = $0', name)
    realm.write(() => {
      realm.delete(itemToDelete)
    })
    this.forceUpdate()
  }

  _viewImages (category) {
    this.props.navigator.push({
      name: 'ViewImages',
      passProps: {
        closeModal: this._closeModal,
        category
      }
    })
  }

  render () {
    let favorites = _.map(favs, (f, i) => {
      return (
        <View key={i} style={style.favoriteButtonContainer}>
          <TouchableHighlight
            onPress={() => this._viewImages(f.name)}
            underlayColor='transparent'
            style={style.favorite}>
            <Text style={style.favoriteText}>{f.name}</Text>
          </TouchableHighlight>
        </View>
      )
    })
  }
}

let realm = new Realm({
  schema: [{
    name: 'Categories',
    'properties': {
      name: 'string'
    }
  }]
})

let favs = realm.objects('Categories')