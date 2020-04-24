import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
    const props = {
        label: 'Select Progress Bar',
        value: 1,
        options: [
            {
                id: 1,
                label: 'Progress Bar #1'
            }, 
            {
                id: 2,
                label: 'Progress Bar #2'
            }, 
            {
                id: 3,
                label: 'Progress Bar #3'
            }],
        onChange: () => {}
    };

    it('Renders dropdown with default props', () => {
        const wrapper = shallow(<Dropdown {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
});