import GUN from "gun";

const rel_ = (GUN as any)?.val?.link["_"]; // '#'
const node_ = (GUN as any)?.node?.["_"]; // '_'

GUN.chain.unset = function (node: any) {
  if (
    this &&
    node &&
    node[node_] &&
    node[node_].put &&
    node[node_].put[node_] &&
    node[node_].put[node_][rel_]
  ) {
    this.put({ [node[node_].put[node_][rel_]]: null });
  }
  return this;
};
