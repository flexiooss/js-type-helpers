import {TestCase} from 'code-altimeter-js'
import {
  filterObject, hasProperties,
  maxKey,
  sortObject, valueFor
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

  testValueFor() {

    const object = {
      toto: {
        tutu: {
          1: 'oui',
          '2': null
        }
      }
    }

    assert(valueFor(object, ['toto', 'tutu', '1']) === 'oui', 1)
    assert(valueFor(object, ['toto', 'tutu', 1]) === 'oui', 2)
    assert(valueFor(object, ['toto', 'tutu', 2], 'non') === null, 3)
    assert(valueFor(object, ['toto', 'a', 2], 'non') === 'non', 4)
    assert(valueFor(object, ['toto', 'a', 2]) === null, 5)

  }
}

runTest(TestObjectHelpers)
