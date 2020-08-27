import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

const TextInput = ({ value, onChange }) => (
  <input type="text" value={value} onChange={onChange} />
);

const NumericInput = ({ value, onChange }) => (
  <input type="number" value={value} onChange={onChange} />
);

const withLocalStorage = (Component, initialValue, storageKey) => {
  class LocalStorageClass extends React.Component {
    static displayName = `withLocalStorage(${
      Component.displayName || Component.name || ""
    })`;

    constructor(props) {
      super(props);

      const valueLocalStorage = localStorage.getItem(storageKey);
      const value = valueLocalStorage
        ? JSON.parse(valueLocalStorage)
        : initialValue;

      this.state = {
        value,
      };
    }

    onChange = (e) => {
      this.setState({
        value: e.target.value,
      });

      localStorage.setItem(storageKey, JSON.stringify(this.state.value));
    };

    render() {
      return (
        <Component
          {...this.props}
          value={this.state.value}
          onChange={this.onChange}
        />
      );
    }
  }

  hoistNonReactStatics(LocalStorageClass, Component);

  return LocalStorageClass;
};

const TextInputLocalStorage = withLocalStorage(TextInput, "123", "text-input");
const NumericInputLocalStorage = withLocalStorage(
  NumericInput,
  10,
  "numeric-input"
);

const App = () => (
  <>
    <TextInputLocalStorage />
    <NumericInputLocalStorage />
  </>
);

export default App;
