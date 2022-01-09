import { composeParslet, ParsletFunction } from './Parslet'
import { Precedence } from '../Precedence'
import { assertPlainKeyValueOrTerminal } from '../assertTypes'
import { NoParsletFoundError } from '../errors'
import { KeyValueResult } from '..'
import { RootResult } from '../result/RootResult'

export function createParameterListParslet ({ allowTrailingComma }: {
  allowTrailingComma: boolean
}): ParsletFunction {
  return composeParslet({
    name: 'parameterListParslet',
    accept: type => type === ',',
    precedence: Precedence.PARAMETER_LIST,
    parseInfix: (parser, left) => {
      const elements: Array<RootResult|KeyValueResult> = [
        assertPlainKeyValueOrTerminal(left)
      ]
      parser.consume(',')
      do {
        try {
          const next = parser.parseIntermediateType(Precedence.PARAMETER_LIST)
          elements.push(assertPlainKeyValueOrTerminal(next))
        } catch (e) {
          if (allowTrailingComma && e instanceof NoParsletFoundError) {
            break
          } else {
            throw e
          }
        }
      } while (parser.consume(','))

      if (elements.length > 0 && elements.slice(0, -1).some(e => e.type === 'JsdocTypeVariadic')) {
        throw new Error('Only the last parameter may be a rest parameter')
      }

      return {
        type: 'JsdocTypeParameterList',
        elements
      }
    }
  })
}
