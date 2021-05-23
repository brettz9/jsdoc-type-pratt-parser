import { Fixture } from '../Fixture'

export const importFixtures: Fixture[] = [
  {
    description: 'import "x"',
    input: 'import("x")',
    expected: {
      type: 'JsdocTypeImport',
      element: {
        type: 'JsdocTypeStringValue',
        value: 'x',
        meta: {
          quote: 'double'
        }
      }
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'import "./x"',
    input: 'import("./x")',
    expected: {
      type: 'JsdocTypeImport',
      element: {
        type: 'JsdocTypeStringValue',
        value: './x',
        meta: {
          quote: 'double'
        }
      }
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'import "../x"',
    input: 'import("../x")',
    expected: {
      type: 'JsdocTypeImport',
      element: {
        type: 'JsdocTypeStringValue',
        value: '../x',
        meta: {
          quote: 'double'
        }
      }
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'import a named export',
    input: 'import("x").T',
    expected: {
      type: 'JsdocTypeNamePath',
      left: {
        type: 'JsdocTypeImport',
        element: {
          type: 'JsdocTypeStringValue',
          value: 'x',
          meta: {
            quote: 'double'
          }
        }
      },
      right: {
        type: 'JsdocTypeName',
        value: 'T',
        meta: {
          reservedWord: false
        }
      },
      pathType: 'property'
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'import 2-level named export',
    input: 'import("x").T.U',
    expected: {
      type: 'JsdocTypeNamePath',
      left: {
        type: 'JsdocTypeNamePath',
        left: {
          type: 'JsdocTypeImport',
          element: {
            type: 'JsdocTypeStringValue',
            value: 'x',
            meta: {
              quote: 'double'
            }
          }
        },
        right: {
          type: 'JsdocTypeName',
          value: 'T',
          meta: {
            reservedWord: false
          }
        },
        pathType: 'property'
      },
      right: {
        type: 'JsdocTypeName',
        value: 'U',
        meta: {
          reservedWord: false
        }
      },
      pathType: 'property'
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  },
  {
    description: 'import 2-level named export as generic',
    input: 'import("x").T.U<V,W>',
    stringified: 'import("x").T.U<V, W>',
    expected: {
      type: 'JsdocTypeGeneric',
      left: {
        type: 'JsdocTypeNamePath',
        left: {
          type: 'JsdocTypeNamePath',
          left: {
            type: 'JsdocTypeImport',
            element: {
              type: 'JsdocTypeStringValue',
              value: 'x',
              meta: {
                quote: 'double'
              }
            }
          },
          right: {
            type: 'JsdocTypeName',
            value: 'T',
            meta: {
              reservedWord: false
            }
          },
          pathType: 'property'
        },
        right: {
          type: 'JsdocTypeName',
          value: 'U',
          meta: {
            reservedWord: false
          }
        },
        pathType: 'property'
      },
      elements: [
        {
          type: 'JsdocTypeName',
          value: 'V',
          meta: {
            reservedWord: false
          }
        },
        {
          type: 'JsdocTypeName',
          value: 'W',
          meta: {
            reservedWord: false
          }
        }
      ],
      meta: {
        dot: false,
        brackets: 'angle'
      }
    },
    modes: ['typescript'],
    catharsis: {
      closure: 'fail',
      jsdoc: 'fail'
    },
    jtp: {
      closure: 'fail',
      jsdoc: 'fail',
      typescript: 'typescript',
      permissive: 'typescript'
    }
  }
]
