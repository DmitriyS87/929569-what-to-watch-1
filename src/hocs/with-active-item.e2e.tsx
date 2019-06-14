import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import withActivePlayer from './with-active-item';

configure({ adapter: new Adapter() });

interface Props {
  setActive: (param: EventTarget) => void
}

const MockComponent = (props) => {
  return <div onClick={(evt) => props.setActive(evt.target)} />;
};

const MockComponentWrapped = withActivePlayer(MockComponent);


it(`withActivePlayer get null initial state`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().activeItem).toEqual(null);
});

it(`withActivePlayer get correct state from callback`, () => {
  const mockFunction = jest.fn();
  const evt = {
    target: `correctElement`
  };
  const wrapper = shallow(<MockComponentWrapped setActive={mockFunction} />);
  wrapper.simulate(`click`, evt);
  expect(mockFunction).toHaveBeenCalledWith(`correctElement`);
});
