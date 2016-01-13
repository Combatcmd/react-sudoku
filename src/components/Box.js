import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { inputValue } from "../actions/grid";

const getRandomColor = () => {
  let color = "hsl(" + Math.random() * 360 + ", 100%, 80%)";
  return color;
};

const pallet = {
  "00": getRandomColor(),
  "01": getRandomColor(),
  "02": getRandomColor(),
  "10": getRandomColor(),
  "11": getRandomColor(),
  "12": getRandomColor(),
  "20": getRandomColor(),
  "21": getRandomColor(),
  "22": getRandomColor(),
};

const getBoxColor = (row, col) => {
  let rowGroup = (~~(row / 3)).toString();
  let colGroup = (~~(col / 3)).toString();
  return pallet[rowGroup + colGroup];
};

const Box = React.createClass({
  componentWillMount() {
    const { val } = this.props;
    this.setState({ isFixed: val ? true : false });
  },
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.val !== this.props.val;
  },
  handleChange(e) {
    const { row, col, store } = this.props;
    const range = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const val = parseInt(e.target.value);
    const isDeleted = e.target.value === "";

    if (range.indexOf(val) > -1 || isDeleted) {
      store.dispatch(inputValue(row, col, isDeleted ? 0 : val));
    }
  },
  render() {
    const { row, col, val, isSolved } = this.props;
    const { isFixed } = this.state;
    const input = (
      <input
        ref="input"
        style={{ backgroundColor: getBoxColor(row, col) }}
        className={isFixed ? "fixed" : isSolved ? "result" : ""}
        disabled={isFixed || isSolved}
        value={val ? val : ""}
        onChange={this.handleChange}
      />
    );

    return (
      <td>
        {isSolved ? (
          <ReactCSSTransitionGroup
            transitionName="solved"
            transitionAppear={true}
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
            transitionAppearTimeout={200}
          >
            {input}
          </ReactCSSTransitionGroup>
        ) : (
          input
        )}
      </td>
    );
  },
});

export default Box;
