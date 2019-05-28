import {TestCase} from 'code-altimeter-js'
import {
  filterObject, hasProperties,
  maxKey,
  sortObject
} from '../js/objectHelpers'

const assert = require('assert')

export class TestObjectHelpers extends TestCase {
  testSortObect() {

  }

  testFilterObject() {
    let o = {
      'a': 'plok',
      'b': 45,
      'c': () => {
      },
      'd': 150
    }
    const res = filterObject(o, (value, key, object) => {
      return key === 'a' || value > 100
    })

    assert(Object.entries(res).length === 2)
    assert(res.a === 'plok')
    assert(res.d === 150)
  }

  testHasProperties() {
    let o = {
      'a': 1,
      'b': 'plok'
    }
    assert(hasProperties(o, ['a']) === true)
    assert(hasProperties(o, ['a', 'b']) === true)
    assert(hasProperties(o, ['a', 'b', 'ab']) === false)
  }
}

runTest(TestObjectHelpers)
