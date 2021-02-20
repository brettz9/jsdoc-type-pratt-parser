export type ParseResult =
  NameResult
  | UnionResult
  | GenericResult
  | StringValueResult
  | NullResult
  | UndefinedResult
  | AllResult
  | UnknownResult
  | FunctionResult
  | RecordResult
  | ModuleResult
  | PropertyPathResult
  | SymbolResult
  | TypeOfResult
  | KeyOfResult
  | ImportResult
  | ArrowResult
  | TupleResult

export type NonTerminalResult =
  ParseResult
  | KeyValueResult<ParseResult | NameResult | NumberResult>
  | NumberResult
  | ParameterList

export interface ModifiableResult {
  optional?: boolean
  nullable?: boolean
  repeatable?: boolean
}

export type NameResult = ModifiableResult & {
  type: 'NAME'
  name: string
  reservedWord?: boolean
}

export type UnionResult = ModifiableResult & {
  type: 'UNION'
  elements: ParseResult[]
}

export type GenericResult = ModifiableResult & {
  type: 'GENERIC'
  subject: ParseResult
  objects: ParseResult[]
}

export type StringValueResult = ModifiableResult & {
  type: 'STRING_VALUE'
  value: string
  quote: string
}

export type NullResult = ModifiableResult & {
  type: 'NULL'
}

export type UndefinedResult = ModifiableResult & {
  type: 'UNDEFINED'
}

export type AllResult = ModifiableResult & {
  type: 'ALL'
}

export type UnknownResult = ModifiableResult & {
  type: 'UNKNOWN'
}

export type FunctionResult = ModifiableResult & {
  type: 'FUNCTION'
  parameters: Array<ParseResult | KeyValueResult>
  returnType?: ParseResult
}

export type ArrowResult = ModifiableResult & {
  type: 'FUNCTION'
  parameters: Array<NameResult | KeyValueResult>
  returnType?: ParseResult
  arrow: true
}

export type KeyValueResult<KeyType = NameResult> = ModifiableResult & {
  type: 'KEY_VALUE'
  key: KeyType
  value: ParseResult
}

export type RecordResult = ModifiableResult & {
  type: 'RECORD'
  fields: Array<KeyValueResult<ParseResult | NumberResult> | ParseResult | NumberResult>
}

export type ModuleResult = ModifiableResult & {
  type: 'MODULE'
  path: string
}

export type PropertyPathResult = ModifiableResult & {
  type: 'PROPERTY_PATH'
  left: ParseResult
  path: string[]
}

export type NumberResult = ModifiableResult & {
  type: 'NUMBER'
  value: number
}

export type SymbolResult = ModifiableResult & {
  type: 'SYMBOL'
  name: string
  value?: NumberResult | NameResult
}

export type TypeOfResult = ModifiableResult & {
  type: 'TYPE_OF'
  value?: ParseResult
}

export type KeyOfResult = ModifiableResult & {
  type: 'KEY_OF'
  value?: ParseResult
}

export type ImportResult = ModifiableResult & {
  type: 'IMPORT'
  path: StringValueResult
}

export interface ParameterList {
  type: 'PARAMETER_LIST'
  elements: Array<KeyValueResult | ParseResult>
}

export type TupleResult = ModifiableResult & {
  type: 'TUPLE'
  elements: ParseResult[]
}
