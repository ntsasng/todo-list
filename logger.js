export default function logger(reducer) {
  return (prevState, action, args) => {
    console.group;
    console.log("Prev state:", prevState);
    console.log("Arguments:", args);
    const nextState = reducer(prevState, action, args);
    console.log("Next state:", nextState);
    console.groupEnd;
    return nextState;
  };
}
