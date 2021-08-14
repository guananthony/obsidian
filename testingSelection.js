/** @format */

import testsObj from "./queries.js";
import { gql } from "https://deno.land/x/oak_graphql/mod.ts";
import { print, visit } from "https://deno.land/x/graphql_deno/mod.ts";

export function mapSelectionSet(query) {
  let selectionKeysMap = { data: "data" };
  let ast = gql(query);
  let selections = ast.definitions[0].selectionSet.selections;
  // console.log("--------", selections);
  const recursiveMap = (recurseSelections) => {
    for (const selection of recurseSelections) {
      // console.log("******", selection);
      if (selection.name && selection.name.value) {
        selectionKeysMap[selection.name.value] = selection.name.value;
      }
      if (selection.alias && selection.alias.value) {
        selectionKeysMap[selection.alias.value] = selection.name.value;
      }
      // console.log("_____", selection);
      if (selection.selectionSet && selection.selectionSet.selections) {
        // console.log("this should trigger again");
        // console.log(selection.selectionSet.selections);
        recursiveMap(selection.selectionSet.selections);
      }
    }

    // console.log("Lookie here", selectionKeysMap);
  };
  recursiveMap(selections);
  return selectionKeysMap;
}
// let test1 = gql(testsObj.query2.query);
// let selections = test1.definitions[0].selectionSet.selections;
// //console.log(selections);
// //console.log(test1);
// let map = mapSelectionSet(testsObj.query2.query);
// console.log(map);
