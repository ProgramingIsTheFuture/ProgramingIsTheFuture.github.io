---
title: Compilers
description: My experience about building compilers in OCaml
date: 2022-12-09
tags:
  - OCaml
  - Compilers
---

# Tutorial about building compilers

In this tutorial we will use the OCaml programing language 
to build a simple compiler. 
I will try to explain it step by step.

The compiler is divided in this 4 sections:
  1. Lex
  2. Parse
  3. Type Checker
  4. Compilation


### AST

Before we go to the good parts,
we will need to define the syntax of the language
and how we can represent it in OCaml

Let's take the Golang syntax.

Simple go program

```golang filename="main.go"
// Defining a function
// with 2 params and 1 return
func add(a int, b int) int {

  return a + b
}

func main() {
  // one way to define variables
  var a int = 10 
  // another way to define variables
  b := 25

  // calling functions
  add(a, b)
}
```

The AST (Abstract syntax tree) is used 
to represent the code inside the language we are 
using to build the compiler.

```ocaml

type value =
  | VInt of int

type val = value option

type typ = string option

type param = string * string

type op =
  | Add
  | Sub

type stmt =
  | Const of value
  | Var of string * typ * val
  | Fun of string * (string * string) list * typ * stmt list
  | Op of stmt * op * stmt
  | Variable of string
  | Return of expr
  | Apply of string * expr list

type ast = stmt list
```

With this ast type we can represent the Golang code.
Let's try converting the golang code into this AST.

The first function will be:
```ocaml
(* Let's look for the function definition
  We have a name "add"
  we have multiple params
  we have some return type (Void if none)
  and we have some stmts to execute
*)
Fun ("add", [("a", int); ("b", int)], Some (int), 
  Return (
    Op (
      Variable ("a"), 
      Add, 
      Variable ("b")
    )
  )  
)
```

Let's jump into the Lexer, we will transform the code into TOKENS
that we can parse latter

### *Lex*

In this part of the compiler, we grab each character/symbol
and we transform each one into a new Token.

Example:
```ocaml
  let num = 10;
```

```
  In this case, the `let` is a token (we can call it LET), 
  the `num` is another token (we can call it Name and it stores a value),
  the `=` is another token (EQUAL), 
  the number `10` is yet another token 
  (We can call it INT since there are no decimal values)
  and finally the `;` that can represent the SEMICOLON token.
```


