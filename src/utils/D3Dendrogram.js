import { getCardThatRequestedPriority } from './deck';

const stepsToPriorityInfos = (pInfos, nextStep) => pInfos.concat(nextStep.prioritiesInfo);
const cardToNodeName = card => `${card.name} (${card.quantity})`;
const toChildrenNames = (childrenNames, nextNode) => childrenNames.concat(nextNode.children);
// prettier-ignore
const toChildrenOfStartNode = (
  childrenOfStartNode,
  nextNode,
  allChildrenNames,
) => (!allChildrenNames.includes(nextNode.name)
  ? childrenOfStartNode.concat(nextNode.name)
  : childrenOfStartNode
);
const priorityInfosToNodeArray = (nodeArray, priorityInfo, deck) => nodeArray.concat({
  children: priorityInfo.priorityAddedCards.map(cardToNodeName),
  name:
      getCardThatRequestedPriority(deck, priorityInfo.priority.id) === undefined
        ? `${deck.archetype.name} archetype`
        : cardToNodeName(getCardThatRequestedPriority(deck, priorityInfo.priority.id)),
});
const handleDuplicates = (uniqueNodeArray, nextNode) => {
  const existingItem = uniqueNodeArray.find(ai => ai.name === nextNode.name);
  if (existingItem === undefined) uniqueNodeArray.push(nextNode);
  else existingItem.children = existingItem.children.concat(nextNode.children);
  return uniqueNodeArray;
};

const getStartNode = (nodesFromSteps) => {
  const allChildrenNames = nodesFromSteps.reduce(toChildrenNames, []);
  return {
    name: 'start',
    children: nodesFromSteps.reduce(
      (result, nextNode) => toChildrenOfStartNode(result, nextNode, allChildrenNames),
      [],
    ),
  };
};

const combineNodesToTreeObject = (nodeArray, startNode) => {
  const toAppend = [];
  startNode.children.forEach((childName) => {
    const hasChildren = nodeArray.find(node => node.name === childName);
    if (hasChildren) {
      toAppend.push(combineNodesToTreeObject(nodeArray, hasChildren));
    } else toAppend.push({ name: childName });
  });
  startNode.children = toAppend;
  return startNode;
};

// Transform deck history steps into D3 dendrogram data.
const getDendrogramData = (deck) => {
  const nodeArray = deck.history.steps
    .reduce(stepsToPriorityInfos, [])
    .reduce((result, priorityInfo) => priorityInfosToNodeArray(result, priorityInfo, deck), [])
    .reduce(handleDuplicates, []);
  let startNode = getStartNode(nodeArray);
  startNode = combineNodesToTreeObject(nodeArray, startNode);
  return startNode;
};

export default getDendrogramData;
