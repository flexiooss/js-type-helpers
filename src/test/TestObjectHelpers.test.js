import {TestCase} from 'code-altimeter-js'
import {
  filterObject, hasProperties,
  maxKey,
  sortObject, deepKeyResolverByPath, deepKeyAssignerByPath
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

  testDeepKeyResolverByPath() {

    const object = {
      toto: {
        tutu: {
          1: 'oui',
          '2': null
        }
      }
    }

    assert(deepKeyResolverByPath(object, ['toto', 'tutu', '1']) === 'oui', 1)
    assert(deepKeyResolverByPath(object, ['toto', 'tutu', 1]) === 'oui', 2)
    assert(deepKeyResolverByPath(object, ['toto', 'tutu', 2], 'non') === null, 3)
    assert(deepKeyResolverByPath(object, ['toto', 'a', 2], 'non') === 'non', 4)
    assert(deepKeyResolverByPath(object, ['toto', 'a', 2]) === null, 5)

  }

  testDeepKeyAssignerByPath() {
    let o = {
      'a': {
        'a1': 1
      },
      'b': 'plok'
    }

    deepKeyAssignerByPath(o, ['c'], 42)
    console.log(o)

    assert(o['c'] === 42, 1)

    deepKeyAssignerByPath(o, ['a', 'b'], null)
    assert(o['a']['b'] === null, 2)

    deepKeyAssignerByPath(o, ['a', 'a2', 'x'], false)
    assert(o['a']['a2']['x'] === false, 3)

    assert.deepStrictEqual(
      o,
      {
        'a': {
          'a1': 1,
          'a2': {
            'x': false
          },
          'b': null
        },
        'b': 'plok',
        'c': 42
      }, 4
    )

    assert.deepStrictEqual(
      deepKeyAssignerByPath(o, ['a', 'a2', 'z'], 'z'),
      {
        'a': {
          'a1': 1,
          'a2': {
            'x': false,
            'z': 'z'
          },
          'b': null
        },
        'b': 'plok',
        'c': 42
      }, 5
    )

    assert.deepStrictEqual(
      deepKeyAssignerByPath({}, ['a'], 'z'),
      {
        'a': 'z'
      }, 6
    )
  }
}

runTest(TestObjectHelpers)
