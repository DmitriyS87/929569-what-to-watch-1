import * as React from 'react';
import { Movies } from '../types';

export interface withActiveItemProps {
  active: string,
}
export interface withActiveItemState {
  activeItem: string | null
}

const withActiveItem = (Child: React.ReactNode, initialState?: string) => {

  class WithActiveItem extends React.Component<any, withActiveItemState> {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: this.props.active || initialState || null
      };
    }

    render() {
      const { activeItem } = this.state;
      // @ts-ignore
      return <Child {...this.props} activeItem={activeItem} setActive={(item) => (this.setState({ activeItem: item }))} />;
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
