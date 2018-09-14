import { getCardThatRequestedPriority } from "./deck";

// Transform deck history steps into D3 dendrogram data.
export const getDendrogramData = deck => {
  const nodeArray = deck.history.steps
    .reduce(stepsToPriorityInfos, [])
    .reduce(
      (nodeArray, priorityInfo) =>
        priorityInfosToNodeArray(nodeArray, priorityInfo, deck),
      []
    )
    .reduce(handleDuplicates, []);
  let startNode = getStartNode(nodeArray);
  startNode = combineNodesToTreeObject(nodeArray, startNode);
  return startNode;
};

const stepsToPriorityInfos = (priorityInfos, nextStep) =>
  priorityInfos.concat(nextStep.prioritiesInfo);
const priorityInfosToNodeArray = (nodeArray, priorityInfo, deck) =>
  nodeArray.concat({
    children: priorityInfo.priorityAddedCards.map(cardToNodeName),
    name:
      getCardThatRequestedPriority(deck, priorityInfo.priority.id) === undefined
        ? `${deck.archetype.name} archetype`
        : cardToNodeName(
            getCardThatRequestedPriority(deck, priorityInfo.priority.id)
          )
  });
const cardToNodeName = card => `${card.name} (${card.quantity})`;
const handleDuplicates = (uniqueNodeArray, nextNode) => {
  let existingItem = uniqueNodeArray.find(ai => ai.name === nextNode.name);
  if (existingItem === undefined) uniqueNodeArray.push(nextNode);
  else existingItem.children = existingItem.children.concat(nextNode.children);
  return uniqueNodeArray;
};

const getStartNode = nodesFromSteps => {
  const allChildrenNames = nodesFromSteps.reduce(toChildrenNames, []);
  return {
    name: "start",
    children: nodesFromSteps.reduce(
      (childrenOfStartNode, nextNode) =>
        toChildrenOfStartNode(childrenOfStartNode, nextNode, allChildrenNames),
      []
    )
  };
};
const toChildrenNames = (childrenNames, nextNode) =>
  childrenNames.concat(nextNode.children);
const toChildrenOfStartNode = (
  childrenOfStartNode,
  nextNode,
  allChildrenNames
) =>
  !allChildrenNames.includes(nextNode.name)
    ? childrenOfStartNode.concat(nextNode.name)
    : childrenOfStartNode;

const combineNodesToTreeObject = (nodeArray, startNode) => {
  let toAppend = [];
  startNode.children.forEach(childName => {
    let hasChildren = nodeArray.find(node => node.name === childName);
    if (hasChildren)
      toAppend.push(combineNodesToTreeObject(nodeArray, hasChildren));
    else toAppend.push({ name: childName });
  });
  startNode.children = toAppend;
  return startNode;
};
