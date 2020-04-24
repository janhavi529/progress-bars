import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
    const props = { 
        className: 'btn btn-primary', 
        value: 25, 
        onClick: () => {}
    };

    it('Renders button with default props', () => {
        const wrapper = shallow(<Button {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
});