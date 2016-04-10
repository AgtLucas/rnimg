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

let realm = new Realm({
  schema: [{
    name: 'Categories',
    'properties': {
      name: 'string'
    }
  }]
})

let favs = realm.objects('Categories')

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