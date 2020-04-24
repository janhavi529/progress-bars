import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
    const props = {
        value: 45,
        limit: 150
    };

    it('Renders ProgressBar with default props', () => {
        const wrapper = shallow(<ProgressBar {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('ProgressBar render when value is greater than limit', () => {
        const props1 = {
            value: 175,
            limit: 150
        };
        const wrapper = shallow(<ProgressBar {...props1}/>);

        expect(wrapper.find('.bar-progress-tracker').prop('style')).toHaveProperty('backgroundColor', 'lightCoral');
        expect(wrapper.find('.bar-progress-percentage').text()).toEqual('175%');
        expect(wrapper).toMatchSnapshot();
    });

    it('ProgressBar render when value is less than 0', () => {
        const props = {
            value: -45,
            limit: 150
        };
        const wrapper = shallow(<ProgressBar {...props}/>);
        expect(wrapper.find('.bar-progress-tracker').prop('style')).toHaveProperty('backgroundColor', 'lightGreen');
        expect(wrapper.find('.bar-progress-percentage').text()).toEqual('-45%');
        expect(wrapper).toMatchSnapshot();
    });
});