import React from 'react';
import PropTypes from 'prop-types';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import withActivePlayer from '../hocs/with-active-item.jsx';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = (props) => {
  return <div onClick={(evt) => props.setActive(evt.target)} />;
};

MockComponent.propTypes = {
  setActive: PropTypes.func.isRequired,
};

const mockComponentWrapped = withActivePlayer(MockComponent);


it(`withActivePlayer get null initial state`, () => {
  const wrapper = shallow(<mockComponentWrapped />);

  expect(wrapper.state().activeItem).toEqual(null);
});

it(`withActivePlayer get correct state from callback`, () => {
  const mockFunction = jest.fn();
  const evt = {
    target: `correctElement`
  };
  const wrapper = shallow(<mockComponentWrapped setActive={mockFunction} />);
  wrapper.simulate(`click`, evt);
  expect(mockFunction).toHaveBeenCalledWith(`correctElement`);
});
