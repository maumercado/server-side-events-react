module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: { modules: true },
        ecmaVersion: 7,
        sourceType: "module"
    },
    rules: {
        "react/prop-types": ["off"],
        "react/no-unescaped-entities": "warn",
        "react/jsx-no-bind": [
            "error",
            {
                ignoreRefs: false,
                allowArrowFunctions: true,
                allowBind: false
            }
        ],
        "array-bracket-spacing": [
            2,
            "always",
            {
                singleValue: true,
                objectsInArrays: true,
                arraysInArrays: true
            }
        ],
        "arrow-spacing": "error",
        "comma-dangle": "error",
        "computed-property-spacing": "error",
        "dot-location": ["error", "property"],
        "dot-notation": "error",
        "func-call-spacing": "error",
        "generator-star-spacing": "error",
        indent: ["error", 4, { SwitchCase: 1 }],
        "keyword-spacing": "error",
        "linebreak-style": ["error", "unix"],
        "no-class-assign": "error",
        "no-confusing-arrow": "error",
        "no-const-assign": "error",
        "no-constant-condition": "error",
        "no-dupe-class-members": "error",
        "no-extra-parens": "error",
        "no-extra-semi": "error",
        "no-implicit-coercion": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-multi-spaces": "error",
        "no-octal": "error",
        "no-redeclare": "error",
        "no-spaced-func": "error",
        "no-undef": "error",
        "no-unneeded-ternary": "error",
        "no-unused-vars": ["error", { args: "none" }],
        "no-trailing-spaces": "error",
        "no-unreachable": "error",
        "no-var": "error",
        "no-this-before-super": "error",
        "constructor-super": "error",
        "valid-typeof": "error",
        "no-whitespace-before-property": "error",
        "object-shorthand": "error",
        "object-curly-spacing": [2, "always", { arraysInObjects: true, objectsInObjects: true }],
        "prefer-arrow-callback": "error",
        "prefer-const": "error",
        "prefer-template": "error",
        "quote-props": ["error", "as-needed"],
        quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
        "require-yield": "error",
        semi: ["error", "always"],
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", { anonymous: "never", named: "never", asyncArrow: "always" }],
        "brace-style": ["error", "1tbs"],
        "max-len": ["error", 100, 4],
        "space-in-parens": "error",
        "space-infix-ops": "error",
        "space-unary-ops": "error",
        "switch-colon-spacing": "error",
        "template-curly-spacing": "error",
        "template-tag-spacing": "error"
    },
    extends: ["plugin:react/recommended"],
    settings: {
        react: {
            version: require("react/package.json").version
        }
    }
};
