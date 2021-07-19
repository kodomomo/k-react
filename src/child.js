const Child = ({ message }) => {
  const clickHandler = () => {
    alert(`${message}`);
  };
  return {
    jsx: `
      <span onclick="clickHandler">${message}</span>
    `,
    method: { clickHandler },
  };
};

export default Child;
