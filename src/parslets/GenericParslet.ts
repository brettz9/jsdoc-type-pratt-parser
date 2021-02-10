import { Parser } from '../Parser'
import { ParseResult } from '../ParseResult'
import { TokenType } from '../lexer/Token'
import { Parslet } from './Parslet'
import { Precedence } from './Precedence'

export class GenericParslet implements Parslet {
  accepts (type: TokenType, next: TokenType): boolean {
    return type === '<' || (type === '.' && next === '<')
  }

  getPrecedence (): number {
    return Precedence.POSTFIX
  }

  parse (parser: Parser, left: ParseResult): ParseResult {
    parser.consume('.')
    parser.consume('<')

    const objects = []
    do {
      objects.push(parser.parseType())
    } while (parser.consume(','))

    if (!parser.consume('>')) {
      throw new Error('Unterminated generic parameter list')
    }

    return {
      type: 'GENERIC',
      subject: left,
      objects
    }
  }
}
