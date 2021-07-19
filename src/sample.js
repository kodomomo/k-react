import "./style.scss";
import Child from "./child";

const divClickHandler = () => {
  console.log("clicked!");
};

// <Sample /> -> <div onClick="divClickHandler" class=""/></div>

export const Sample = () => {
  // const [value, setValue] = useState(0);

  return {
    jsx: `
        <div onclick="divClickHandler" class="">
          <Child message="내용" child="<p>asdfasdf</p>"></Child>
          <Child message="ㅋㅋㄹㅃㅃ"></Child>
        </div>
      `,
    component: {
      Child,
    },
    method: { divClickHandler },
  };
};
// <대문자태그이름>.*</대문자태그이름>
