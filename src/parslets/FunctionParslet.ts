import { PrefixParslet } from './Parslet'
import { TokenType } from '../lexer/Token'
import { ParserEngine } from '../ParserEngine'
import { FunctionResult, ParseResult } from '../ParseResult'
import { Precedence } from './Precedence'
import { BaseFunctionParslet } from './BaseFunctionParslet'

export interface FunctionParsletOptions {
  allowNamedParameters?: string[]
  allowWithoutParenthesis: boolean
  allowNoReturnType: boolean
}

export class FunctionParslet extends BaseFunctionParslet implements PrefixParslet {
  private readonly allowWithoutParenthesis: boolean
  private readonly allowNamedParameters?: string[]
  private readonly allowNoReturnType: boolean

  constructor (options: FunctionParsletOptions) {
    super()
    this.allowWithoutParenthesis = options.allowWithoutParenthesis
    this.allowNamedParameters = options.allowNamedParameters
    this.allowNoReturnType = options.allowNoReturnType
  }

  accepts (type: TokenType): boolean {
    return type === 'function'
  }

  getPrecedence (): Precedence {
    return Precedence.FUNCTION
  }

  parsePrefix (parser: ParserEngine): ParseResult {
    parser.consume('function')

    const hasParenthesis = parser.consume('(')

    if (!this.allowWithoutParenthesis && !hasParenthesis) {
      throw new Error('function is missing parameter list')
    }
    const result: FunctionResult = {
      type: 'FUNCTION',
      parameters: []
    }

    if (hasParenthesis) {
      if (!parser.consume(')')) {
        const value = parser.parseNonTerminalType(Precedence.ALL)
        if (this.allowNamedParameters === undefined) {
          result.parameters = this.getNamedParameters(value)
        } else {
          result.parameters = this.getUnnamedParameters(value)
          for (const p of result.parameters) {
            if (p.type === 'KEY_VALUE' && !this.allowNamedParameters.includes(p.key.name)) {
              throw new Error(`only allowed named parameters are ${this.allowNamedParameters.join(',')} but got ${p.type}`)
            }
          }
        }

        if (!parser.consume(')')) {
          throw new Error('function parameter list is not terminated')
        }
      }

      if (parser.consume(':')) {
        if (!parser.consume('void')) {
          result.returnType = parser.parseType(Precedence.PREFIX)
        }
      } else {
        if (!this.allowNoReturnType) {
          throw new Error('function is missing return type')
        }
      }
    }

    return result
  }
}
