import {assertType, isNull, isString} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'


export class StringArrayHelper {
  /**
   *
   * @param {?StringArray} values
   */
  constructor(values) {
    assertType(
      isNull(values) || values instanceof globalFlexioImport.io.flexio.flex_types.arrays.StringArray,
      'StringArrayHelper: `values` should be StringArray or null'
    )
    /**
     *
     * @type {?StringArray}
     * @private
     */
    this.__values = values
  }

  /**
   *
   * @param {?string} value
   * @return {StringArray}
   */
  toggle(value) {
    assertType(
      isNull(value) || isString(value),
      'StringArrayHelper:toggle: `value` should be string or null'
    )

    if (isNull(this.__values)) {
      return new globalFlexioImport.io.flexio.flex_types.arrays
        .StringArray(value)
    }

    if (this.__values.includes(value)) {
      const values = new globalFlexioImport.io.flexio.flex_types.arrays
        .StringArray()

      this.__values
        .forEach(
          /**
           *
           * @param {string} v
           */
          (v) => {
            if (v !== value) {
              values.push(v)
            }
          })

      return values

    } else {
      const values = new globalFlexioImport.io.flexio.flex_types.arrays
        .StringArray(...this.__values)
      values.push(value)

      return values
    }
  }

}
